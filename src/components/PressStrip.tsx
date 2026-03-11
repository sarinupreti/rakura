import { AnimateOnView } from "@/components/AnimateOnView";
import type { Locale } from "@/lib/i18n";

const pressItems = [
  { nameEn: "Nepal Finest Award", nameTh: "Nepal Finest Award", icon: "🏆", descEn: "Food Safety & Quality", descTh: "ความปลอดภัยอาหาร" },
  { nameEn: "FSC Certified", nameTh: "FSC Certified", icon: "🌿", descEn: "Sustainable Packaging", descTh: "บรรจุภัณฑ์ยั่งยืน" },
  { nameEn: "30+ Countries", nameTh: "กว่า 30 ประเทศ", icon: "🌍", descEn: "Global Distribution", descTh: "จำหน่ายทั่วโลก" },
  { nameEn: "1NG Innovation", nameTh: "นวัตกรรม 1NG", icon: "✦", descEn: "World-First Teabag Tech", descTh: "เทคโนโลยีซองชาแห่งแรกในโลก" },
  { nameEn: "Est. 1973", nameTh: "ก่อตั้ง 2516", icon: "📜", descEn: "50+ Years Heritage", descTh: "มรดกกว่า 50 ปี" },
];

export function PressStrip({ locale }: { locale: Locale }) {
  const isEn = locale === "en";

  return (
    <section className="bg-background border-b border-stone-200 py-10 sm:py-12 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <AnimateOnView animation="fade-in-up">
          <p className="text-center text-xs tracking-widest uppercase text-rakura-muted mb-8">
            {isEn ? "Recognition & Achievements" : "การยอมรับและความสำเร็จ"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
            {pressItems.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity duration-300 text-center">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-display font-semibold text-foreground text-sm tracking-wide">
                  {isEn ? item.nameEn : item.nameTh}
                </span>
                <span className="text-xs text-rakura-muted tracking-wide">
                  {isEn ? item.descEn : item.descTh}
                </span>
              </div>
            ))}
          </div>
        </AnimateOnView>
      </div>
    </section>
  );
}
