import type { ReactNode } from "react";
import type { MascotProps } from "@/shared/types";

const BODY_FILLS: readonly string[] = ["url(#mascot-body-0)", "url(#mascot-body-1)", "url(#mascot-body-2)", "url(#mascot-body-3)"];
const TRIMS: readonly string[] = ["text-gold", "text-night", "text-night", "text-gold"];

const GRADIENTS = (
  <defs>
    <linearGradient id="mascot-body-0" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" className="[stop-color:color-mix(in_srgb,var(--accent)_70%,var(--night))]" />
      <stop offset="1" className="[stop-color:var(--night)]" />
    </linearGradient>
    <linearGradient id="mascot-body-1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" className="[stop-color:color-mix(in_srgb,var(--gold)_70%,var(--paper))]" />
      <stop offset="1" className="[stop-color:color-mix(in_srgb,var(--gold)_75%,var(--night))]" />
    </linearGradient>
    <linearGradient id="mascot-body-2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" className="[stop-color:var(--paper)]" />
      <stop offset="1" className="[stop-color:color-mix(in_srgb,var(--gray)_65%,var(--night))]" />
    </linearGradient>
    <linearGradient id="mascot-body-3" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" className="[stop-color:color-mix(in_srgb,var(--accent)_65%,var(--paper))]" />
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
    <ellipse cx="46" cy="114" rx="11" ry="5" fill="url(#mascot-warm)" />
    <ellipse cx="74" cy="114" rx="11" ry="5" fill="url(#mascot-warm)" />
  </>
);

const LEFT_HAND = (
  <>
    <ellipse cx="19" cy="76" rx="8" ry="18" transform="rotate(12 19 76)" className="fill-current" />
    <circle cx="16" cy="91" r="5" fill="url(#mascot-warm)" />
  </>
);

const RIGHT_HAND = (
  <>
    <ellipse cx="100" cy="82" rx="8" ry="16" transform="rotate(-18 100 82)" className="fill-current" />
    <circle cx="86" cy="94" r="5" fill="url(#mascot-warm)" />
  </>
);

const EARS = (
  <>
    <path data-part="ear" d="M30 30L24 6l22 12z" className="fill-current" strokeLinejoin="round" />
    <path data-part="ear" d="M90 30l6-24-22 12z" className="fill-current" strokeLinejoin="round" />
  </>
);

const BELLY = (
  <>
    <ellipse data-part="belly" cx="60" cy="86" rx="24" ry="24" className="fill-paper" />
    <path data-part="crest" d="M60 76l5 6-5 6-5-6z" className="fill-current" />
    <path d="M48 94q4 4 8 0M64 94q4 4 8 0" className="fill-none stroke-gray" strokeWidth="2.5" strokeLinecap="round" />
  </>
);

const EYES = (
  <>
    <circle data-part="eye" cx="45" cy="52" r="14" className="fill-paper stroke-current" strokeWidth="2.5" />
    <circle data-part="eye" cx="75" cy="52" r="14" className="fill-paper stroke-current" strokeWidth="2.5" />
    <circle cx="47" cy="54" r="7" className="fill-night" />
    <circle cx="77" cy="54" r="7" className="fill-night" />
    <circle data-part="glint" cx="50" cy="51" r="2.6" className="fill-paper" />
    <circle data-part="glint" cx="80" cy="51" r="2.6" className="fill-paper" />
  </>
);

const FACE = (
  <>
    {EYES}
    <path data-part="beak" d="M54 63q6 11 12 0q-6-3-12 0z" fill="url(#mascot-warm)" className="stroke-current" strokeWidth="1" />
  </>
);

const BACK = (
  <>
    {GRADIENTS}
    <ellipse cx="60" cy="119" rx="28" ry="3" className="fill-night/10" />
    {FEET}
    {EARS}
  </>
);

const FRONT = (
  <>
    {BELLY}
    {FACE}
    {LEFT_HAND}
  </>
);

const BODY_PATH = "M60 14C34 14 22 36 22 64c0 30 14 46 38 46s38-16 38-46C98 36 86 14 60 14z";

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

const HELD: readonly ReactNode[] = [MAGNIFIER, BRUSH, SCREEN, BOX].map((tool) => (
  <>
    {tool}
    {RIGHT_HAND}
  </>
));

/** The studio mascot of a process step: an owl in the colour of its card, holding the tool of that step. */
export function Mascot({ index, className = "" }: MascotProps) {
  return (
    <svg className={`${className} ${TRIMS[index]}`} viewBox="0 0 120 124" aria-hidden="true">
      {BACK}
      <path data-part="body" d={BODY_PATH} fill={BODY_FILLS[index]} className="stroke-current" strokeWidth="1.2" />
      {FRONT}
      {HELD[index]}
    </svg>
  );
}
