import { m, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  return (
    <m.div
      aria-hidden
      className="fixed top-0 start-0 z-[300] h-[2px] w-full origin-left rtl:origin-right bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400"
      style={{ scaleX: width }}
    />
  );
}
