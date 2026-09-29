import { useEffect, useState } from "react";

/**
 * Tracks which section owns the viewport so the nav can highlight it.
 *
 * Offsets are measured once and cached. The previous version read
 * `getBoundingClientRect()` for every section on every animation frame, which
 * is six forced layout reads per frame for a number that only changes when the
 * page is resized or content loads — the kind of cost that is invisible on a
 * laptop and very visible on a phone.
 *
 * The listener is passive and coalesced into one frame, so scrolling never
 * schedules more than a single comparison of cached numbers.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    let tops: { id: string; top: number }[] = [];
    let frame = 0;

    const measure = () => {
      tops = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)
        .map((el) => ({ id: el.id, top: el.offsetTop }));
      read();
    };

    const read = () => {
      frame = 0;
      if (!tops.length) return;
      const line = window.scrollY + window.innerHeight * 0.5;
      let current = tops[0].id;
      for (const section of tops) if (section.top <= line) current = section.id;
      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    measure();

    // Sections arrive with the lazy chunk and grow as fonts and images land, so
    // the cached offsets have to be refreshed when the page changes height.
    const observer = new ResizeObserver(measure);
    observer.observe(document.documentElement);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [ids]);

  return active;
}
