import { AnimateOnView } from "@/components/AnimateOnView";
import type { Locale } from "@/lib/i18n";

const testimonials = [
  {
    quoteEn: "Rakura teas transformed our in-room amenity programme. Our guests frequently comment on the quality and beautiful packaging — it's become a signature touch.",
    quoteTh: "ชา Rakura เปลี่ยนโปรแกรมชาในห้องพักของเรา แขกมักชื่นชมคุณภาพและบรรจุภัณฑ์ที่สวยงาม กลายเป็นเอกลักษณ์ของที่พักเรา",
    nameEn: "Head of F&B",
    nameTh: "ผู้จัดการ F&B",
    companyEn: "5-Star Resort, Koh Samui",
    companyTh: "รีสอร์ท 5 ดาว เกาะสมุย",
    stars: 5,
  },
  {
    quoteEn: "I discovered Rakura at a hotel and immediately wanted to buy it for home. The Himalayan Golden Tips is extraordinary — nothing else comes close.",
    quoteTh: "ฉันค้นพบ Rakura ที่โรงแรมและอยากซื้อกลับบ้านทันที ชา Himalayan Golden Tips นั้นวิเศษมาก ไม่มีอะไรเทียบได้",
    nameEn: "Tea Enthusiast",
    nameTh: "ผู้รักชา",
    companyEn: "Bangkok, Thailand",
    companyTh: "กรุงเทพฯ ประเทศไทย",
    stars: 5,
  },
  {
    quoteEn: "We use Rakura across our spa menu — the herbal blends are a perfect complement to our treatments. Clients love the sustainability story.",
    quoteTh: "เราใช้ Rakura ในเมนูสปา ชาสมุนไพรเหมาะกับการบำบัดของเราสมบูรณ์แบบ ลูกค้าชอบเรื่องราวความยั่งยืน",
    nameEn: "Spa Director",
    nameTh: "ผู้อำนวยการสปา",
    companyEn: "Wellness Retreat, Chiang Mai",
    companyTh: "รีทรีตเวลเนส เชียงใหม่",
    stars: 5,
  },
];

export function TestimonialsSection({ locale }: { locale: Locale }) {
  const isEn = locale === "en";

  return (
    <section className="bg-stone-50 border-y border-stone-200 py-20 sm:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimateOnView animation="fade-in-up">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">{isEn ? "What People Say" : "เสียงจากลูกค้า"}</p>
            <h2
              className="font-display font-bold text-foreground leading-tight"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)" }}
            >
              {isEn ? "Trusted by Hotels, Spas & Tea Lovers" : "ไว้วางใจโดยโรงแรม สปา และผู้รักชา"}
            </h2>
          </div>
        </AnimateOnView>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimateOnView key={i} animation="fade-in-up" delay={i * 80}>
              <div className="bg-white border border-stone-200 p-7 flex flex-col gap-5 hover:border-rakura-gold/40 hover:shadow-soft transition-all duration-300">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="var(--rakura-gold)">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                {/* Quote */}
                <p className="text-rakura-muted text-sm leading-relaxed italic flex-1">
                  &ldquo;{isEn ? t.quoteEn : t.quoteTh}&rdquo;
                </p>
                {/* Attribution */}
                <div className="border-t border-stone-100 pt-4">
                  <p className="font-semibold text-foreground text-sm">{isEn ? t.nameEn : t.nameTh}</p>
                  <p className="text-xs text-rakura-gold tracking-wide mt-0.5">{isEn ? t.companyEn : t.companyTh}</p>
                </div>
              </div>
            </AnimateOnView>
          ))}
        </div>
      </div>
    </section>
  );
}
