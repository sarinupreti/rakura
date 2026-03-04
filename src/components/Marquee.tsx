import type { Locale } from "@/lib/i18n";

const itemsEn = [
  "Premium Himalayan Tea",
  "Sustainably Sourced",
  "70+ Years Heritage",
  "Exported Worldwide",
  "Single Origin",
  "Plastic-Free Teabags",
  "Nepal's Finest",
  "100% Natural",
];

const itemsTh = [
  "ชาหิมาลัยพรีเมียม",
  "ยั่งยืนตั้งแต่ต้นทาง",
  "มรดกกว่า 70 ปี",
  "ส่งออกทั่วโลก",
  "แหล่งผลิตเดียว",
  "ซองชาปลอดพลาสติก",
  "สุดยอดจากเนปาล",
  "100% ธรรมชาติ",
];

export function Marquee({ locale, variant = "gold" }: { locale: Locale; variant?: "gold" | "dark" }) {
  const items = locale === "th" ? itemsTh : itemsEn;
  const doubled = [...items, ...items];

  const bgClass = variant === "gold" ? "bg-rakura-gold" : "bg-rakura-dark border-y border-white/10";
  const textClass = variant === "gold" ? "text-rakura-dark" : "text-rakura-gold";
  const dotClass = variant === "gold" ? "text-rakura-dark/40" : "text-rakura-gold/40";

  return (
    <div className={`${bgClass} overflow-hidden py-3 relative`}>
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-current to-transparent opacity-0" />
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className={`inline-flex items-center gap-5 mx-5 ${textClass} font-semibold text-xs tracking-[0.2em] uppercase`}>
            {item}
            <span className={dotClass}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
