import { AnimatePresence, m } from "framer-motion";
import { useI18n } from "../../i18n/LocaleProvider";

/**
 * The label is always the language you would switch TO, written in that
 * language — the one convention a reader can follow without knowing the
 * language they are currently looking at.
 */
export function LanguageToggle() {
  const { locale, t, toggle } = useI18n();
  const label = locale === "ar" ? t.ui.switchToEnglish : t.ui.switchToArabic;

  return (
    <button
      type="button"
      onClick={toggle}
      className="chip relative overflow-hidden"
      aria-label={label}
      title={label}
      lang={locale === "ar" ? "en" : "ar"}
    >
      <AnimatePresence initial={false} mode="wait">
        <m.span
          key={locale}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          /* An Arabic glyph sits visually smaller than Latin caps at the same
             px, so the two labels are sized to match each other and the icon
             in the chip beside them. */
          /* System stack on purpose. The label is a single Arabic letter, and
             pointing it at the site's Arabic face would make every English
             visitor download a 70KB webfont to draw one glyph in one button. */
          className={`absolute inset-0 grid place-items-center font-semibold [font-family:system-ui,sans-serif] ${
            locale === "ar" ? "text-[12px] tracking-wide" : "text-[19px] leading-none"
          }`}
        >
          {locale === "ar" ? "EN" : "ع"}
        </m.span>
      </AnimatePresence>
    </button>
  );
}
