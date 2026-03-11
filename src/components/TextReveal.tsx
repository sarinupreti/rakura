"use client";

import { useEffect, useRef, useState } from "react";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
  delay?: number;      // initial delay in ms before any word animates
  stagger?: number;    // ms between each word
  once?: boolean;      // animate once (default true)
}

/**
 * Splits text into words and reveals each one with a clip-path slide-up animation.
 * Great for section headings and hero text.
 */
export function TextReveal({
  children,
  as: Tag = "span",
  className = "",
  style,
  delay = 0,
  stagger = 60,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  const words = children.split(" ");

  return (
    <Tag
      // @ts-expect-error — ref works on all intrinsic elements at runtime
      ref={ref}
      className={className}
      style={style}
      aria-label={children}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ verticalAlign: "bottom" }}
        >
          <span
            className="inline-block"
            style={{
              transform: visible ? "translateY(0)" : "translateY(110%)",
              opacity: visible ? 1 : 0,
              transition: `transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay + i * stagger}ms, opacity 0.4s ease ${delay + i * stagger}ms`,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
