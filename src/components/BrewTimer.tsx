"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface BrewTimerProps {
  steepSeconds: number;
  locale: string;
}

export function BrewTimer({ steepSeconds, locale }: BrewTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(steepSeconds);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isEn = locale === "en";

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
    setDone(false);
    setSecondsLeft(steepSeconds);
  }, [steepSeconds]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            setDone(true);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const progress = 1 - secondsLeft / steepSeconds;
  const circumference = 2 * Math.PI * 36;
  const strokeDash = circumference * (1 - progress);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div className="bg-stone-50 rounded-sm p-5">
      <p className="text-xs font-semibold tracking-widest uppercase text-rakura-gold mb-4">
        {isEn ? "Brew Timer" : "นาฬิกาจับเวลาชง"}
      </p>
      <div className="flex items-center gap-6">
        {/* SVG ring timer */}
        <div className="relative shrink-0">
          <svg width="88" height="88" viewBox="0 0 88 88">
            <circle cx="44" cy="44" r="36" fill="none" stroke="#e7e5e4" strokeWidth="4" />
            <circle
              cx="44"
              cy="44"
              r="36"
              fill="none"
              stroke={done ? "#22c55e" : "var(--rakura-gold)"}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDash}
              transform="rotate(-90 44 44)"
              style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            {done ? (
              <span className="text-green-500 text-xl">✓</span>
            ) : (
              <span className="font-display font-bold text-foreground text-lg tabular-nums">
                {mins}:{String(secs).padStart(2, "0")}
              </span>
            )}
          </div>
        </div>

        {/* Controls + status */}
        <div className="flex flex-col gap-3 flex-1">
          {done ? (
            <p className="text-sm font-semibold text-green-600">
              {isEn ? "Your tea is ready! ☕" : "ชาของคุณพร้อมแล้ว! ☕"}
            </p>
          ) : (
            <p className="text-sm text-rakura-muted">
              {running
                ? (isEn ? "Steeping…" : "กำลังชง…")
                : (isEn ? "Press start when you add the bag." : "กดเริ่มเมื่อใส่ซองชา")}
            </p>
          )}
          <div className="flex gap-2">
            {!running && !done && (
              <button
                onClick={() => setRunning(true)}
                className="text-xs font-semibold tracking-wider uppercase bg-rakura-gold text-rakura-dark px-5 py-2 hover:bg-rakura-gold-light transition-colors"
              >
                {isEn ? "Start" : "เริ่ม"}
              </button>
            )}
            {running && (
              <button
                onClick={() => { if (intervalRef.current) clearInterval(intervalRef.current); setRunning(false); }}
                className="text-xs font-semibold tracking-wider uppercase border border-rakura-gold text-rakura-gold px-5 py-2 hover:bg-rakura-gold/10 transition-colors"
              >
                {isEn ? "Pause" : "หยุด"}
              </button>
            )}
            <button
              onClick={reset}
              className="text-xs font-semibold tracking-wider uppercase border border-stone-300 text-stone-500 px-5 py-2 hover:border-stone-400 transition-colors"
            >
              {isEn ? "Reset" : "รีเซ็ต"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
