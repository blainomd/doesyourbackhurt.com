"use client";

/**
 * SpineMap — the signature feature of doesyourbackhurt.com.
 *
 * A clickable anatomical spine. Tapping a region is faster and more honest
 * than reading four text options, and the region a person points to is the
 * single most useful triage input: it narrows the likely pattern before any
 * other question is asked.
 *
 *   cervical   → neck, often muscular or disc
 *   thoracic   → mid-back, usually muscular/postural (disc rare here)
 *   lumbar     → lower back, the most common site
 *   sacral     → tailbone / SI joint
 *   radiating  → pain that travels down the leg → nerve involvement
 */

import { useState } from "react";

const TEAL = "#0D7377";
const NAVY = "#1B2A4A";

export type SpineRegion =
  | "cervical"
  | "thoracic"
  | "lumbar"
  | "sacral"
  | "radiating";

const REGION_INFO: Record<
  SpineRegion,
  { label: string; hint: string }
> = {
  cervical: {
    label: "Neck (cervical)",
    hint: "Base of the skull down to the shoulders.",
  },
  thoracic: {
    label: "Mid-back (thoracic)",
    hint: "Between the shoulder blades. Disc problems are rare here.",
  },
  lumbar: {
    label: "Lower back (lumbar)",
    hint: "The belt-line area — the most common site of back pain.",
  },
  sacral: {
    label: "Tailbone / SI joint (sacral)",
    hint: "The base of the spine and the joints to the pelvis.",
  },
  radiating: {
    label: "Radiating down the leg",
    hint: "Pain that travels into the buttock, thigh, or below the knee — a nerve signal.",
  },
};

export const SPINE_REGIONS: SpineRegion[] = [
  "cervical",
  "thoracic",
  "lumbar",
  "sacral",
  "radiating",
];

export function spineRegionLabel(r: SpineRegion): string {
  return REGION_INFO[r].label;
}

export default function SpineMap({
  selected,
  onSelect,
}: {
  selected: SpineRegion | null;
  onSelect: (r: SpineRegion) => void;
}) {
  const [hover, setHover] = useState<SpineRegion | null>(null);
  const active = hover ?? selected;

  const fillFor = (r: SpineRegion) =>
    selected === r ? TEAL : hover === r ? "#5fa8ab" : "#d3dddd";
  const textFor = (r: SpineRegion) =>
    selected === r || hover === r ? "#fff" : "#5a6b6b";

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
      {/* The figure */}
      <div className="flex-shrink-0">
        <svg
          viewBox="0 0 160 300"
          width="150"
          height="282"
          role="img"
          aria-label="Clickable diagram of the spine. Choose where it hurts."
          style={{ overflow: "visible" }}
        >
          {/* Body silhouette (back view) */}
          <path
            d="M80 8 C92 8 99 17 99 28 C99 37 94 43 90 46 C104 50 116 60 119 80
               L124 140 C125 150 117 152 114 143 L108 96 L107 150
               C112 200 110 240 108 280 C107 290 92 290 91 280 L84 200
               L80 196 L76 200 L69 280 C68 290 53 290 52 280
               C50 240 48 200 53 150 L52 96 L46 143 C43 152 35 150 36 140
               L41 80 C44 60 56 50 70 46 C66 43 61 37 61 28 C61 17 68 8 80 8 Z"
            fill="#eef3f3"
            stroke="#cdd9d9"
            strokeWidth="1.5"
          />

          {/* ── Clickable regions (stacked vertebral bands) ── */}
          {/* Cervical */}
          <g
            onClick={() => onSelect("cervical")}
            onMouseEnter={() => setHover("cervical")}
            onMouseLeave={() => setHover(null)}
            style={{ cursor: "pointer" }}
          >
            <rect x="71" y="44" width="18" height="20" rx="5" fill={fillFor("cervical")} />
            <text x="80" y="57" textAnchor="middle" fontSize="9" fontWeight="700" fill={textFor("cervical")}>C</text>
          </g>
          {/* Thoracic */}
          <g
            onClick={() => onSelect("thoracic")}
            onMouseEnter={() => setHover("thoracic")}
            onMouseLeave={() => setHover(null)}
            style={{ cursor: "pointer" }}
          >
            <rect x="69" y="68" width="22" height="56" rx="7" fill={fillFor("thoracic")} />
            <text x="80" y="100" textAnchor="middle" fontSize="9" fontWeight="700" fill={textFor("thoracic")}>T</text>
          </g>
          {/* Lumbar */}
          <g
            onClick={() => onSelect("lumbar")}
            onMouseEnter={() => setHover("lumbar")}
            onMouseLeave={() => setHover(null)}
            style={{ cursor: "pointer" }}
          >
            <rect x="68" y="128" width="24" height="40" rx="7" fill={fillFor("lumbar")} />
            <text x="80" y="152" textAnchor="middle" fontSize="9" fontWeight="700" fill={textFor("lumbar")}>L</text>
          </g>
          {/* Sacral */}
          <g
            onClick={() => onSelect("sacral")}
            onMouseEnter={() => setHover("sacral")}
            onMouseLeave={() => setHover(null)}
            style={{ cursor: "pointer" }}
          >
            <path d="M70 172 L90 172 L86 196 L74 196 Z" rx="4" fill={fillFor("sacral")} />
            <text x="80" y="187" textAnchor="middle" fontSize="8" fontWeight="700" fill={textFor("sacral")}>S</text>
          </g>
          {/* Radiating — down the right leg */}
          <g
            onClick={() => onSelect("radiating")}
            onMouseEnter={() => setHover("radiating")}
            onMouseLeave={() => setHover(null)}
            style={{ cursor: "pointer" }}
          >
            <path
              d="M88 200 C94 230 93 258 92 278"
              fill="none"
              stroke={selected === "radiating" ? TEAL : hover === "radiating" ? "#5fa8ab" : "#c2cece"}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={selected === "radiating" || hover === "radiating" ? "0" : "5 5"}
            />
            <circle
              cx="92"
              cy="278"
              r="5"
              fill={selected === "radiating" ? TEAL : hover === "radiating" ? "#5fa8ab" : "#c2cece"}
            />
          </g>
        </svg>
      </div>

      {/* Region list — accessible buttons mirroring the figure */}
      <div className="flex-1 w-full">
        <div className="space-y-2">
          {SPINE_REGIONS.map((r) => {
            const isSel = selected === r;
            return (
              <button
                key={r}
                onClick={() => onSelect(r)}
                onMouseEnter={() => setHover(r)}
                onMouseLeave={() => setHover(null)}
                className="w-full text-left px-4 py-3 rounded-xl border-2 transition-all cursor-pointer"
                style={{
                  borderColor: isSel ? TEAL : "#e5e7eb",
                  background: isSel ? "rgba(13,115,119,0.06)" : "#fff",
                }}
              >
                <span
                  className="block font-semibold text-sm"
                  style={{ color: isSel ? TEAL : NAVY }}
                >
                  {REGION_INFO[r].label}
                </span>
                <span className="block text-xs text-gray-500 mt-0.5 leading-snug">
                  {REGION_INFO[r].hint}
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-gray-400 mt-3 leading-relaxed">
          {active
            ? `Selected: ${REGION_INFO[active].label}.`
            : "Tap the diagram or pick a region. Pick the spot where the pain is strongest."}
        </p>
      </div>
    </div>
  );
}
