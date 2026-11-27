import type { ReactNode } from "react";
import type { MascotProps } from "@/shared/types";

const BODY = (
  <>
    <ellipse cx="60" cy="116" rx="30" ry="4" className="fill-night/10" />
    <circle cx="60" cy="62" r="40" className="fill-accent" />
    <circle cx="46" cy="56" r="7" className="fill-paper" />
    <circle cx="74" cy="56" r="7" className="fill-paper" />
    <circle cx="47" cy="57" r="3" className="fill-night" />
    <circle cx="75" cy="57" r="3" className="fill-night" />
    <path d="M48 74q12 11 24 0" className="fill-none stroke-paper" strokeWidth="3" strokeLinecap="round" />
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
      {ACCESSORIES[index]}
    </svg>
  );
}
