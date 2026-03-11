import type { Locale } from "@/lib/i18n";
import { AnimateOnView } from "@/components/AnimateOnView";
import Link from "next/link";
import Image from "next/image";
import { contact } from "@/data/contact";

const included = [
  {
    nameEn: "Himalayan Noir",
    nameTh: "หิมาลัยนัวร์",
    descEn: "Bold, full-bodied black tea from Nepal's finest estates",
    descTh: "ชาดำเข้มแข็ง มีเนื้อที่สมบูรณ์จากสวนชาชั้นเลิศของเนปาล",
    image: "/assets/pdf/collection-noir-transparent.png",
  },
  {
    nameEn: "Himalayan Golden Tips",
    nameTh: "หิมาลัยโกลเดนทิปส์",
    descEn: "Ultra-premium single origin with rare golden tip leaves",
    descTh: "ชาเดี่ยวพรีเมียมสูงสุดพร้อมใบ Golden Tip หายาก",
    image: "/assets/pdf/collection-blossoms-transparent.png",
  },
  {
    nameEn: "Himalayan Emerald",
    nameTh: "หิมาลัยเอมเมอรัลด์",
    descEn: "Delicate green tea with natural mineral sweetness",
    descTh: "ชาเขียวบอบบางพร้อมความหวานแร่ธาตุธรรมชาติ",
    image: "/assets/pdf/collection-silver-transparent.png",
  },
  {
    nameEn: "Himalayan Blossoms",
    nameTh: "หิมาลัยบลอสซัมส์",
    descEn: "Calming caffeine-free herbal blend for evening rituals",
    descTh: "ชาสมุนไพรไม่มีคาเฟอีนเพื่อพิธีกรรมยามเย็น",
    image: "/assets/pdf/collection-blossoms-transparent.png",
  },
  {
    nameEn: "Classic Masala",
    nameTh: "มาซาลาคลาสสิก",
    descEn: "Traditional spiced chai blend — warming and aromatic",
    descTh: "ชาเครื่องเทศแบบดั้งเดิม อบอุ่นและหอมกรุ่น",
    image: "/assets/pdf/collection-noir-transparent.png",
  },
];

const whatsincluded = [
  { icon: "🫖", enLabel: "5 Premium Teas", thLabel: "ชาพรีเมียม 5 ชนิด" },
  { icon: "📖", enLabel: "Brew Guide Card", thLabel: "การ์ดคู่มือชง" },
  { icon: "📦", enLabel: "Gift Packaging", thLabel: "บรรจุภัณฑ์ของขวัญ" },
  { icon: "🌿", enLabel: "Origin Story", thLabel: "เรื่องราวต้นกำเนิด" },
];

export default function SampleKitPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const isEn = locale === "en";

  const whatsappMsg = isEn
    ? "Hi! I'd like to order a Rakura Sample Kit (5-tea trial pack). Please let me know the details and price."
    : "สวัสดี! ฉันต้องการสั่ง Rakura Sample Kit (ชุดทดลอง 5 ชา) กรุณาแจ้งรายละเอียดและราคาด้วยค่ะ";

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-rakura-dark py-20 sm:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <AnimateOnView animation="fade-in-up">
            <p className="eyebrow text-rakura-gold mb-4">{isEn ? "New to Rakura?" : "ยังไม่รู้จัก Rakura?"}</p>
            <h1
              className="font-display font-bold text-white leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {isEn ? "The Rakura Trial Kit" : "ชุดทดลอง Rakura"}
            </h1>
            <p className="text-white/70 max-w-xl mx-auto text-base sm:text-lg mb-10">
              {isEn
                ? "5 premium Himalayan teas. One beautifully packaged kit. The easiest way to discover Nepal's finest teas without committing to a full box."
                : "ชาหิมาลัยพรีเมียม 5 ชนิด บรรจุภัณฑ์สวยงาม วิธีที่ง่ายที่สุดในการค้นพบชาชั้นเลิศของเนปาลโดยไม่ต้องสั่งกล่องเต็ม"}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={`${contact.thailand.whatsappUrl}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-rakura-gold text-rakura-dark font-semibold text-sm tracking-wider uppercase px-8 py-3.5 hover:bg-rakura-gold-light transition-colors"
              >
                {isEn ? "Order via WhatsApp" : "สั่งผ่าน WhatsApp"}
              </a>
              <a
                href={contact.thailand.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/50 text-white font-semibold text-sm tracking-wider uppercase px-8 py-3.5 hover:bg-white/10 hover:border-white transition-colors"
              >
                {isEn ? "Order via LINE" : "สั่งผ่าน LINE"}
              </a>
            </div>
          </AnimateOnView>
        </div>
      </section>

      {/* What's included strip */}
      <section className="bg-stone-50 border-b border-stone-200 py-8 px-4">
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-8 sm:gap-16">
          {whatsincluded.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-semibold text-foreground">
                {isEn ? item.enLabel : item.thLabel}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* The 5 teas */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <AnimateOnView animation="fade-in-up">
            <div className="text-center mb-14">
              <p className="eyebrow mb-3">{isEn ? "What's Inside" : "มีอะไรในชุด"}</p>
              <h2 className="font-display font-bold text-foreground text-2xl sm:text-3xl">
                {isEn ? "Five Curated Himalayan Teas" : "ชาหิมาลัยคัดสรร 5 ชนิด"}
              </h2>
            </div>
          </AnimateOnView>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-5">
            {included.map((tea, i) => (
              <AnimateOnView key={i} animation="zoom-in" delay={i * 70}>
                <div className="border border-stone-200 group hover:border-rakura-gold/40 transition-colors overflow-hidden">
                  <div className="aspect-square bg-stone-50 relative">
                    <Image
                      src={tea.image}
                      alt={tea.nameEn}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 80vw, 20vw"
                    />
                    <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-rakura-gold text-rakura-dark text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground text-sm leading-snug group-hover:text-rakura-gold transition-colors">
                      {isEn ? tea.nameEn : tea.nameTh}
                    </h3>
                    <p className="text-xs text-rakura-muted mt-1.5 leading-relaxed">
                      {isEn ? tea.descEn : tea.descTh}
                    </p>
                  </div>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      {/* Why try first */}
      <section className="bg-rakura-dark py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimateOnView animation="fade-in-up">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-white text-2xl sm:text-3xl mb-4">
                {isEn ? "Why Try Before You Commit?" : "ทำไมต้องลองก่อน?"}
              </h2>
            </div>
          </AnimateOnView>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: "💰",
                titleEn: "Lower Risk",
                titleTh: "ความเสี่ยงต่ำกว่า",
                descEn: "Discover Rakura's quality at a fraction of a full box price.",
                descTh: "ค้นพบคุณภาพ Rakura ในราคาเพียงเศษส่วนของกล่องเต็ม",
              },
              {
                icon: "🎁",
                titleEn: "Perfect Gift",
                titleTh: "ของขวัญที่สมบูรณ์แบบ",
                descEn: "Beautiful packaging — an elegant gift for any tea lover.",
                descTh: "บรรจุภัณฑ์สวยงาม ของขวัญสง่างามสำหรับผู้รักชา",
              },
              {
                icon: "🗺️",
                titleEn: "Explore the Range",
                titleTh: "สำรวจสายพันธุ์ชา",
                descEn: "Five very different teas — find your personal favourite.",
                descTh: "ชาที่แตกต่างกันมาก 5 ชนิด ค้นหารสชาติที่คุณชอบ",
              },
            ].map((item, i) => (
              <AnimateOnView key={i} animation="fade-in-up" delay={i * 70}>
                <div className="text-center p-6 border border-white/10 hover:border-rakura-gold/40 transition-colors">
                  <span className="text-3xl block mb-4">{item.icon}</span>
                  <h3 className="font-semibold text-white mb-2">
                    {isEn ? item.titleEn : item.titleTh}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {isEn ? item.descEn : item.descTh}
                  </p>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4 text-center border-t border-stone-200">
        <AnimateOnView animation="fade-in-up">
          <h2 className="font-display font-bold text-foreground text-2xl sm:text-3xl mb-4">
            {isEn ? "Ready to Order Your Kit?" : "พร้อมสั่งชุดทดลองแล้วหรือยัง?"}
          </h2>
          <p className="text-rakura-muted mb-8 max-w-md mx-auto text-sm">
            {isEn
              ? "Contact our Thailand team via WhatsApp or LINE. We'll handle everything from there."
              : "ติดต่อทีมไทยของเราผ่าน WhatsApp หรือ LINE เราจะดูแลทุกอย่าง"}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`${contact.thailand.whatsappUrl}?text=${encodeURIComponent(whatsappMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold text-sm tracking-wider uppercase px-8 py-3.5 hover:opacity-90 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              {isEn ? "Order via WhatsApp" : "สั่งผ่าน WhatsApp"}
            </a>
            <Link
              href={`/${locale}#products`}
              className="inline-flex items-center gap-2 border border-foreground/20 text-foreground font-semibold text-sm tracking-wider uppercase px-8 py-3.5 hover:border-foreground/40 transition-colors"
            >
              {isEn ? "Browse Full Range" : "ดูผลิตภัณฑ์ทั้งหมด"}
            </Link>
          </div>
        </AnimateOnView>
      </section>
    </div>
  );
}
