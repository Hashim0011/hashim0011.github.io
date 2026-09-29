import { m } from "framer-motion";
import {
  Bug,
  ClipboardList,
  Code2,
  PenTool,
  Search,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "../i18n/types";
import { useI18n } from "../i18n/LocaleProvider";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Reveal";

const icons: Record<Service["icon"], LucideIcon> = {
  code: Code2,
  clipboard: ClipboardList,
  bug: Bug,
  workflow: Workflow,
  search: Search,
  figma: PenTool,
};

export function Services() {
  const { t } = useI18n();
  const s = t.ui.sections.services;

  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(var(--brand-rgb)/0.1)_0%,transparent_70%)]" />

      <div className="shell">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} highlight={s.highlight} />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <StaggerItem key={service.icon}>
                <m.article
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="panel group relative h-full overflow-hidden p-7"
                >
                  {/* accent wash that grows out of the icon on hover */}
                  <span className="pointer-events-none absolute -top-16 -left-16 h-40 w-40 rounded-full bg-brand-500/0 blur-3xl transition-all duration-700 group-hover:bg-brand-500/20" />

                  <span className="relative inline-flex text-brand-500 transition-transform duration-500 group-hover:scale-110">
                    <Icon size={30} strokeWidth={1.5} />
                  </span>

                  <h3 className="relative mt-6 text-[19px] font-semibold">{service.title}</h3>
                  <p className="relative mt-3 text-[14px] leading-relaxed text-mist-500">
                    {service.copy}
                  </p>

                  <span className="relative mt-6 block h-px w-full bg-rule">
                    <span className="absolute inset-y-0 start-0 w-0 bg-brand-500 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
                  </span>
                </m.article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
