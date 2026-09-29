import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a, button, input, textarea, select, [data-cursor]";

/**
 * Dot + trailing ring. Only mounts for fine pointers, so touch devices keep
 * their native behaviour and pay nothing for it.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;
    setEnabled(true);

    document.documentElement.style.cursor = "none";

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest(INTERACTIVE)));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <m.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[999] h-1.5 w-1.5 rounded-full bg-brand-500"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.18 }}
      />
      <m.div
        aria-hidden
        className={`pointer-events-none fixed top-0 left-0 z-[999] rounded-full border border-brand-500/70 transition-colors duration-200 ${
          hovering ? "bg-brand-500/12" : "bg-transparent"
        }`}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 46 : 26,
          height: hovering ? 46 : 26,
          opacity: visible ? (hovering ? 1 : 0.55) : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      />
    </>
  );
}
