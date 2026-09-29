import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import type { Project } from "../i18n/types";
import { useI18n } from "../i18n/LocaleProvider";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Reveal";
import { ProjectVisual } from "./ui/ProjectVisual";

export function Portfolio() {
  const { t } = useI18n();
  const s = t.ui.sections.work;
  const [openProject, setOpenProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!openProject) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenProject(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openProject]);

  return (
    <section id="work" className="relative scroll-mt-24 overflow-hidden py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow={s.eyebrow}
          title={s.title}
          highlight={s.highlight}
          align="center"
        />

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {t.projects.map((project, i) => (
            <StaggerItem
              key={project.id}
              // A single card left alone on the last row reads as a gap in the
              // grid; nudge it to the middle column so the row looks composed.
              className={
                i === t.projects.length - 1 && t.projects.length % 3 === 1
                  ? "lg:col-start-2"
                  : undefined
              }
            >
              <m.button
                onClick={() => setOpenProject(project)}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                className="panel group relative block h-full w-full overflow-hidden p-3 text-start"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[8px]">
                  <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]">
                    <ProjectVisual image={project.image} visual={project.visual} />
                  </div>

                  <div className="absolute inset-0 bg-veil/0 transition-colors duration-500 group-hover:bg-veil/55" />

                  <span className="absolute top-3 end-3 rounded-full bg-ink-950/70 px-2.5 py-1 font-mono text-[10px] text-mist-500 backdrop-blur-sm">
                    {project.year}
                  </span>

                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-12 w-12 translate-y-3 scale-75 place-items-center rounded-full bg-brand-500 text-on-brand opacity-0 shadow-xl shadow-brand-500/30 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                      <ArrowUpRight size={20} />
                    </span>
                  </span>
                </div>

                <div className="px-2 pt-5 pb-3">
                  <p className="font-display text-[11px] font-medium tracking-[0.2em] text-brand-500 uppercase">
                    {project.category}
                  </p>
                  <h3 className="mt-2.5 text-[17px] leading-snug font-semibold transition-colors duration-300 group-hover:text-brand-500">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 line-clamp-2 text-[13px] text-mist-500">{project.blurb}</p>
                </div>
              </m.button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <AnimatePresence>
        {openProject && (
          <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useI18n();
  const label = t.ui.closeProject;

  // Rendered on <body>: a fixed overlay is only fixed to the viewport while no
  // ancestor has a transform, filter or paint containment. Portalling it out
  // means a future change to any section cannot quietly trap it.
  return createPortal(
    <m.div
      className="fixed inset-0 z-[400] grid place-items-center overflow-y-auto bg-scrim p-4 backdrop-blur-sm sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <m.div
        className="panel relative my-auto w-full max-w-2xl overflow-hidden"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 end-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-ink-950/70 text-mist-300 backdrop-blur-sm transition-colors hover:bg-brand-500 hover:text-on-brand"
          aria-label={label}
        >
          <X size={16} />
        </button>

        <div className="relative aspect-[16/9] overflow-hidden">
          <ProjectVisual image={project.image} visual={project.visual} alt={`${project.title} interface`} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
        </div>

        <div className="p-7 sm:p-9">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-display text-[11px] font-medium tracking-[0.2em] text-brand-500 uppercase">
              {project.category}
            </span>
            <span className="font-mono text-[11px] text-mist-600">{project.year}</span>
          </div>

          <h3 className="mt-3 text-[24px] leading-tight font-bold sm:text-[28px]">
            {project.title}
          </h3>

          {/* A blank line in the copy means a new paragraph. */}
          {project.detail.split("\n\n").map((para, i) => (
            <p key={i} className="mt-4 text-[14px] leading-relaxed text-mist-500">
              {para}
            </p>
          ))}

          <div className="mt-7 flex flex-wrap gap-2">
            {project.stack.map((tech, i) => (
              <span
                key={i}
                className="rounded-full border border-rule-strong bg-ink-850 px-3.5 py-1.5 font-mono text-[11px] text-mist-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-7 flex items-center gap-2.5 border-t border-rule pt-5 text-[12px] text-mist-600">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            {project.metric}
          </div>
        </div>
      </m.div>
    </m.div>,
    document.body,
  );
}
