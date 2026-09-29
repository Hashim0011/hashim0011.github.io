import { useEffect } from "react";
import Lenis from "lenis";

let lenis: Lenis | null = null;

/**
 * Hands scrolling over to Lenis so the whole page eases instead of stepping.
 * Anchor clicks are routed through the same instance, otherwise the browser
 * jump would cut straight through the easing.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Touch devices keep their native scroll. A phone scrolls on the compositor
    // thread; Lenis moves that work to the main thread, where it competes with
    // React and every observer on the page, and the result on a mid-range
    // handset is the stutter this smoothing was meant to remove.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis?.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}

export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  if (lenis) {
    lenis.scrollTo(target, { offset: -70, duration: 1.3 });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}
