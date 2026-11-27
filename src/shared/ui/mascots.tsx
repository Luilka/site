import type { ReactNode } from "react";
import type { MascotProps } from "@/shared/types";

const BODY_FILLS: readonly string[] = ["url(#mascot-body-0)", "url(#mascot-body-1)", "url(#mascot-body-2)", "url(#mascot-body-3)"];
const TRIMS: readonly string[] = ["text-accent", "text-night", "text-night", "text-accent"];

const GRADIENTS = (
  <defs>
    <linearGradient id="mascot-body-0" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" className="[stop-color:color-mix(in_srgb,var(--gold)_22%,var(--paper))]" />
      <stop offset="1" className="[stop-color:color-mix(in_srgb,var(--gold)_50%,var(--paper))]" />
    </linearGradient>
    <linearGradient id="mascot-body-1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" className="[stop-color:var(--paper)]" />
      <stop offset="1" className="[stop-color:color-mix(in_srgb,var(--gray)_80%,var(--night))]" />
    </linearGradient>
    <linearGradient id="mascot-body-2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" className="[stop-color:color-mix(in_srgb,var(--accent)_18%,var(--paper))]" />
      <stop offset="1" className="[stop-color:color-mix(in_srgb,var(--accent)_42%,var(--paper))]" />
    </linearGradient>
    <linearGradient id="mascot-body-3" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" className="[stop-color:color-mix(in_srgb,var(--gold)_40%,var(--gray))]" />
      <stop offset="1" className="[stop-color:color-mix(in_srgb,var(--gold)_70%,var(--gray))]" />
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

const BOW_TIE = (
  <g data-outfit="bow-tie">
    <path d="M60 74l-11-6v12zM60 74l11-6v12z" fill="url(#mascot-warm)" className="stroke-current" strokeWidth="1" strokeLinejoin="round" />
    <circle cx="60" cy="74" r="3" className="fill-night" />
  </g>
);

const BERET = (
  <g data-outfit="beret">
    <ellipse cx="62" cy="17" rx="19" ry="8" transform="rotate(-8 62 17)" className="fill-current stroke-gold" strokeWidth="1.2" />
    <circle cx="64" cy="9" r="2.4" fill="url(#mascot-warm)" />
  </g>
);

const GLASSES = (
  <g data-outfit="glasses" className="fill-none stroke-gold" strokeWidth="2.2">
    <circle cx="45" cy="52" r="15.5" />
    <circle cx="75" cy="52" r="15.5" />
    <path d="M58 50q2-2 4 0" strokeLinecap="round" />
  </g>
);

const CROWN = (
  <path data-outfit="crown" d="M46 22l2-14 8 7 4-11 4 11 8-7 2 14z" fill="url(#mascot-warm)" className="stroke-current" strokeWidth="1" strokeLinejoin="round" />
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

const WAISTCOAT = (
  <g data-costume="waistcoat">
    <path d="M32 70L54 64L58 106Q42 106 34 96Z" className="fill-accent stroke-gold" strokeWidth="1.2" />
    <path d="M88 70L66 64L62 106Q78 106 86 96Z" className="fill-accent stroke-gold" strokeWidth="1.2" />
    <circle cx="48" cy="86" r="2" fill="url(#mascot-warm)" />
    <circle cx="48" cy="96" r="2" fill="url(#mascot-warm)" />
  </g>
);

const SMOCK = (
  <g data-costume="smock">
    <path d="M38 72H82L90 108Q60 114 30 108Z" fill="url(#mascot-warm)" />
    <path d="M46 92h28v10H46z" className="fill-night/25" />
    <path d="M44 72l-4-10M76 72l4-10" className="fill-none stroke-gold" strokeWidth="2" strokeLinecap="round" />
  </g>
);

const TUXEDO = (
  <g data-costume="tuxedo">
    <path d="M30 68L56 64L50 108Q38 104 30 94Z" className="fill-night" />
    <path d="M90 68L64 64L70 108Q82 104 90 94Z" className="fill-night" />
    <path d="M56 64L60 76L64 64z" className="fill-paper" />
    <circle cx="60" cy="88" r="2" fill="url(#mascot-warm)" />
  </g>
);

const CAPE = (
  <g data-costume="cape">
    <path d="M30 62Q20 90 26 110L50 106L52 64Z" className="fill-accent stroke-gold" strokeWidth="1.2" />
    <path d="M90 62Q100 90 94 110L70 106L68 64Z" className="fill-accent stroke-gold" strokeWidth="1.2" />
    <circle cx="60" cy="66" r="3.5" fill="url(#mascot-warm)" />
  </g>
);

const COSTUMES: readonly ReactNode[] = [WAISTCOAT, SMOCK, TUXEDO, CAPE];

const OUTFITS: readonly ReactNode[] = [BOW_TIE, BERET, GLASSES, CROWN];

const HELD: readonly ReactNode[] = [MAGNIFIER, BRUSH, SCREEN, BOX].map((tool, index) => (
  <>
    {COSTUMES[index]}
    {tool}
    {RIGHT_HAND}
    {OUTFITS[index]}
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
