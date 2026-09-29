import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { BadgeCheck, Briefcase, GraduationCap, Trophy } from "lucide-react";
import { useI18n } from "../i18n/LocaleProvider";
import type { Dict, Role } from "../i18n/types";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";
import { CountUp } from "./ui/CountUp";
import { inView } from "../lib/urlFlags";

const TAB_IDS = ["experience", "education", "certifications"] as const;
type TabId = (typeof TAB_IDS)[number];

const TAB_ICONS = {
  experience: Briefcase,
  education: GraduationCap,
  certifications: BadgeCheck,
} as const;

export function Resume() {
  const { t } = useI18n();
  const { stats } = t;
  const s = t.ui.sections.resume;
  const tabs = TAB_IDS.map((id) => ({ id, label: t.ui.resumeTabs[id], Icon: TAB_ICONS[id] }));
  const [tab, setTab] = useState<TabId>("experience");

  return (
    <section id="resume" className="relative scroll-mt-24 overflow-hidden py-24 lg:py-32">
      <div className="shell">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} highlight={s.highlight} />

        {/* numbers worth stating once */}
        <Stagger className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4" gap={0.07}>
          {stats.map((stat, i) => (
            <StaggerItem key={i}>
              <div className="panel h-full px-5 py-6 sm:px-6 sm:py-7">
                <p className="font-display text-[30px] leading-none font-bold text-mist-100 sm:text-[38px]">
                  <CountUp to={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-[13px] leading-snug text-mist-500">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-16 flex flex-wrap gap-2.5" direction="up">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`relative flex items-center gap-2.5 rounded-md px-5 py-3 font-display text-[12px] font-medium tracking-[0.08em] uppercase transition-colors duration-300 ${
                tab === id ? "text-on-brand" : "text-mist-500 hover:text-mist-100"
              }`}
            >
              {tab === id && (
                <m.span
                  layoutId="resume-tab"
                  className="absolute inset-0 rounded-md bg-brand-500"
                  transition={{ type: "spring", stiffness: 340, damping: 30 }}
                />
              )}
              <Icon size={15} className="relative z-10" />
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </Reveal>

        <div className="mt-10 min-h-[420px]">
          <AnimatePresence mode="wait">
            <m.div
              key={tab}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {tab === "experience" && <ExperienceList experience={t.experience} />}
              {tab === "education" && <EducationList education={t.education} award={t.award} />}
              {tab === "certifications" && <CertificationList certifications={t.certifications} />}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative ps-8 sm:ps-11">
      <m.span
        className="absolute top-2 bottom-2 start-[7px] w-px origin-top bg-gradient-to-b from-brand-500 via-ink-500 to-transparent sm:start-[11px]"
        initial={{ scaleY: 0 }}
        {...inView({ scaleY: 1 }, { once: true, amount: 0.1 })}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="space-y-6">{children}</div>
    </div>
  );
}

function Node({ active }: { active?: boolean }) {
  return (
    <span className="absolute top-8 -start-8 grid place-items-center sm:-start-11">
      <span
        className={`h-[15px] w-[15px] rounded-full border-2 sm:h-[23px] sm:w-[23px] ${
          active
            ? "border-brand-500 bg-ink-900 ring-4 ring-brand-500/15"
            : "border-ink-500 bg-ink-900"
        }`}
      />
      {active && (
        <span
          className="absolute h-[15px] w-[15px] rounded-full bg-brand-500/40 sm:h-[23px] sm:w-[23px]"
          style={{ animation: "pulse-ring 2.4s ease-out infinite" }}
        />
      )}
    </span>
  );
}

function ExperienceList({ experience }: { experience: Role[] }) {
  return (
    <Timeline>
      {experience.map((role, i) => (
        <Reveal key={i} direction="left" delay={i * 0.08} amount={0.15}>
          <article className="panel relative p-7">
            <Node active={role.current} />

            <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
              <div>
                <h3 className="text-[19px] font-semibold">{role.title}</h3>
                <p className="mt-1 text-[14px] text-brand-500">{role.company}</p>
              </div>
              <div className="text-start sm:text-end">
                <p className="font-mono text-[12px] text-mist-300">{role.period}</p>
                <p className="mt-0.5 text-[12px] text-mist-600">{role.location}</p>
              </div>
            </div>

            <ul className="mt-5 space-y-2.5">
              {role.points.map((point, p) => (
                <li key={p} className="flex gap-3 text-[14px] leading-relaxed text-mist-500">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-brand-500/70" />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      ))}
    </Timeline>
  );
}

function EducationList({
  education,
  award,
}: {
  education: Dict["education"];
  award: Dict["award"];
}) {
  return (
    <Timeline>
      {education.map((item, i) => (
        <Reveal key={i} direction="left" amount={0.15}>
          <article className="panel relative p-7">
            <Node active />
            <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
              <div>
                <h3 className="text-[19px] font-semibold">{item.title}</h3>
                <p className="mt-1 text-[14px] text-brand-500">{item.school}</p>
              </div>
              <div className="text-start sm:text-end">
                <p className="font-mono text-[12px] text-mist-300">{item.period}</p>
                <p className="mt-0.5 text-[12px] text-mist-600">{item.location}</p>
              </div>
            </div>
            <p className="mt-5 inline-flex items-center gap-2 rounded-md bg-brand-500/10 px-3.5 py-2 font-display text-[13px] font-medium text-brand-500">
              <GraduationCap size={15} />
              {item.note}
            </p>
          </article>
        </Reveal>
      ))}

      <Reveal direction="left" delay={0.1} amount={0.15}>
        <article className="panel relative overflow-hidden p-7">
          <Node />
          <span className="pointer-events-none absolute -top-20 -right-16 h-52 w-52 rounded-full bg-brand-500/10 blur-3xl" />

          <div className="relative flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-brand-500/12 text-brand-500">
                <Trophy size={20} />
              </span>
              <div>
                <h3 className="text-[19px] font-semibold">
                  {award.place}, {award.title}
                </h3>
                <p className="mt-1 text-[14px] text-brand-500">{award.org}</p>
              </div>
            </div>
            <p className="font-mono text-[12px] text-mist-300">{award.year}</p>
          </div>

          <p className="relative mt-5 text-[14px] leading-relaxed text-mist-500">{award.copy}</p>
        </article>
      </Reveal>
    </Timeline>
  );
}

function CertificationList({ certifications }: { certifications: string[] }) {
  return (
    <Stagger className="grid gap-4 sm:grid-cols-2" gap={0.07}>
      {certifications.map((cert, i) => (
        <StaggerItem key={i}>
          <div className="panel group flex h-full items-center gap-4 p-6 transition-colors">
            <span className="font-mono text-[12px] text-mist-600 transition-colors group-hover:text-brand-500">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="h-8 w-px bg-rule-strong" />
            <span className="text-[14px] font-medium text-mist-300">{cert}</span>
            <BadgeCheck
              size={17}
              className="ms-auto shrink-0 text-mist-600 transition-colors group-hover:text-brand-500"
            />
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
