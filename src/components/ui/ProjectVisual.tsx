import type { ReactElement } from "react";
import { memo } from "react";
import type { Project } from "../../i18n/types";

/**
 * Hand-drawn product mockups instead of stock screenshots — each card gets a
 * small abstraction of what the project actually looks like.
 */

const Dots = () => (
  <div className="flex gap-1.5">
    <span className="h-2 w-2 rounded-full bg-ink-500" />
    <span className="h-2 w-2 rounded-full bg-ink-500" />
    <span className="h-2 w-2 rounded-full bg-brand-500/70" />
  </div>
);

function Dashboard() {
  const bars = [38, 62, 45, 80, 55, 92, 70];
  return (
    <div className="flex h-full w-full flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <Dots />
        <div className="h-1.5 w-16 rounded-full bg-ink-600" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {["var(--color-brand-500)", "#3d7dff", "#e0a83a"].map((color, i) => (
          <div key={color} className="rounded-md bg-ink-850/90 p-2.5 shadow-inner">
            <div className="h-1 w-6 rounded-full bg-ink-600" />
            <div
              className="mt-2 h-2 rounded-full"
              style={{ width: `${58 + i * 12}%`, background: color, opacity: 0.85 }}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-1 items-end gap-1.5 rounded-md bg-ink-850/80 p-3">
        {bars.map((height, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm transition-all duration-500"
            style={{
              height: `${height}%`,
              background:
                i === 5
                  ? "linear-gradient(180deg,var(--color-brand-500),rgb(var(--brand-rgb)/0.33))"
                  : "linear-gradient(180deg,#333945,#23272f)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Chat() {
  return (
    <div className="flex h-full w-full items-end justify-center gap-4 px-6 pt-6">
      <div className="hidden w-1/3 flex-col gap-2 pb-8 sm:flex">
        <div className="h-1.5 w-full rounded-full bg-ink-600" />
        <div className="h-1.5 w-3/4 rounded-full bg-ink-600/70" />
        <div className="h-1.5 w-5/6 rounded-full bg-ink-600/50" />
        <div className="mt-3 h-8 w-24 rounded-md border border-brand-500/40 bg-brand-500/10" />
      </div>

      <div className="h-full w-[52%] max-w-[190px] rounded-t-[22px] border border-ink-600 border-b-0 bg-ink-850 p-3 shadow-2xl">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-ink-500" />
        <div className="space-y-2">
          <div className="ml-auto w-4/5 rounded-lg rounded-br-sm bg-brand-500/85 p-2">
            <div className="h-1 w-full rounded-full bg-white/60" />
            <div className="mt-1.5 h-1 w-2/3 rounded-full bg-white/40" />
          </div>
          <div className="w-[88%] rounded-lg rounded-bl-sm bg-ink-700 p-2">
            <div className="h-1 w-full rounded-full bg-mist-600" />
            <div className="mt-1.5 h-1 w-5/6 rounded-full bg-mist-600/70" />
            <div className="mt-1.5 h-1 w-1/2 rounded-full bg-mist-600/50" />
          </div>
          <div className="ml-auto w-3/5 rounded-lg rounded-br-sm bg-brand-500/60 p-2">
            <div className="h-1 w-3/4 rounded-full bg-rule0" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Devices() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute bottom-0 left-[12%] h-[78%] w-[38%] rotate-[-8deg] rounded-t-2xl border border-ink-600 border-b-0 bg-ink-850 p-2.5 shadow-2xl">
        <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-ink-500" />
        <div className="h-10 rounded-md bg-gradient-to-br from-brand-500/70 to-brand-600/30" />
        <div className="mt-2 space-y-1.5">
          <div className="h-1 w-full rounded-full bg-ink-600" />
          <div className="h-1 w-2/3 rounded-full bg-ink-600/60" />
          <div className="h-1 w-4/5 rounded-full bg-ink-600/60" />
        </div>
      </div>

      <div className="absolute right-[10%] bottom-0 h-[86%] w-[42%] rotate-[6deg] rounded-t-2xl border border-ink-600 border-b-0 bg-ink-800 p-2.5 shadow-2xl">
        <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-ink-500" />
        <div className="flex gap-1.5">
          <div className="h-6 flex-1 rounded bg-ink-700" />
          <div className="h-6 flex-1 rounded bg-brand-500/60" />
        </div>
        <div className="mt-2 space-y-1.5">
          <div className="h-1 w-5/6 rounded-full bg-ink-600" />
          <div className="h-1 w-full rounded-full bg-ink-600/60" />
          <div className="h-1 w-1/2 rounded-full bg-ink-600/60" />
          <div className="h-1 w-3/4 rounded-full bg-ink-600/40" />
        </div>
      </div>
    </div>
  );
}

function Web() {
  return (
    <div className="flex h-full w-full flex-col p-5">
      <div className="flex items-center justify-between rounded-t-md bg-ink-850 px-3 py-2">
        <Dots />
        <div className="h-1.5 w-24 rounded-full bg-ink-700" />
      </div>
      <div className="flex-1 rounded-b-md bg-gradient-to-b from-ink-800 to-ink-850 p-4">
        <div className="flex items-center justify-between">
          <div className="h-1.5 w-10 rounded-full bg-brand-500" />
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-1.5 w-6 rounded-full bg-ink-600" />
            ))}
          </div>
        </div>
        <div className="mt-4 h-2.5 w-2/3 rounded-full bg-mist-600/60" />
        <div className="mt-2 h-2.5 w-1/2 rounded-full bg-mist-600/35" />
        <div className="mt-4 h-6 w-20 rounded-md bg-brand-500/80" />
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-8 rounded bg-ink-700/80" />
          ))}
        </div>
      </div>
    </div>
  );
}

function Analytics() {
  return (
    <div className="relative grid h-full w-full place-items-center p-5">
      <svg viewBox="0 0 200 140" className="h-full w-full" role="presentation">
        <defs>
          <linearGradient id="scanline" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" style={{ stopColor: "var(--color-brand-500)" }} stopOpacity="0" />
            <stop offset="50%" style={{ stopColor: "var(--color-brand-500)" }} stopOpacity="0.9" />
            <stop offset="100%" style={{ stopColor: "var(--color-brand-500)" }} stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx="100"
            cy="70"
            r={22 + i * 18}
            fill="none"
            stroke="#333945"
            strokeWidth="1"
            strokeDasharray={i === 1 ? "4 6" : undefined}
          />
        ))}

        <circle cx="100" cy="70" r="10" className="fill-brand-500" fillOpacity="0.9" />
        <circle cx="100" cy="70" r="16" fill="none" className="stroke-brand-500" strokeOpacity="0.4" />

        <path
          d="M20 70 H180"
          stroke="url(#scanline)"
          strokeWidth="1.5"
          className="origin-center"
        />

        {[
          [46, 34],
          [156, 40],
          [40, 108],
          [162, 104],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <line x1="100" y1="70" x2={cx} y2={cy} stroke="#262b34" strokeWidth="1" />
            <circle cx={cx} cy={cy} r="4" fill="#8b909b" fillOpacity={i % 2 ? 0.5 : 0.85} />
          </g>
        ))}
      </svg>
    </div>
  );
}

function Quality() {
  const rows = [
    { pass: true, w: "72%" },
    { pass: true, w: "58%" },
    { pass: false, w: "80%" },
    { pass: true, w: "64%" },
    { pass: true, w: "46%" },
  ];

  return (
    <div className="flex h-full w-full flex-col gap-2.5 p-5">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-brand-500/15 px-2 py-0.5 font-mono text-[9px] whitespace-nowrap text-brand-500">
          4 / 5 passed
        </span>
        <span className="h-1.5 w-16 rounded-full bg-ink-600" />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2 rounded-md bg-ink-850/80 p-3">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${
                row.pass ? "bg-brand-400/80" : "bg-mist-600"
              }`}
            />
            <span
              className="h-1 rounded-full bg-ink-600"
              style={{ width: row.w, opacity: row.pass ? 0.8 : 1 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const visuals: Record<Project["visual"], () => ReactElement> = {
  dashboard: Dashboard,
  chat: Chat,
  devices: Devices,
  web: Web,
  analytics: Analytics,
  quality: Quality,
};

export const ProjectVisual = memo(function ProjectVisual({
  image,
  visual,
  alt = "",
}: {
  image?: Project["image"];
  visual: Project["visual"];
  alt?: string;
}) {
  // Shot mockups sit on their own black backdrop, so `contain` keeps every
  // device whole and the letterboxing disappears into the card.
  if (image) {
    return (
      <div className="absolute inset-0 bg-black">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  const Visual = visuals[visual];
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#0b0d11] via-[#08090c] to-black">
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(#333945_1px,transparent_1px),linear-gradient(90deg,#333945_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="absolute -top-16 -right-10 h-40 w-40 rounded-full bg-brand-500/15 blur-3xl" />
      <div className="relative h-full w-full">
        <Visual />
      </div>
    </div>
  );
});
