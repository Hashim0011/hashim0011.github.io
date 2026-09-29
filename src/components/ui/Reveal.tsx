import { m, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { inView } from "../../lib/urlFlags";

const EASE = [0.22, 1, 0.36, 1] as const;

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 38 },
  down: { x: 0, y: -38 },
  left: { x: 46, y: 0 },
  right: { x: -46, y: 0 },
  none: { x: 0, y: 0 },
};

type RevealProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number;
};

/** The workhorse scroll animation: everything on the page enters through it. */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.75,
  className,
  amount = 0.25,
}: RevealProps) {
  const offset = offsets[direction];

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      {...inView({ opacity: 1, x: 0, y: 0 }, { once: true, amount })}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

/** Parent wrapper that walks its Stagger.Item children in one after another. */
export function Stagger({
  children,
  className,
  gap = 0.09,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  amount?: number;
}) {
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: gap, delayChildren: 0.05 } },
  };

  return (
    <m.div
      className={className}
      variants={variants}
      initial="hidden"
      {...inView("show", { once: true, amount })}
    >
      {children}
    </m.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div className={className} variants={itemVariants}>
      {children}
    </m.div>
  );
}

/**
 * Headline reveal, one word at a time.
 *
 * The observer lives on the wrapper, never on the sliding words themselves —
 * an IntersectionObserver accounts for ancestor clipping, so a word parked
 * below its own `overflow-hidden` mask would never register as visible and the
 * heading would stay blank forever.
 */
const wordVariants: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function SplitWords({
  text,
  className,
  delay = 0,
  highlight,
}: {
  text: string;
  className?: string;
  delay?: number;
  highlight?: string;
}) {
  const words = text.split(" ");
  const accents = highlight ? highlight.split(" ") : [];

  return (
    <m.span
      className={className}
      variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
      initial="hidden"
      {...inView("show", { once: true, amount: 0.4 })}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="me-[0.26em] inline-block overflow-hidden pb-[0.14em] align-bottom"
        >
          <m.span
            variants={wordVariants}
            className={`inline-block ${accents.includes(word) ? "text-brand-500" : ""}`}
          >
            {word}
          </m.span>
        </span>
      ))}
    </m.span>
  );
}
