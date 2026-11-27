import type { ReactNode } from "react";
import type { MascotProps } from "@/shared/types";

const GRADIENTS = (
  <defs>
    <linearGradient id="mascot-body" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" className="[stop-color:color-mix(in_srgb,var(--accent)_45%,var(--paper))]" />
      <stop offset="1" className="[stop-color:var(--accent)]" />
    </linearGradient>
    <linearGradient id="mascot-warm" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" className="[stop-color:var(--gold)]" />
      <stop offset="1" className="[stop-color:color-mix(in_srgb,var(--gold)_55%,var(--night))]" />
    </linearGradient>
  </defs>
);

const FEET = (
  <>
    <rect x="37" y="107" width="18" height="8" rx="4" fill="url(#mascot-warm)" />
    <rect x="65" y="107" width="18" height="8" rx="4" fill="url(#mascot-warm)" />
  </>
);

const LEFT_HAND = <circle cx="24" cy="86" r="6" fill="url(#mascot-warm)" />;
const RIGHT_HAND = <circle cx="82" cy="94" r="6" fill="url(#mascot-warm)" />;

const BODY = (
  <>
    {GRADIENTS}
    <ellipse cx="60" cy="118" rx="28" ry="3" className="fill-night/10" />
    {FEET}
    <path data-part="body" d="M30 102V56a30 30 0 0 1 60 0v46q0 8-8 8H38q-8 0-8-8z" fill="url(#mascot-body)" />
    <ellipse cx="42" cy="54" rx="4" ry="18" className="fill-paper/15" />
    <path data-part="eye" d="M44 64q5-6 10 0" className="fill-none stroke-paper" strokeWidth="2.5" strokeLinecap="round" />
    <path data-part="eye" d="M66 64q5-6 10 0" className="fill-none stroke-paper" strokeWidth="2.5" strokeLinecap="round" />
  </>
);

const MAGNIFIER = (
  <>
    <circle cx="92" cy="88" r="14" className="fill-paper/30 stroke-gold" strokeWidth="5" />
    <path d="M102 99l12 12" className="stroke-gold" strokeWidth="6" strokeLinecap="round" />
  </>
);

const BRUSH = (
  <>
    <path d="M88 104l18-36" className="stroke-gold" strokeWidth="6" strokeLinecap="round" />
    <path d="M102 74q8-18 14-12t-6 16z" className="fill-paper stroke-gold" strokeWidth="3" strokeLinejoin="round" />
  </>
);

const SCREEN = (
  <>
    <rect x="76" y="80" width="38" height="28" rx="5" className="fill-paper stroke-gold" strokeWidth="4" />
    <path d="M83 90h24M83 98h14" className="stroke-night" strokeWidth="3" strokeLinecap="round" />
  </>
);

const BOX = (
  <>
    <rect x="76" y="82" width="38" height="30" rx="4" className="fill-gold" />
    <rect x="91" y="82" width="8" height="30" className="fill-night" />
    <path d="M95 82q-12-12-16-4t16 4q12-12 16-4t-16 4" className="fill-none stroke-night" strokeWidth="3" strokeLinecap="round" />
  </>
);

const ACCESSORIES: readonly ReactNode[] = [MAGNIFIER, BRUSH, SCREEN, BOX];

/** The studio mascot of a process step: a round character holding the tool of that step. */
export function Mascot({ index, className }: MascotProps) {
  return (
    <svg className={className} viewBox="0 0 120 124" aria-hidden="true">
      {BODY}
      {LEFT_HAND}
      {ACCESSORIES[index]}
      {RIGHT_HAND}
    </svg>
  );
}
