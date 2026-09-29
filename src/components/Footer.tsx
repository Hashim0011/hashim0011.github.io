import { ArrowUp, Linkedin, Mail } from "lucide-react";
import { useI18n } from "../i18n/LocaleProvider";
import { scrollToSection, scrollToTop } from "../hooks/useSmoothScroll";
import { Magnetic } from "./ui/Magnetic";

const socialsFor = (p: { linkedin: string; email: string }, emailLabel: string) => [
  { href: p.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: `mailto:${p.email}`, label: emailLabel, Icon: Mail },
];

export function Footer() {
  const { t } = useI18n();
  const { profile, ui } = t;
  const socials = socialsFor(profile, ui.emailLabel);

  return (
    <footer className="relative border-t border-rule bg-ink-950/40">
      <div className="shell pt-14 pb-24 sm:pb-20">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="text-center lg:text-start">
            <button onClick={scrollToTop} className="group inline-flex items-baseline gap-0.5">
              <span className="font-display text-[20px] font-bold tracking-tight text-mist-100 transition-colors duration-300 group-hover:text-brand-500">
                {profile.name}
              </span>
              <span className="font-display text-[20px] font-bold text-brand-500">.</span>
            </button>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-mist-600">
{ui.footer.blurb}
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-7 gap-y-3">
            {t.nav.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="font-display text-[12px] tracking-[0.14em] text-mist-500 uppercase transition-colors duration-300 hover:text-brand-500"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <Magnetic key={label} strength={0.35}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="chip"
                >
                  <Icon size={16} />
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-rule pt-7 sm:flex-row">
          <p className="text-[12px] text-mist-600">
            © {new Date().getFullYear()} {profile.name}. {ui.footer.rights}
          </p>

          <Magnetic strength={0.3}>
            <button
              onClick={scrollToTop}
              className="chip"
              aria-label={ui.backToTop}
            >
              <ArrowUp size={16} />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
