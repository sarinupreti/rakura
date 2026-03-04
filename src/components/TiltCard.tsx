"use client";

import { useRef, useCallback } from "react";

/**
 * Thin client wrapper that adds a subtle 3D perspective tilt on mouse-move.
 * - Instant response on move (no transition lag)
 * - Smooth spring-back (0.5s ease) on mouse leave
 * - Disabled on touch devices (no-op for mobile)
 * - Passes className/children through transparently
 */
export function TiltCard({
  children,
  className = "",
  intensity = 6,
}: {
  children: React.ReactNode;
  className?: string;
  /** Max tilt degrees — default 6 feels luxurious, not aggressive */
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = ref.current;
      if (!card) return;
      // Remove transition during move so it tracks the cursor instantly
      card.style.transition = "none";

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      // Normalise to -1 → 1, then multiply by intensity degrees
      const rotateX = ((y - cy) / cy) * -intensity;
      const rotateY = ((x - cx) / cx) * intensity;

      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.025)`;
    },
    [intensity]
  );

  const handleMouseLeave = useCallback(() => {
    const card = ref.current;
    if (!card) return;
    // Spring back to flat
    card.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
    card.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)";
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ willChange: "transform", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
