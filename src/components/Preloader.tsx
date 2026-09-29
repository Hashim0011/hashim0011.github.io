import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { useI18n } from "../i18n/LocaleProvider";

/** Short intro curtain — long enough to feel intentional, short enough to forgive. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const { t } = useI18n();
  const { firstName } = t.profile;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;
    const timer = window.setInterval(() => {
      // uneven steps read as loading, a linear ramp reads as decoration
      value = Math.min(100, value + Math.random() * 18 + 6);
      setProgress(value);
      if (value >= 100) {
        window.clearInterval(timer);
        window.setTimeout(onDone, 380);
      }
    }, 110);

    return () => window.clearInterval(timer);
  }, [onDone]);

  return (
    <m.div
      className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-ink-950"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <m.span
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-display text-2xl font-bold tracking-tight text-mist-100"
      >
        {firstName}
        <span className="text-brand-500">.</span>
      </m.span>

      <div className="mt-6 h-px w-40 overflow-hidden bg-ink-700">
        <m.div
          className="h-full bg-brand-500"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      <span className="mt-4 font-mono text-[11px] text-mist-600">
        {Math.round(progress).toString().padStart(3, "0")}
      </span>
    </m.div>
  );
}
