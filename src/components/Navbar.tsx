import { useEffect, useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "../hooks/useActiveSection";
import { scrollToSection } from "../hooks/useSmoothScroll";
import { Magnetic } from "./ui/Magnetic";
import { ThemeToggle } from "./ui/ThemeToggle";
import { LanguageToggle } from "./ui/LanguageToggle";
import { useI18n } from "../i18n/LocaleProvider";

const sectionIds = ["home", "services", "work", "resume", "skills", "contact"];

export function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const active = useActiveSection(sectionIds);

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 40));

  // The overlay menu owns the viewport while it is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    // Let the overlay finish closing before Lenis takes the wheel.
    window.setTimeout(() => scrollToSection(id), menuOpen ? 320 : 0);
  };

  return (
    <>
      <m.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[200] transition-all duration-500 ${
          scrolled
            ? "border-b border-rule bg-ink-900/92 py-3 backdrop-blur-sm"
            : "border-b border-transparent py-5"
        }`}
      >
        {/* Three slots with equal outer columns, so the links sit dead centre in
            the header rather than being pushed off it by whatever the controls
            happen to weigh. The first slot is deliberately empty: the wordmark
            belongs to the loading screen now. */}
        <nav className="shell grid grid-cols-[1fr_auto_1fr] items-center gap-6">
          <span aria-hidden />

          <ul className="hidden items-center gap-8 lg:flex">
            {t.nav.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => go(link.id)}
                  className={`relative font-display text-[12px] font-medium tracking-[0.16em] uppercase transition-colors duration-300 ${
                    active === link.id ? "text-mist-100" : "text-mist-500 hover:text-mist-100"
                  }`}
                >
                  {link.label}
                  {active === link.id && (
                    <m.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 start-0 h-[2px] w-full rounded-full bg-brand-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 justify-self-end">
            <LanguageToggle />
            <ThemeToggle />

            <Magnetic className="hidden sm:block">
              <button
                onClick={() => go("contact")}
                className="group relative overflow-hidden rounded-md border border-brand-500/60 px-6 py-2.5 font-display text-[11px] font-semibold tracking-[0.18em] text-mist-100 uppercase transition-colors duration-300 hover:text-on-brand"
              >
                <span className="relative z-10">{t.ui.hireMe}</span>
                <span className="absolute inset-0 -translate-y-full bg-brand-500 transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
              </button>
            </Magnetic>

            <button
              onClick={() => setMenuOpen(true)}
              className="chip lg:hidden"
              aria-label={t.ui.openMenu}
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </m.header>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            className="fixed inset-0 z-[250] bg-ink-950/97 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* The header sits under this overlay, so the theme toggle is
                repeated here rather than trapping the choice behind a close. */}
            <div className="shell flex h-20 items-center justify-end gap-3">
              <LanguageToggle />
              <ThemeToggle />

              <button onClick={() => setMenuOpen(false)} className="chip" aria-label={t.ui.closeMenu}>
                <X size={18} />
              </button>
            </div>

            <ul className="shell mt-10 space-y-2">
              {t.nav.map((link, i) => (
                <m.li
                  key={link.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    onClick={() => go(link.id)}
                    className="flex w-full items-baseline gap-4 border-b border-rule py-4 text-start"
                  >
                    <span className="font-mono text-xs text-brand-500">
                      0{i + 1}
                    </span>
                    <span className="font-display text-3xl font-semibold text-mist-100">
                      {link.label}
                    </span>
                  </button>
                </m.li>
              ))}
            </ul>

            <m.a
              href={`mailto:${t.profile.email}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="shell mt-12 block text-sm text-mist-500"
            >
              {t.profile.email}
            </m.a>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
