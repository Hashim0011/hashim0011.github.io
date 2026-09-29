type MarkProps = { size?: number; className?: string };

/** Small brand marks drawn inline so the hero never waits on an icon font. */

export function ReactMark({ size = 20, className }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none" className={className}>
      <circle cx="12" cy="12" r="1.9" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="0.9" fill="none">
        <ellipse cx="12" cy="12" rx="10.4" ry="3.9" />
        <ellipse cx="12" cy="12" rx="10.4" ry="3.9" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10.4" ry="3.9" transform="rotate(120 12 12)" />
      </g>
    </svg>
  );
}

export function TypeScriptMark({ size = 20, className }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className={className}>
      <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <text
        x="12"
        y="16.2"
        textAnchor="middle"
        fontSize="9.5"
        fontFamily="Poppins, sans-serif"
        fontWeight="700"
        fill="currentColor"
      >
        TS
      </text>
    </svg>
  );
}

export function NodeMark({ size = 20, className }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none" className={className}>
      <path
        d="M12 2.2 21 7.1v9.8L12 21.8 3 16.9V7.1z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M9.4 9.2v5.1c0 .9-1.5 1-1.9.1M12.6 14.8c1.9.6 3.6.2 3.6-1.2 0-1.9-3.5-1.2-3.5-2.7 0-1 1.4-1.4 3-.8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SupabaseMark({ size = 20, className }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none" className={className}>
      <path
        d="M13.2 2 4.4 12.6c-.5.6-.1 1.6.7 1.6h6.1v7.6c0 .9 1.2 1.3 1.7.6l8.8-10.6c.5-.6.1-1.6-.7-1.6h-6.1V2.7c0-.9-1.2-1.3-1.7-.7z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FigmaMark({ size = 20, className }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none" className={className}>
      <g stroke="currentColor" strokeWidth="1.3">
        <path d="M9 2h3v5H9a2.5 2.5 0 0 1 0-5Z" />
        <path d="M12 2h3a2.5 2.5 0 0 1 0 5h-3V2Z" />
        <path d="M9 7h3v5H9a2.5 2.5 0 0 1 0-5Z" />
        <path d="M9 12h3v5H9a2.5 2.5 0 0 1 0-5Z" />
        <circle cx="14.5" cy="9.5" r="2.5" />
      </g>
    </svg>
  );
}

export function N8nMark({ size = 20, className }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none" className={className}>
      <g stroke="currentColor" strokeWidth="1.3">
        <circle cx="4" cy="12" r="2" />
        <circle cx="12" cy="6.5" r="2" />
        <circle cx="12" cy="17.5" r="2" />
        <circle cx="20" cy="12" r="2" />
        <path d="M5.8 11 10.2 7.4M5.8 13l4.4 3.6M13.8 7.6 18.4 11M13.8 16.4 18.4 13" />
      </g>
    </svg>
  );
}

export function NextMark({ size = 20, className }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none" className={className}>
      <circle cx="12" cy="12" r="9.6" stroke="currentColor" strokeWidth="1.3" />
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.7 16.1V8l7.4 9.7" />
        <path d="M15.5 8v5.3" />
      </g>
    </svg>
  );
}
