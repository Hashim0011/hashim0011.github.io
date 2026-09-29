import { m } from "framer-motion";
import { memo } from "react";
import { useI18n } from "../i18n/LocaleProvider";

const EASE = [0.22, 1, 0.36, 1] as const;
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { inView } from "../lib/urlFlags";

export function Skills() {
  const { t, dir } = useI18n();
  // Rows slide in from the reading edge, so the entrance runs with the language
  // rather than against it.
  const from = dir === "rtl" ? 14 : -14;
  const s = t.ui.sections.skills;

  return (
    <section id="skills" className="relative scroll-mt-24 overflow-hidden py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow={s.eyebrow}
          title={s.title}
          highlight={s.highlight}
          align="center"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {t.skillGroups.map((group, groupIndex) => (
            <Reveal key={groupIndex} direction="up" delay={groupIndex * 0.1} className="h-full">
              <div className="panel flex h-full flex-col p-7">
                <h3 className="font-display text-[12px] font-semibold tracking-[0.2em] text-brand-500 uppercase">
                  {group.label}
                </h3>

                {/* No bars, no percentages: a self-assigned 88% tells a reader
                    nothing they can check. The rows share the card's height
                    equally, so a four-item group sits as comfortably as a
                    five-item one. */}
                <ul className="mt-5 flex flex-1 flex-col border-t border-rule">
                  {group.items.map((skill, i) => (
                    <m.li
                      key={i}
                      initial={{ opacity: 0, x: from }}
                      {...inView({ opacity: 1, x: 0 }, { once: true, amount: 0.6 })}
                      transition={{
                        duration: 0.55,
                        delay: groupIndex * 0.07 + i * 0.07,
                        ease: EASE,
                      }}
                      className="group/row flex flex-1 items-center gap-3.5 border-b border-rule py-3.5"
                    >
                      <span className="h-[7px] w-[7px] shrink-0 rotate-45 border border-brand-500/70 transition-all duration-500 ease-out group-hover/row:rotate-[135deg] group-hover/row:bg-brand-500" />

                      <span className="text-[14px] font-medium text-mist-300 transition-colors duration-300 group-hover/row:text-mist-100">
                        {skill}
                      </span>

                      {/* Gives the row something to answer the marker with,
                          now that the percentage has gone. */}
                      <span className="ms-auto h-px w-0 bg-brand-500/45 transition-all duration-500 ease-out group-hover/row:w-8" />
                    </m.li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Toolbelt tools={t.toolbelt} />
    </section>
  );
}

/**
 * Thirty spans of Latin text on a CSS loop, identical in both languages.
 * Memoised so a language switch does not rebuild it along with everything else.
 */
const Toolbelt = memo(function Toolbelt({ tools }: { tools: string[] }) {
  return (
    <div className="mask-fade-x relative mt-16 flex overflow-hidden py-2">
      <div
        className="flex shrink-0 items-center gap-10 pe-10"
        style={{ animation: "marquee 34s linear infinite" }}
      >
        {[...tools, ...tools].map((tool, i) => (
          <span
            key={`${tool}-${i}`}
            className="flex shrink-0 items-center gap-10 font-display text-[26px] font-semibold whitespace-nowrap text-ink-500 transition-colors duration-300 hover:text-mist-300 sm:text-[34px]"
          >
            {tool}
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500/60" />
          </span>
        ))}
      </div>
    </div>
  );
});
