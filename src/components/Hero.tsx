import { useEffect, useRef, useState } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Linkedin, Mail, MapPin } from "lucide-react";
import { useI18n } from "../i18n/LocaleProvider";
import { STATIC_RENDER } from "../lib/urlFlags";
import { scrollToSection } from "../hooks/useSmoothScroll";
import { Magnetic } from "./ui/Magnetic";
import { Portrait } from "./ui/Portrait";
import {
  FigmaMark,
  N8nMark,
  NextMark,
  NodeMark,
  ReactMark,
  SupabaseMark,
  TypeScriptMark,
} from "./ui/TechMarks";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Types a role out, holds it, deletes it, moves to the next one. */
function useTypedRole(words: readonly string[]) {
  // Captured mid-word, the headline reads "a Softwa". Settle on a whole one.
  const [text, setText] = useState(STATIC_RENDER ? words[0] : "");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (STATIC_RENDER) return;
    const word = words[index % words.length];
    const done = !deleting && text === word;
    const cleared = deleting && text === "";

    let delay = deleting ? 45 : 95;
    if (done) delay = 1900;
    if (cleared) delay = 320;

    const timer = window.setTimeout(() => {
      if (done) {
        setDeleting(true);
      } else if (cleared) {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [text, deleting, index, words]);

  return text;
}

const socialsFor = (p: { linkedin: string; email: string }, emailLabel: string) => [
  { href: p.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: `mailto:${p.email}`, label: emailLabel, Icon: Mail },
];

const stack = [
  { label: "React", Mark: ReactMark },
  { label: "Next.js", Mark: NextMark },
  { label: "TypeScript", Mark: TypeScriptMark },
  { label: "Node.js", Mark: NodeMark },
  { label: "Supabase", Mark: SupabaseMark },
  { label: "n8n", Mark: N8nMark },
  { label: "Figma", Mark: FigmaMark },
];

export function Hero() {
  const { t } = useI18n();
  const { profile, ui } = t;
  const socials = socialsFor(profile, ui.emailLabel);
  const typed = useTypedRole(profile.roles);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative grain flex min-h-svh items-center overflow-hidden pt-28 pb-20 lg:pt-24"
    >
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-12%] right-[-6%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgb(var(--brand-rgb)/0.17)_0%,transparent_68%)]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgb(20_150_160/0.14)_0%,transparent_68%)]" />
      </div>

      <div className="shell grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <m.div style={{ y: copyY, opacity: fade }}>
          <m.h1
            className="hero-title text-[34px] leading-[1.16] font-bold sm:text-[44px] lg:text-[50px]"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          >
            <span className="block text-mist-100">{ui.greeting}</span>
            <span className="block text-brand-500">{profile.name}</span>
            {/* Every role is laid out here at once, stacked into a single grid
                cell and hidden, purely so the line box is always as tall as the
                longest one needs. Without it the headline grows the moment
                "Frontend Developer" wraps to a second line and shoves the
                paragraph below it 40px down the page, mid-sentence. Stacking
                beats measuring a longest string: it stays correct at any width,
                in either language, whatever the font ends up being. */}
            <span className="grid text-mist-100">
              {profile.roles.map((role) => (
                <span key={role} aria-hidden className="invisible col-start-1 row-start-1">
                  {ui.rolePrefix}
                  {role}
                </span>
              ))}

              <span className="col-start-1 row-start-1">
                {ui.rolePrefix}
                {typed}
                <span
                  className="ms-0.5 inline-block h-[0.78em] w-[3px] translate-y-[0.04em] bg-brand-500 align-middle"
                  style={{ animation: "caret 1.05s step-end infinite" }}
                />
              </span>
            </span>
          </m.h1>

          <m.p
            className="lead mt-6 text-[15px]"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          >
            {profile.intro}
          </m.p>

          <m.div
            className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-mist-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} className="text-brand-500" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full rounded-full bg-brand-400"
                  style={{ animation: "pulse-ring 2s ease-out infinite" }}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
              </span>
              {profile.availability}
            </span>
          </m.div>

          <m.div
            className="mt-11 flex flex-wrap items-start gap-x-16 gap-y-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          >
            <div>
              <p className="font-display text-[11px] font-medium tracking-[0.22em] text-mist-600 uppercase">
                {ui.findMeOn}
              </p>
              <div className="mt-4 flex gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <Magnetic key={label} strength={0.35}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={label}
                      className="chip"
                    >
                      <Icon size={17} />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>

            <div>
              <p className="font-display text-[11px] font-medium tracking-[0.22em] text-mist-600 uppercase">
                {ui.bestSkillOn}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {stack.map(({ label, Mark }) => (
                  <span
                    key={label}
                    role="img"
                    aria-label={label}
                    title={label}
                    className="chip text-mist-500 transition-colors hover:text-brand-500"
                  >
                    <Mark size={19} />
                  </span>
                ))}
              </div>
            </div>
          </m.div>
        </m.div>

        <m.div
          style={{ y: portraitY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
          className="px-2 sm:px-8 lg:px-0"
        >
          <Portrait />
        </m.div>
      </div>

      <m.button
        onClick={() => scrollToSection("services")}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-mist-600 transition-colors hover:text-brand-500 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-label={ui.scrollAria}
      >
        <span className="font-display text-[10px] tracking-[0.3em] uppercase">{ui.scroll}</span>
        <m.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={15} />
        </m.span>
      </m.button>
    </section>
  );
}
