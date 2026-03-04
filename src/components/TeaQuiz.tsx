"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { getProductById } from "@/data/products";
import type { TeaType } from "@/data/teaData";

type Score = Partial<Record<TeaType, number>>;

interface Option {
  labelEn: string;
  labelTh: string;
  emoji: string;
  scores: Score;
}

interface Question {
  id: string;
  questionEn: string;
  questionTh: string;
  options: Option[];
}

const questions: Question[] = [
  {
    id: "mood",
    questionEn: "How are you feeling right now?",
    questionTh: "ตอนนี้คุณรู้สึกอย่างไร?",
    options: [
      { labelEn: "I need energy & focus", labelTh: "ต้องการพลังงานและสมาธิ", emoji: "⚡",
        scores: { black: 3, breakfast: 3, green: 1 } },
      { labelEn: "I want to relax & unwind", labelTh: "อยากผ่อนคลาย", emoji: "🌙",
        scores: { herbal: 3, herbs: 2, fruit: 1 } },
      { labelEn: "I'm feeling adventurous", labelTh: "รู้สึกอยากลองอะไรใหม่", emoji: "✨",
        scores: { fruit: 3, green: 1, herbs: 1 } },
      { labelEn: "I need some comfort & warmth", labelTh: "อยากได้ความอบอุ่น", emoji: "🫖",
        scores: { masala: 3, herbs: 2, herbal: 1 } },
    ],
  },
  {
    id: "time",
    questionEn: "When will you drink it?",
    questionTh: "จะดื่มชาเมื่อไหร่?",
    options: [
      { labelEn: "Morning — to start the day", labelTh: "ตอนเช้า — เริ่มต้นวัน", emoji: "🌅",
        scores: { black: 2, breakfast: 3, masala: 1 } },
      { labelEn: "Afternoon — as a break", labelTh: "ตอนบ่าย — พักผ่อน", emoji: "☀️",
        scores: { green: 3, fruit: 2 } },
      { labelEn: "Evening — to wind down", labelTh: "ตอนเย็น — ผ่อนคลาย", emoji: "🌙",
        scores: { herbal: 3, fruit: 1, herbs: 1 } },
      { labelEn: "Any time — I just love tea", labelTh: "ตลอดวัน — แค่ชอบชา", emoji: "🍵",
        scores: { green: 2, fruit: 2, herbs: 1 } },
    ],
  },
  {
    id: "caffeine",
    questionEn: "How do you feel about caffeine?",
    questionTh: "คุณรู้สึกอย่างไรกับคาเฟอีน?",
    options: [
      { labelEn: "Yes please — I need it", labelTh: "ต้องการ — จำเป็นมาก", emoji: "☕",
        scores: { black: 3, breakfast: 3 } },
      { labelEn: "A little is fine", labelTh: "นิดหน่อยก็ได้", emoji: "🌿",
        scores: { green: 3, masala: 2 } },
      { labelEn: "I prefer caffeine-free", labelTh: "ชอบแบบไม่มีคาเฟอีน", emoji: "🌸",
        scores: { herbal: 3, fruit: 2, herbs: 1 } },
    ],
  },
  {
    id: "goal",
    questionEn: "What's your wellness goal?",
    questionTh: "เป้าหมายด้านสุขภาพของคุณคืออะไร?",
    options: [
      { labelEn: "Energy & Mental Focus", labelTh: "พลังงานและสมาธิ", emoji: "🧠",
        scores: { black: 3, breakfast: 3, masala: 1 } },
      { labelEn: "Antioxidants & Immunity", labelTh: "สารต้านอนุมูลอิสระและภูมิคุ้มกัน", emoji: "🛡️",
        scores: { green: 3, fruit: 3 } },
      { labelEn: "Calm & Better Sleep", labelTh: "ความสงบและการนอนหลับ", emoji: "😌",
        scores: { herbal: 3, herbs: 2 } },
      { labelEn: "Digestion & Comfort", labelTh: "ระบบย่อยและความสบายท้อง", emoji: "🌱",
        scores: { masala: 3, herbs: 3, herbal: 1 } },
    ],
  },
];

// Map tea type → product ID to recommend
const teaTypeToProduct: Record<string, string> = {
  black: "himalayan-noir",
  breakfast: "classic-breakfast-100",
  green: "himalayan-emerald",
  herbal: "himalayan-blossoms",
  fruit: "himalayan-rouge",
  herbs: "himalayan-blossoms",
  masala: "himalayan-noir", // fallback if masala not found
  oolong: "organic-high-mountain-black",
};

function pickBestProduct(scores: Score): string {
  const sorted = Object.entries(scores).sort(([, a], [, b]) => (b ?? 0) - (a ?? 0));
  for (const [type] of sorted) {
    const id = teaTypeToProduct[type];
    if (id && getProductById(id)) return id;
  }
  return "himalayan-noir";
}

export function TeaQuiz({ locale }: { locale: Locale }) {
  const isEn = locale === "en";
  const [step, setStep] = useState(0); // 0 = intro, 1-4 = questions, 5 = result
  const [scores, setScores] = useState<Score>({});
  const [answeredIndices, setAnsweredIndices] = useState<number[]>([]);

  const totalSteps = questions.length;
  const current = questions[step - 1];
  const resultProductId = step > totalSteps ? pickBestProduct(scores) : null;
  const resultProduct = resultProductId ? getProductById(resultProductId) : null;

  function choose(option: Option, optionIdx: number) {
    const newScores = { ...scores };
    for (const [type, pts] of Object.entries(option.scores)) {
      newScores[type as TeaType] = (newScores[type as TeaType] ?? 0) + (pts ?? 0);
    }
    setScores(newScores);
    setAnsweredIndices((prev) => [...prev, optionIdx]);
    setTimeout(() => setStep((s) => s + 1), 300);
  }

  function restart() {
    setStep(0);
    setScores({});
    setAnsweredIndices([]);
  }

  // Intro
  if (step === 0) {
    return (
      <div className="text-center max-w-lg mx-auto">
        <div className="text-5xl mb-6">🍵</div>
        <h2 className="font-display font-bold text-foreground text-2xl sm:text-3xl mb-4">
          {isEn ? "Find Your Perfect Tea" : "ค้นหาชาที่ใช่สำหรับคุณ"}
        </h2>
        <p className="text-rakura-muted mb-8 leading-relaxed">
          {isEn
            ? "Answer 4 quick questions and we'll recommend the perfect Rakura tea for you."
            : "ตอบ 4 คำถามสั้นๆ เราจะแนะนำชา Rakura ที่เหมาะกับคุณที่สุด"}
        </p>
        <button
          onClick={() => setStep(1)}
          className="bg-rakura-gold text-rakura-dark font-semibold text-sm tracking-wider uppercase px-10 py-4 hover:bg-rakura-gold-light transition-colors duration-200"
        >
          {isEn ? "Start Quiz →" : "เริ่มเลย →"}
        </button>
      </div>
    );
  }

  // Result
  if (step > totalSteps && resultProduct) {
    const name = isEn ? resultProduct.nameEn : resultProduct.nameTh;
    const desc = isEn ? resultProduct.shortDescriptionEn : resultProduct.shortDescriptionTh;
    const hasImage = resultProduct.image && !resultProduct.image.includes("placeholder");
    return (
      <div className="text-center max-w-md mx-auto animate-fade-in-up">
        <p className="eyebrow mb-3">{isEn ? "Your Perfect Match" : "ชาที่ใช่สำหรับคุณ"}</p>
        <h2 className="font-display font-bold text-foreground text-2xl sm:text-3xl mb-6">{name}</h2>
        {hasImage && (
          <div className="relative w-40 h-52 mx-auto mb-6 bg-stone-50 rounded-sm overflow-hidden">
            <Image src={resultProduct.image!} alt={name} fill className="object-contain p-4" />
          </div>
        )}
        <p className="text-rakura-muted mb-8 leading-relaxed">{desc}</p>
        {resultProduct.tastingNoteEn && (
          <p className="italic text-sm text-foreground/70 mb-8 border-l-2 border-rakura-gold pl-4 text-left">
            {isEn ? resultProduct.tastingNoteEn : resultProduct.tastingNoteTh}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/${locale}/products/${resultProduct.id}`}
            className="bg-rakura-gold text-rakura-dark font-semibold text-xs tracking-wider uppercase px-8 py-3.5 hover:bg-rakura-gold-light transition-colors"
          >
            {isEn ? "View This Tea" : "ดูรายละเอียด"}
          </Link>
          <Link
            href={`/${locale}?product=${resultProduct.id}#contact`}
            className="border border-rakura-gold text-rakura-gold font-semibold text-xs tracking-wider uppercase px-8 py-3.5 hover:bg-rakura-gold hover:text-white transition-colors"
          >
            {isEn ? "Enquire" : "สอบถาม"}
          </Link>
        </div>
        <button onClick={restart} className="mt-6 text-xs text-rakura-muted hover:text-foreground underline underline-offset-2 transition-colors">
          {isEn ? "Retake quiz" : "ทำใหม่อีกครั้ง"}
        </button>
      </div>
    );
  }

  // Question
  return (
    <div className="max-w-xl mx-auto animate-fade-in-up">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-8">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              i < step
                ? answeredIndices[i] !== undefined
                  ? "bg-rakura-gold"
                  : "bg-rakura-gold/60"
                : "bg-stone-200"
            }`}
          />
        ))}
      </div>
      <p className="text-xs tracking-widest uppercase text-rakura-muted mb-4">
        {isEn ? `Question ${step} of ${totalSteps}` : `คำถาม ${step} จาก ${totalSteps}`}
      </p>
      <h2 className="font-display font-bold text-foreground text-xl sm:text-2xl mb-8">
        {isEn ? current.questionEn : current.questionTh}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => choose(opt, i)}
            className="group text-left p-5 border border-stone-200 bg-white hover:border-rakura-gold hover:bg-stone-50 transition-all duration-200 rounded-sm flex items-start gap-3"
          >
            <span className="text-2xl shrink-0">{opt.emoji}</span>
            <span className="text-sm font-medium text-foreground group-hover:text-rakura-gold transition-colors leading-snug">
              {isEn ? opt.labelEn : opt.labelTh}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
