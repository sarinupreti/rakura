"use client";

import { useEffect, useRef } from "react";

interface Leaf {
  id: number;
  x: number;         // starting x position (%)
  delay: number;     // animation delay (s)
  duration: number;  // fall duration (s)
  size: number;      // diameter (px)
  opacity: number;
  drift: number;     // horizontal drift amount (px)
  rotateEnd: number; // end rotation (deg)
}

const LEAF_PATH =
  "M10 2 C10 2 18 6 20 14 C22 22 14 26 10 28 C6 26 -2 22 0 14 C2 6 10 2 10 2 Z";

// Generate stable leaves array (no Math.random during render)
const LEAVES: Leaf[] = [
  { id: 0,  x: 8,  delay: 0,    duration: 12, size: 14, opacity: 0.18, drift:  40, rotateEnd: 270 },
  { id: 1,  x: 22, delay: 2,    duration: 14, size: 10, opacity: 0.12, drift: -30, rotateEnd: 200 },
  { id: 2,  x: 38, delay: 4.5,  duration: 11, size: 16, opacity: 0.15, drift:  55, rotateEnd: 320 },
  { id: 3,  x: 55, delay: 1.2,  duration: 13, size: 11, opacity: 0.10, drift: -45, rotateEnd: 180 },
  { id: 4,  x: 70, delay: 3.5,  duration: 15, size: 13, opacity: 0.14, drift:  35, rotateEnd: 240 },
  { id: 5,  x: 83, delay: 6,    duration: 10, size: 9,  opacity: 0.10, drift: -60, rotateEnd: 290 },
  { id: 6,  x: 15, delay: 7.5,  duration: 14, size: 12, opacity: 0.13, drift:  50, rotateEnd: 210 },
  { id: 7,  x: 47, delay: 9,    duration: 12, size: 15, opacity: 0.16, drift: -40, rotateEnd: 300 },
  { id: 8,  x: 64, delay: 0.8,  duration: 16, size: 10, opacity: 0.10, drift:  30, rotateEnd: 150 },
  { id: 9,  x: 91, delay: 5,    duration: 11, size: 14, opacity: 0.12, drift: -35, rotateEnd: 260 },
  { id: 10, x: 30, delay: 11,   duration: 13, size: 11, opacity: 0.11, drift:  60, rotateEnd: 330 },
  { id: 11, x: 77, delay: 8.2,  duration: 15, size: 13, opacity: 0.14, drift: -25, rotateEnd: 190 },
];

export function FloatingLeaves() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 2 }}
    >
      {LEAVES.map((leaf) => (
        <div
          key={leaf.id}
          style={{
            position: "absolute",
            top: "-5%",
            left: `${leaf.x}%`,
            width: leaf.size,
            height: leaf.size,
            opacity: leaf.opacity,
            animation: `leafFall${leaf.id} ${leaf.duration}s ${leaf.delay}s ease-in infinite`,
          }}
        >
          <svg
            viewBox="0 0 20 30"
            fill="currentColor"
            className="text-rakura-gold w-full h-full"
            style={{ transform: "rotate(45deg)" }}
          >
            <path d={LEAF_PATH} />
            <line
              x1="10" y1="2" x2="10" y2="28"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.4"
            />
          </svg>
        </div>
      ))}

      {/* Inline keyframes for each leaf's unique drift path */}
      <style>{LEAVES.map((leaf) => `
        @keyframes leafFall${leaf.id} {
          0%   { transform: translateY(0)     translateX(0)           rotate(0deg);   opacity: 0; }
          5%   { opacity: ${leaf.opacity}; }
          50%  { transform: translateY(50vh)  translateX(${leaf.drift * 0.5}px)  rotate(${leaf.rotateEnd * 0.5}deg); }
          90%  { opacity: ${leaf.opacity * 0.6}; }
          100% { transform: translateY(110vh) translateX(${leaf.drift}px)         rotate(${leaf.rotateEnd}deg); opacity: 0; }
        }
      `).join("")}</style>
    </div>
  );
}
