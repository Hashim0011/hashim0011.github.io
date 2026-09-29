import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { en } from "./en";
import { ar } from "./ar";
import type { Dict, Locale } from "./types";
import { LOCALE_FROM_URL } from "../lib/urlFlags";

const BUNDLES: Record<Locale, Dict> = { en, ar };
const KEY = "locale";

type LocaleValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Dict;
  toggle: () => void;
};

const LocaleContext = createContext<LocaleValue | null>(null);

/**
 * English is the default; only a deliberate choice is remembered.
 *
 * Like the theme, `lang` and `dir` are already on <html> before React mounts —
 * the inline script in index.html puts them there. Deciding it here instead
 * would lay the page out left-to-right for a moment before flipping, which is
 * far more violent than a colour flash.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() =>
    document.documentElement.lang === "ar" ? "ar" : "en",
  );
  const firstRun = useRef(true);

  useEffect(() => {
    const root = document.documentElement;
    const dict = BUNDLES[locale];
    root.lang = locale;
    root.dir = dict.dir;

    // A ?lang= link shows that language without adopting it as the visitor's
    // preference, exactly as ?theme= behaves.
    const forced = firstRun.current && LOCALE_FROM_URL !== null;
    firstRun.current = false;

    if (!forced) {
      try {
        window.localStorage.setItem(KEY, locale);
      } catch {
        // Private browsing refuses the write; the choice just will not outlive
        // this tab, which beats throwing on a click.
      }
    }

    document.title =
      locale === "ar"
        ? "هاشم المصعبي | مهندس برمجيات ومحلل أعمال"
        : "Hashim Al Masaabi | Software Engineer & Business Analyst";
  }, [locale]);

  // Switching language re-renders every section at once. Marked as a transition
  // so React can break that work up and keep the tap responsive, instead of
  // locking the main thread while a phone rebuilds the whole page.
  const toggle = useCallback(
    () => startTransition(() => setLocale((l) => (l === "ar" ? "en" : "ar"))),
    [],
  );

  const value = useMemo<LocaleValue>(() => {
    const t = BUNDLES[locale];
    return { locale, dir: t.dir, t, toggle };
  }, [locale, toggle]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useI18n must be used inside <LocaleProvider>");
  return ctx;
}
