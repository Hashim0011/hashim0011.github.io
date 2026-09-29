import { useCallback, useEffect, useRef, useState } from "react";
import { THEME_FROM_URL } from "../lib/urlFlags";

export type Theme = "light" | "dark";

const KEY = "theme";

/**
 * Light is the default; only a deliberate choice is remembered.
 *
 * The attribute is already on <html> before React mounts — the inline script
 * in index.html puts it there — so this hook reads the current theme rather
 * than deciding it. Deciding it here would mean the first paint is always
 * light, and anyone who chose dark would watch the page flash white on every
 * reload.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light",
  );
  const firstRun = useRef(true);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.dataset.theme = "dark";
    else delete root.dataset.theme;

    // A ?theme= link shows that theme without adopting it as the visitor's
    // preference. Their own saved choice survives; a later click still saves.
    const forced = firstRun.current && THEME_FROM_URL !== null;
    firstRun.current = false;

    if (!forced) {
      try {
        window.localStorage.setItem(KEY, theme);
      } catch {
        // Private browsing refuses the write; the choice just will not outlive
        // this tab, which is a better outcome than throwing on a click.
      }
    }

    // Mobile browser chrome paints itself from this.
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#101216" : "#f5f6f8");
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);

  return { theme, toggle };
}
