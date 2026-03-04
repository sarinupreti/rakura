import type { Locale } from "@/lib/i18n";
import { TeaQuiz } from "@/components/TeaQuiz";
import Link from "next/link";

export default function QuizPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const isEn = locale === "en";

  return (
    <div className="min-h-screen bg-background">
      {/* ── HERO ── */}
      <section className="bg-rakura-dark py-20 sm:py-28 px-4 text-center relative overflow-hidden">
        {/* subtle tea-leaf pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none text-[8rem] leading-none flex flex-wrap gap-8 items-center justify-center overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => <span key={i}>🍵</span>)}
        </div>
        <div className="relative z-10">
          <p className="eyebrow text-rakura-gold mb-4">
            {isEn ? "Personalised Recommendation" : "คำแนะนำเฉพาะบุคคล"}
          </p>
          <h1
            className="font-display font-bold text-white leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {isEn ? "Find Your Perfect Tea" : "ค้นหาชาที่ใช่สำหรับคุณ"}
          </h1>
          <p className="text-white/70 max-w-md mx-auto text-base leading-relaxed">
            {isEn
              ? "Answer 4 quick questions and we'll match you with your ideal Rakura Himalayan tea."
              : "ตอบ 4 คำถามสั้นๆ แล้วเราจะแนะนำชา Rakura ที่เหมาะกับคุณมากที่สุด"}
          </p>
        </div>
      </section>

      {/* ── QUIZ ── */}
      <section className="py-16 sm:py-24 px-4">
        <TeaQuiz locale={locale} />
      </section>

      {/* ── BROWSE ALL ── */}
      <section className="py-12 px-4 bg-stone-50 border-t border-stone-200 text-center">
        <p className="text-rakura-muted text-sm mb-4">
          {isEn ? "Prefer to browse all teas?" : "อยากดูชาทั้งหมด?"}
        </p>
        <Link
          href={`/${locale}#products`}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase border border-rakura-gold/40 text-rakura-gold hover:bg-rakura-gold hover:text-white px-8 py-3 transition-all duration-200"
        >
          {isEn ? "View All Products" : "ดูผลิตภัณฑ์ทั้งหมด"}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </section>
    </div>
  );
}
