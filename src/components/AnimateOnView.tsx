"use client";

import { useEffect, useRef, useState } from "react";

export type Animation =
  | "fade-in"
  | "fade-in-up"
  | "fade-in-down"
  | "scale-in"
  | "slide-in-left"
  | "slide-in-right"
  | "clip-reveal"
  | "zoom-in";

export function AnimateOnView({
  children,
  animation = "fade-in-up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  animation?: Animation;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const animationClasses: Record<Animation, string> = {
    "fade-in": "animate-fade-in",
    "fade-in-up": "animate-fade-in-up",
    "fade-in-down": "animate-fade-in-down",
    "scale-in": "animate-scale-in",
    "slide-in-left": "animate-slide-in-left",
    "slide-in-right": "animate-slide-in-right",
    "clip-reveal": "animate-clip-reveal",
    "zoom-in": "animate-zoom-in",
  };

  const opacity = visible ? "opacity-100" : "opacity-0";
  const animateClass = visible ? animationClasses[animation] : "";
  const style = delay > 0 && visible ? { animationDelay: `${delay}ms` } : undefined;

  return (
    <div
      ref={ref}
      className={`${opacity} ${animateClass} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}
