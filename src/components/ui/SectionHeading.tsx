import { m } from "framer-motion";
import { SplitWords } from "./Reveal";
import { inView } from "../../lib/urlFlags";

type Props = {
  eyebrow: string;
  title: string;
  highlight?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  align = "left",
  className = "",
}: Props) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      <m.p
        className="eyebrow"
        initial={{ opacity: 0, y: 14 }}
        {...inView({ opacity: 1, y: 0 }, { once: true, amount: 0.8 })}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {eyebrow}
      </m.p>

      <h2 className="mt-3 text-[34px] font-bold sm:text-[44px] lg:text-[52px]">
        <SplitWords text={title} highlight={highlight} delay={0.08} />
      </h2>

      <m.span
        className={`mt-6 block h-px bg-gradient-to-r from-brand-500 to-transparent ${
          centered ? "mx-auto" : ""
        }`}
        initial={{ width: 0, opacity: 0 }}
        {...inView({ width: 96, opacity: 1 }, { once: true, amount: 0.8 })}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
