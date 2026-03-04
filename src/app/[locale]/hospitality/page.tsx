import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { AnimateOnView } from "@/components/AnimateOnView";
import { contact } from "@/data/contact";

export default function HospitalityPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const isEn = locale === "en";

  const programs = [
    {
      icon: "🛏️",
      titleEn: "In-Room Tea Amenity",
      titleTh: "ชาในห้องพัก",
      descEn: "Curate a memorable first impression with Rakura's premium Collection teas. Beautiful packaging, compostable teabags — a perfect reflection of your property's values.",
      descTh: "สร้างความประทับใจแรกที่ยากลืมด้วยชาคอลเลกชันพรีเมียมของ Rakura บรรจุภัณฑ์สวยงาม ซองชาย่อยสลายได้ สะท้อนคุณค่าของที่พักของคุณ",
      products: isEn ? "Recommended: Himalayan Collection (4 varieties)" : "แนะนำ: ชาคอลเลกชันหิมาลัย (4 สายพันธุ์)",
    },
    {
      icon: "🧘",
      titleEn: "Spa & Wellness Menu",
      titleTh: "เมนูสปาและเวลเนส",
      descEn: "Elevate your spa experience with curated teas by mood and treatment. From calming herbal blends before massage to energising green tea post-treatment.",
      descTh: "ยกระดับประสบการณ์สปาด้วยชาที่คัดสรรตามอารมณ์และการบำบัด จากชาสมุนไพรผ่อนคลายก่อนนวด ไปถึงชาเขียวกระตุ้นพลังหลังการบำบัด",
      products: isEn ? "Recommended: Himalayan Blossoms, Himalayan Emerald, Classic Green" : "แนะนำ: Himalayan Blossoms, Himalayan Emerald, Classic Green",
    },
    {
      icon: "🍽️",
      titleEn: "Restaurant & All-Day Dining",
      titleTh: "ร้านอาหารและไดนิ่งตลอดวัน",
      descEn: "Differentiate your F&B offering with Nepal's finest teas. Our Classic range pairs beautifully with both Eastern and Western cuisine.",
      descTh: "สร้างความแตกต่างให้กับ F&B ด้วยชาชั้นเลิศจากเนปาล ชาคลาสสิกของเราเข้ากันได้ดีกับอาหารทั้งตะวันออกและตะวันตก",
      products: isEn ? "Recommended: Classic Range, Masala, Earl Grey" : "แนะนำ: ชาคลาสสิก, มาซาลา, เอิร์ลเกรย์",
    },
    {
      icon: "🌿",
      titleEn: "Wellness Retreat Packages",
      titleTh: "แพ็คเกจเวลเนสรีทรีต",
      descEn: "Partner with Rakura for branded wellness experiences. We offer bespoke tea tastings, curated retreat packages, and co-branded collateral.",
      descTh: "เป็นพาร์ตเนอร์กับ Rakura เพื่อประสบการณ์เวลเนสที่มีแบรนด์ เสนอการชิมชาเฉพาะ แพ็คเกจรีทรีต และสื่อประชาสัมพันธ์ร่วมแบรนด์",
      products: isEn ? "Recommended: Full Collection + Presentation Set" : "แนะนำ: ชาครบชุด + ชุดนำเสนอ",
    },
  ];

  const whyRakura = [
    {
      icon: "🏔️",
      titleEn: "Pure Himalayan Heritage",
      titleTh: "มรดกหิมาลัยบริสุทธิ์",
      descEn: "70+ years of tea expertise. Single origin from Nepal's finest estates in Ilam and Jhapa — a story your guests will love to hear.",
      descTh: "ความเชี่ยวชาญชากว่า 70 ปี แหล่งเดียวจากสวนชาชั้นเลิศของเนปาล เรื่องราวที่แขกของคุณจะชื่นชอบ",
    },
    {
      icon: "🌍",
      titleEn: "Premium Sustainability",
      titleTh: "ความยั่งยืนระดับพรีเมียม",
      descEn: "FSC-certified packaging, compostable 1NG teabags with no staples or nylon. Align your property with the values your discerning guests expect.",
      descTh: "บรรจุภัณฑ์รับรอง FSC ซองชา 1NG ย่อยสลายได้ ไม่มีลวดเย็บหรือไนลอน สะท้อนคุณค่าที่แขกของคุณคาดหวัง",
    },
    {
      icon: "🏆",
      titleEn: "Award-Winning Quality",
      titleTh: "คุณภาพระดับรางวัล",
      descEn: "Nepal's Finest Food Safety & Quality Management Award winner. Exported to 30+ countries. A globally recognised standard of excellence.",
      descTh: "ผู้ชนะรางวัล Nepal's Finest Food Safety & Quality Management ส่งออกสู่กว่า 30 ประเทศ มาตรฐานความเป็นเลิศที่ได้รับการยอมรับระดับโลก",
    },
    {
      icon: "🎁",
      titleEn: "Beautiful Presentation",
      titleTh: "การนำเสนอที่สวยงาม",
      descEn: "Exquisitely packaged teas that photograph beautifully — perfect for Instagram moments and guest social sharing.",
      descTh: "ชาบรรจุภัณฑ์สวยงาม เหมาะสำหรับการถ่ายรูปและแชร์บนโซเชียลมีเดีย",
    },
  ];

  const steps = [
    {
      num: "01",
      titleEn: "Get in Touch",
      titleTh: "ติดต่อเรา",
      descEn: "Tell us about your property, number of rooms, and tea preferences. We'll prepare a bespoke proposal.",
      descTh: "บอกเราเกี่ยวกับที่พัก จำนวนห้อง และความต้องการด้านชา เราจะจัดทำข้อเสนอเฉพาะสำหรับคุณ",
    },
    {
      num: "02",
      titleEn: "Sample & Taste",
      titleTh: "ลองชิม",
      descEn: "We send a curated sampling kit. Your team selects the perfect teas for your guests.",
      descTh: "เราส่งชุดตัวอย่างคัดสรรพิเศษ ทีมของคุณเลือกชาที่เหมาะกับแขก",
    },
    {
      num: "03",
      titleEn: "Ongoing Supply",
      titleTh: "จัดส่งต่อเนื่อง",
      descEn: "Flexible B2B pricing, regular delivery, and dedicated support from our Thailand team.",
      descTh: "ราคา B2B ยืดหยุ่น จัดส่งสม่ำเสมอ และการสนับสนุนเฉพาะจากทีมไทยของเรา",
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* ── HERO ── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-rakura-dark">
        <Image
          src="/assets/pdf/page23_large_0.png"
          alt="Himalayan tea gardens"
          fill
          priority
          className="object-cover object-[50%_40%] opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-rakura-dark/60 via-rakura-dark/40 to-rakura-dark/80" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="eyebrow text-rakura-gold mb-5">
            {isEn ? "For Hotels, Spas & Wellness Properties" : "สำหรับโรงแรม สปา และสถานที่เวลเนส"}
          </p>
          <h1
            className="font-display font-bold text-white leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)" }}
          >
            {isEn
              ? "Premium Tea Experiences for Discerning Properties"
              : "ประสบการณ์ชาพรีเมียมสำหรับที่พักชั้นเลิศ"}
          </h1>
          <p className="text-white/75 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8">
            {isEn
              ? "Bring the story of Nepal's finest Himalayan teas to your guests. We partner with luxury hotels, wellness retreats, and spa properties across Thailand."
              : "นำเรื่องราวของชาหิมาลัยชั้นเลิศของเนปาลมาสู่แขกของคุณ เราเป็นพาร์ตเนอร์กับโรงแรมลักชัวรี รีทรีตเวลเนส และสปาทั่วประเทศไทย"}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={contact.thailand.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-rakura-gold text-rakura-dark font-semibold text-sm tracking-wider uppercase px-8 py-3.5 hover:bg-rakura-gold-light transition-colors duration-200 shadow-gold"
            >
              {isEn ? "Request Samples →" : "ขอตัวอย่าง →"}
            </a>
            <a
              href={contact.thailand.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/50 text-white font-semibold text-sm tracking-wider uppercase px-8 py-3.5 hover:bg-white/10 hover:border-white transition-colors duration-200"
            >
              {isEn ? "Chat on Line" : "คุยทาง Line"}
            </a>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="bg-stone-50 border-b border-stone-200 py-5 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-center">
          {[
            { num: "70+", label: isEn ? "Years Heritage" : "ปีมรดก" },
            { num: "30+", label: isEn ? "Countries" : "ประเทศ" },
            { num: "FSC", label: isEn ? "Certified Packaging" : "บรรจุภัณฑ์รับรอง" },
            { num: "B2B", label: isEn ? "Direct Supply" : "จัดส่งโดยตรง" },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <p className="font-display font-bold text-rakura-dark text-xl">{num}</p>
              <p className="text-xs text-rakura-muted tracking-wider uppercase">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── AMENITY PROGRAMS ── */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimateOnView animation="fade-in-up">
            <div className="text-center mb-14">
              <p className="eyebrow mb-3">{isEn ? "Hospitality Programs" : "โปรแกรมการบริการ"}</p>
              <h2
                className="font-display font-bold text-foreground leading-tight"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}
              >
                {isEn
                  ? "Curated Tea Experiences For Every Touchpoint"
                  : "ประสบการณ์ชาที่คัดสรรสำหรับทุกจุดสัมผัส"}
              </h2>
            </div>
          </AnimateOnView>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {programs.map((prog, i) => (
              <AnimateOnView key={prog.titleEn} animation="fade-in-up" delay={i * 60}>
                <div className="border border-stone-200 p-7 hover:border-rakura-gold/40 transition-colors duration-300 group">
                  <div className="text-3xl mb-4">{prog.icon}</div>
                  <h3 className="font-semibold text-foreground text-lg mb-3 group-hover:text-rakura-gold transition-colors">
                    {isEn ? prog.titleEn : prog.titleTh}
                  </h3>
                  <p className="text-rakura-muted text-sm leading-relaxed mb-4">
                    {isEn ? prog.descEn : prog.descTh}
                  </p>
                  <p className="text-xs tracking-wide text-rakura-gold border-t border-stone-100 pt-4">
                    {prog.products}
                  </p>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY RAKURA ── dark section */}
      <section className="bg-rakura-dark py-20 sm:py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <AnimateOnView animation="fade-in-up">
            <div className="text-center mb-14">
              <p className="eyebrow text-rakura-gold mb-3">{isEn ? "Why Rakura" : "ทำไมต้อง Rakura"}</p>
              <h2
                className="font-display font-bold text-white leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)" }}
              >
                {isEn
                  ? "The Tea Story Your Guests Will Remember"
                  : "เรื่องราวชาที่แขกของคุณจะจดจำ"}
              </h2>
            </div>
          </AnimateOnView>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10">
            {whyRakura.map((item, i) => (
              <AnimateOnView key={item.titleEn} animation="fade-in-up" delay={i * 70}>
                <div className="bg-rakura-dark p-8">
                  <div className="text-2xl mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-white text-lg mb-3">
                    {isEn ? item.titleEn : item.titleTh}
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed">
                    {isEn ? item.descEn : item.descTh}
                  </p>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 sm:py-28 px-4 bg-stone-50 border-y border-stone-200">
        <div className="max-w-4xl mx-auto">
          <AnimateOnView animation="fade-in-up">
            <div className="text-center mb-14">
              <p className="eyebrow mb-3">{isEn ? "Simple Process" : "ขั้นตอนง่ายๆ"}</p>
              <h2 className="font-display font-bold text-foreground text-2xl sm:text-3xl">
                {isEn ? "How to Partner With Rakura" : "วิธีเป็นพาร์ตเนอร์กับ Rakura"}
              </h2>
            </div>
          </AnimateOnView>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <AnimateOnView key={step.num} animation="fade-in-up" delay={i * 80}>
                <div className="text-center">
                  <p className="font-display font-bold text-rakura-gold text-4xl sm:text-5xl mb-4 opacity-70">{step.num}</p>
                  <h3 className="font-semibold text-foreground text-lg mb-3">
                    {isEn ? step.titleEn : step.titleTh}
                  </h3>
                  <p className="text-rakura-muted text-sm leading-relaxed">
                    {isEn ? step.descEn : step.descTh}
                  </p>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAMPLE PRODUCTS ── */}
      <section className="py-20 sm:py-28 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <AnimateOnView animation="fade-in-up">
            <div className="text-center mb-12">
              <p className="eyebrow mb-3">{isEn ? "Popular For Hospitality" : "ยอดนิยมสำหรับการบริการ"}</p>
              <h2 className="font-display font-bold text-foreground text-2xl sm:text-3xl mb-2">
                {isEn ? "Recommended Selections" : "ชุดที่แนะนำ"}
              </h2>
              <p className="text-rakura-muted text-sm max-w-md mx-auto">
                {isEn
                  ? "Minimum order quantities and B2B pricing available on request."
                  : "ปริมาณสั่งซื้อขั้นต่ำและราคา B2B มีให้ตามคำขอ"}
              </p>
            </div>
          </AnimateOnView>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                nameEn: "The Himalayan Collection",
                nameTh: "Himalayan Collection",
                tagEn: "Best For In-Room",
                tagTh: "แนะนำสำหรับห้องพัก",
                descEn: "4 premium varieties in exquisite packaging. The story of Himalayan tea on every bedside tray.",
                descTh: "ชาพรีเมียม 4 สายพันธุ์ บรรจุภัณฑ์สวยงาม เรื่องราวชาหิมาลัยบนทุกถาด",
                image: "/assets/pdf/collection-noir-transparent.png",
              },
              {
                nameEn: "Classic Range (100-bag)",
                nameTh: "ชาคลาสสิก (100 ซอง)",
                tagEn: "Best For Restaurant",
                tagTh: "แนะนำสำหรับร้านอาหาร",
                descEn: "Large-format packs for high-volume service. Consistent quality, reliable supply.",
                descTh: "แพ็คขนาดใหญ่สำหรับปริมาณมาก คุณภาพคงที่ จัดส่งสม่ำเสมอ",
                image: "/assets/pdf/page14_img1.png",
              },
              {
                nameEn: "Himalayan Blossoms",
                nameTh: "Himalayan Blossoms",
                tagEn: "Best For Spa",
                tagTh: "แนะนำสำหรับสปา",
                descEn: "Calming caffeine-free blend. Perfect for post-treatment relaxation and sleep rituals.",
                descTh: "ชาสมุนไพรผ่อนคลายไม่มีคาเฟอีน เหมาะหลังการบำบัดและพิธีกรรมการนอนหลับ",
                image: "/assets/pdf/collection-blossoms-transparent.png",
              },
            ].map((prod, i) => (
              <AnimateOnView key={prod.nameEn} animation="scale-in" delay={i * 70}>
                <div className="border border-stone-200 group overflow-hidden hover:border-rakura-gold/40 transition-colors duration-300">
                  <div className="aspect-[4/3] bg-stone-50 relative overflow-hidden flex items-center justify-center">
                    <Image
                      src={prod.image}
                      alt={prod.nameEn}
                      fill
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-semibold tracking-wider uppercase bg-rakura-gold text-rakura-dark px-2.5 py-1">
                        {isEn ? prod.tagEn : prod.tagTh}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground mb-2">{isEn ? prod.nameEn : prod.nameTh}</h3>
                    <p className="text-rakura-muted text-xs leading-relaxed">{isEn ? prod.descEn : prod.descTh}</p>
                  </div>
                </div>
              </AnimateOnView>
            ))}
          </div>

          <AnimateOnView animation="fade-in-up">
            <div className="text-center mt-10">
              <Link
                href={`/${locale}#products`}
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase border border-rakura-gold/40 text-rakura-gold hover:border-rakura-gold hover:bg-rakura-gold/10 px-8 py-3 transition-all duration-200"
              >
                {isEn ? "View All Products" : "ดูผลิตภัณฑ์ทั้งหมด"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </AnimateOnView>
        </div>
      </section>

      {/* ── CTA CONTACT ── */}
      <section className="bg-rakura-dark py-20 sm:py-24 px-4 text-center">
        <AnimateOnView animation="fade-in-up">
          <p className="eyebrow text-rakura-gold mb-4">{isEn ? "Let's Talk Tea" : "มาคุยเรื่องชากัน"}</p>
          <h2 className="font-display font-bold text-white text-2xl sm:text-3xl mb-4">
            {isEn
              ? "Ready to Bring Rakura to Your Property?"
              : "พร้อมนำ Rakura มาสู่ที่พักของคุณหรือยัง?"}
          </h2>
          <p className="text-white/65 max-w-md mx-auto text-sm leading-relaxed mb-10">
            {isEn
              ? "Our Thailand team speaks Thai & English and can arrange samples, pricing, and a property visit within days."
              : "ทีมไทยของเราพูดภาษาไทยและอังกฤษ สามารถจัดเตรียมตัวอย่าง ราคา และการเยี่ยมชมสถานที่ภายในไม่กี่วัน"}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={contact.thailand.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold text-sm tracking-wider uppercase px-8 py-3.5 hover:opacity-90 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              {isEn ? "WhatsApp Us" : "WhatsApp เรา"}
            </a>
            <a
              href={contact.thailand.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#06C755] text-white font-semibold text-sm tracking-wider uppercase px-8 py-3.5 hover:opacity-90 transition-opacity"
            >
              {isEn ? "Line Message" : "ส่งข้อความ Line"}
            </a>
            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold text-sm tracking-wider uppercase px-8 py-3.5 hover:bg-white/10 hover:border-white transition-colors duration-200"
            >
              {isEn ? "Email Enquiry" : "สอบถามทางอีเมล"}
            </Link>
          </div>
        </AnimateOnView>
      </section>
    </div>
  );
}
