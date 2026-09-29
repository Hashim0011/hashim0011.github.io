import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { AnimatePresence, LazyMotion } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { Preloader } from "./components/Preloader";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { Cursor } from "./components/ui/Cursor";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { LocaleProvider } from "./i18n/LocaleProvider";
import { STATIC_RENDER } from "./lib/urlFlags";

/**
 * Started here rather than inside `lazy()` so the request goes out as soon as
 * this module evaluates, in parallel with the hero's own work, instead of
 * waiting for React to reach the Suspense boundary. The loading curtain runs
 * for about a second and a half, which is more than enough cover for it.
 */
const belowFold = import("./components/BelowFold");
const BelowFold = lazy(() => belowFold);

const loadMotionFeatures = () => import("./lib/motionFeatures").then((mod) => mod.default);

export default function App() {
  // ?static hands the page over already open, with no curtain to capture.
  const [curtainDone, setCurtainDone] = useState(STATIC_RENDER);
  const [deferredReady, setDeferredReady] = useState(false);
  const finish = useCallback(() => setCurtainDone(true), []);

  // The curtain lifts on whichever comes last: its own progress run, or the
  // deferred half arriving. Lifting first would put the parse and the first
  // render of five sections on screen, which is exactly the stutter the split
  // was meant to hide. Capped so a slow connection cannot strand anyone.
  useEffect(() => {
    let alive = true;
    const done = () => alive && setDeferredReady(true);
    const cap = window.setTimeout(done, 2500);
    belowFold.then(done, done).finally(() => window.clearTimeout(cap));
    return () => {
      alive = false;
      window.clearTimeout(cap);
    };
  }, []);

  const loading = !STATIC_RENDER && (!curtainDone || !deferredReady);

  useSmoothScroll();

  return (
    <LocaleProvider>
      <LazyMotion features={loadMotionFeatures}>
          <div className="backdrop-mesh" aria-hidden />

        <AnimatePresence>{loading && <Preloader onDone={finish} />}</AnimatePresence>

        <Cursor />
        <ScrollProgress />
        <Navbar />

        <main>
          <Hero />

          {/* A screen-tall placeholder while the chunk lands, so the footer never
              flashes up under the hero and the scrollbar does not jump. */}
          <Suspense fallback={<div className="min-h-svh" aria-hidden />}>
            <BelowFold />
          </Suspense>
        </main>

        <Footer />
        <WhatsAppButton />
      </LazyMotion>
    </LocaleProvider>
  );
}
