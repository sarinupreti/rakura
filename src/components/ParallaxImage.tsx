"use client";

import { useEffect, useRef } from "react";

/**
 * Wraps the hero background image container and applies a scroll-linked
 * translateY so the image moves at ~25% of the scroll speed — creating
 * a depth/parallax effect. Scale(1.12) pre-sizes the container so edges
 * never show during the parallax movement.
 *
 * Usage (server component parent):
 *   <ParallaxImage>
 *     <Image src="..." fill className="object-cover" ... />
 *   </ParallaxImage>
 */
export function ParallaxImage({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // rAF-throttled scroll handler for buttery-smooth 60fps parallax
    let ticking = false;

    const update = () => {
      if (el) {
        el.style.transform = `scale(1.12) translateY(${-window.scrollY * 0.22}px)`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    // Set initial state
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0"
      style={{ willChange: "transform", transformOrigin: "center center" }}
    >
      {children}
    </div>
  );
}
