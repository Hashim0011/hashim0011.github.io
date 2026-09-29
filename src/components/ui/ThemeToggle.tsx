import { AnimatePresence, m } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

/**
 * Sun and moon swap on a short vertical arc rather than crossfading in place —
 * a fade between two glyphs of different weight reads as a smudge at this size.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  const label = dark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      className={`chip relative overflow-hidden ${className}`}
      aria-label={label}
      title={label}
    >
      <AnimatePresence initial={false} mode="wait">
        <m.span
          key={theme}
          initial={{ y: 16, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -16, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 grid place-items-center"
        >
          {dark ? <Moon size={17} /> : <Sun size={17} />}
        </m.span>
      </AnimatePresence>
    </button>
  );
}
