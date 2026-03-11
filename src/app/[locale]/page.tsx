import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/data/translations";
import { getFeaturedProducts } from "@/data/products";
import { features1NG } from "@/data/features";
import { ProductsSection } from "@/components/ProductsSection";
import { ContactSection } from "@/components/ContactSection";
import { AnimateOnView } from "@/components/AnimateOnView";
import { Marquee } from "@/components/Marquee";
import { OriginMap } from "@/components/OriginMap";
import { FloatingLeaves } from "@/components/FloatingLeaves";
import { CounterAnimation } from "@/components/CounterAnimation";
import { TextReveal } from "@/components/TextReveal";

// Icons per 1NG feature
const featureIcons: Record<string, string> = {
  "plastic-free":   "🚫",
  "cotton-thread":  "🌱",
  "double-chamber": "🫖",
  "compostable":    "♻️",
  "food-grade-tags":"🏷️",
  "packaging":      "📦",
  "freshness":      "❄️",
  "clean-room":     "🔬",
  "neutrality":     "🌍",
  "natural":        "☘️",
};

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getTranslations(locale).home;
  const tStory = getTranslations(locale).story;
  const tSustainability = getTranslations(locale).sustainability;
  const collections = getFeaturedProducts();
  const isEn = locale === "en";

  return (
    <div>
      {/* ── HERO ── full-screen with tea garden image */}
      <section id="hero" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden scroll-mt-0">
        <Image
          src="/assets/pdf/page23_large_0.png"
          alt="Himalayan tea gardens"
          fill
          priority
          className="object-cover object-[50%_40%] scale-105"
          sizes="100vw"
        />
        {/* Layered overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-rakura-dark/20" />

        {/* Floating tea leaves */}
        <FloatingLeaves />

        {/* Decorative gold ring */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 3 }}
        >
          <div
            className="w-[600px] h-[600px] rounded-full border border-rakura-gold/8 animate-rotate-slow"
            style={{ animationDuration: "60s" }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full border border-rakura-gold/5 animate-rotate-slow"
            style={{ animationDuration: "40s", animationDirection: "reverse" }}
          />
        </div>

        <div className="relative text-center px-4 max-w-4xl mx-auto" style={{ zIndex: 10 }}>
          {/* Eyebrow with live dot */}
          <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in-down">
            <span className="glow-dot" />
            <p className="eyebrow text-rakura-gold">
              {isEn ? "EST. 1973 · NEPAL" : "ก่อตั้ง ปี 2516 · เนปาล"}
            </p>
            <span className="glow-dot" />
          </div>

          {/* Main headline — word-by-word reveal */}
          <TextReveal
            as="h1"
            className="font-display font-bold text-white leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)" }}
            delay={200}
            stagger={80}
          >
            {isEn ? "THE FINEST HIMALAYAN TEAS" : (t.heroTitle as string)}
          </TextReveal>

          {/* Gold shimmer subtitle */}
          <p
            className="mt-6 text-stone-300 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            {isEn
              ? "Pure. Single Origin. Amongst The World's Finest."
              : t.heroSubtitle}
          </p>

          <div
            className="mt-10 flex flex-wrap gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: "800ms" }}
          >
            <Link
              href={`/${locale}#products`}
              className="inline-flex items-center justify-center rounded-none bg-rakura-gold text-rakura-dark font-semibold px-8 py-3.5 text-sm tracking-wider uppercase hover:bg-rakura-gold-light transition-colors duration-200 btn-glow"
            >
              {t.heroCta}
            </Link>
            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center justify-center rounded-none border border-white/60 text-white font-semibold px-8 py-3.5 text-sm tracking-wider uppercase hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              {t.heroCta2}
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce" style={{ zIndex: 10 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-pause">
        <Marquee locale={locale} variant="gold" />
      </div>

      {/* ── STATS STRIP ── */}
      <section className="bg-rakura-dark border-b border-white/10 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10">
          {[
            { num: 70, suffix: "+", label: isEn ? "Years Heritage" : "ปีแห่งมรดก" },
            { num: 50, suffix: "+", label: isEn ? "Tea Varieties" : "สายพันธุ์ชา" },
            { num: 30, suffix: "+", label: isEn ? "Countries Exported" : "ประเทศที่ส่งออก" },
            { num: 100, suffix: "%", label: isEn ? "Natural Ingredients" : "ส่วนผสมธรรมชาติ" },
          ].map(({ num, suffix, label }) => (
            <AnimateOnView key={label} animation="zoom-in">
              <div className="bg-rakura-dark text-center px-4 py-6 sm:py-8 group cursor-default">
                <p className="font-display font-bold text-rakura-gold text-3xl sm:text-4xl">
                  <CounterAnimation end={num} suffix={suffix} duration={1600} />
                </p>
                <div className="gold-divider mt-3 mb-3 mx-auto w-8 opacity-40" />
                <p className="text-white/60 text-xs tracking-widest uppercase">{label}</p>
              </div>
            </AnimateOnView>
          ))}
        </div>
      </section>

      {/* ── BRAND STATEMENT ── */}
      <section className="bg-background py-20 sm:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <AnimateOnView animation="fade-in-up">
            <p className="eyebrow mb-5">
              {isEn ? "A Tea Secret Revealed" : "ความลับของชาที่ถูกเปิดเผย"}
            </p>
            <TextReveal
              as="h2"
              className="font-display font-bold text-foreground leading-tight"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)" }}
              stagger={40}
            >
              {isEn
                ? "Introducing The World To One Of The Best Kept Tea Secrets: Himalayan Tea."
                : "แนะนำความลับของชาที่ดีที่สุดในโลกให้ทุกคนได้รู้จัก: ชาหิมาลัย"}
            </TextReveal>
            <p className="mt-6 text-rakura-muted leading-relaxed text-base sm:text-lg">
              {isEn
                ? "Nepal makes teas that are amongst the finest in the world — a fact largely unheard-of by most consumers. We envisaged Rakura to defy this status quo, built on over 40 years of experience, working to change the face of Nepalese tea while creating true sustainability."
                : "เนปาลผลิตชาที่อยู่ในระดับชั้นเลิศของโลก แต่ความจริงนี้แทบไม่เป็นที่รู้จัก Rakura ถูกสร้างขึ้นด้วยประสบการณ์กว่า 40 ปี เพื่อเปลี่ยนโฉมหน้าของอุตสาหกรรมชาเนปาล"}
            </p>
          </AnimateOnView>
        </div>
      </section>

      {/* ── STORY: THE DREAM ── split layout */}
      <section id="story" className="scroll-mt-16 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative min-h-[400px] md:min-h-[560px] order-2 md:order-1 overflow-hidden">
            <Image
              src="/assets/pdf/page9_large_0.png"
              alt="Rakura tea tasting"
              fill
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {/* Text */}
          <div className="bg-rakura-dark text-white px-8 sm:px-14 py-16 flex flex-col justify-center order-1 md:order-2">
            <AnimateOnView animation="slide-in-right">
              <p className="eyebrow text-rakura-gold mb-4">
                {isEn ? "The Dream" : "ความฝัน"}
              </p>
              <h2 className="font-display font-bold text-white mb-6 leading-tight text-3xl sm:text-4xl">
                {tStory.dreamTitle}
              </h2>
              <div className="gold-divider mb-6 w-12" />
              <p className="text-white/70 leading-relaxed">{tStory.dreamLead}</p>
            </AnimateOnView>
          </div>
        </div>
      </section>

      {/* ── STORY: THE PIONEER ── reversed */}
      <section className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Text */}
          <div className="bg-rakura-dark text-white px-8 sm:px-14 py-16 flex flex-col justify-center">
            <AnimateOnView animation="slide-in-left">
              <p className="eyebrow text-white/70 mb-4">
                {isEn ? "The Pioneer" : "ผู้บุกเบิก"}
              </p>
              <h2 className="font-display font-bold text-white mb-6 leading-tight text-3xl sm:text-4xl">
                {tStory.pioneerTitle}
              </h2>
              <div className="gold-divider mb-6 w-12" />
              <p className="text-white/80 leading-relaxed">{tStory.pioneerLead}</p>
            </AnimateOnView>
          </div>
          {/* Image */}
          <div className="relative min-h-[400px] md:min-h-[560px] overflow-hidden">
            <Image
              src="/assets/pdf/page23_large_0.png"
              alt="Himalayan tea plantation"
              fill
              className="object-cover object-[50%_60%] transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ── STORY: THE FUTURE ── split */}
      <section className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative min-h-[400px] md:min-h-[520px] order-2 md:order-1 overflow-hidden">
            <Image
              src="/assets/pdf/page24_large_0.png"
              alt="Tea picker in the Himalayas"
              fill
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {/* Text */}
          <div className="bg-background px-8 sm:px-14 py-16 flex flex-col justify-center order-1 md:order-2 border-l border-foreground/10">
            <AnimateOnView animation="slide-in-right">
              <p className="eyebrow mb-4">
                {isEn ? "The Future" : "อนาคต"}
              </p>
              <h2 className="font-display font-bold text-foreground mb-6 leading-tight text-3xl sm:text-4xl">
                {tStory.futureTitle}
              </h2>
              <div className="gold-divider mb-6 w-12" />
              <p className="text-rakura-muted leading-relaxed">{tStory.futureLead}</p>
              <div className="mt-8 pt-8 border-t border-foreground/10">
                <p className="eyebrow mb-3">{isEn ? "Himalayan Origin" : "ต้นกำเนิดหิมาลัย"}</p>
                <h3 className="font-semibold text-foreground text-xl mb-3">{tStory.himalayanTitle}</h3>
                <p className="text-rakura-muted leading-relaxed text-sm">{tStory.himalayanLead}</p>
                <div className="mt-8">
                  <OriginMap locale={locale} />
                </div>
              </div>
            </AnimateOnView>
          </div>
        </div>
      </section>

      {/* ── AWARDS / CERTIFICATIONS ── */}
      <section className="bg-stone-50 border-y border-stone-200 py-8 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AnimateOnView animation="fade-in-up">
            <p className="text-center text-xs tracking-widest uppercase text-rakura-muted mb-6">
              {isEn ? "Certified & Recognised" : "รับรองและได้รับการยอมรับ"}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
              {[
                { icon: "🏆", label: isEn ? "Nepal's Finest\nFood Safety & Quality" : "รางวัลมาตรฐาน\nความปลอดภัยอาหาร เนปาล" },
                { icon: "🌿", label: isEn ? "FSC Certified\nSustainable Packaging" : "บรรจุภัณฑ์ยั่งยืน\nได้รับรอง FSC" },
                { icon: "✅", label: isEn ? "100% Food Grade\nCompostable Teabags" : "ซองชาย่อยสลายได้\nเกรดอาหาร 100%" },
                { icon: "🌍", label: isEn ? "Exported to\n30+ Countries" : "ส่งออกสู่\nกว่า 30 ประเทศ" },
              ].map(({ icon, label }, i) => (
                <AnimateOnView key={label} animation="zoom-in" delay={i * 80}>
                  <div className="flex flex-col items-center text-center gap-2 py-2 group">
                    <span className="text-2xl grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 inline-block">{icon}</span>
                    <p className="text-xs text-rakura-muted leading-relaxed whitespace-pre-line">{label}</p>
                  </div>
                </AnimateOnView>
              ))}
            </div>
          </AnimateOnView>
        </div>
      </section>

      {/* ── TEA QUIZ CTA ── */}
      <section className="bg-background border-b border-stone-200 py-16 sm:py-20 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left: text */}
            <AnimateOnView animation="slide-in-left">
              <p className="eyebrow mb-4">{isEn ? "Personalised for You" : "คำแนะนำเฉพาะคุณ"}</p>
              <h2
                className="font-display font-bold text-foreground leading-tight mb-5"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
              >
                {isEn
                  ? "Not Sure Which Tea? Let Us Guide You."
                  : "ยังไม่รู้จะเลือกชาไหน? ให้เราช่วยคุณ"}
              </h2>
              <p className="text-rakura-muted leading-relaxed mb-8 text-sm sm:text-base">
                {isEn
                  ? "Answer 4 quick questions about your mood, time of day and wellness goals — we'll recommend your perfect Rakura tea."
                  : "ตอบ 4 คำถามเกี่ยวกับอารมณ์ เวลา และเป้าหมายสุขภาพของคุณ เราจะแนะนำชา Rakura ที่เหมาะที่สุดสำหรับคุณ"}
              </p>
              <Link
                href={`/${locale}/quiz`}
                className="inline-flex items-center gap-2 bg-rakura-gold text-rakura-dark font-semibold text-sm tracking-wider uppercase px-8 py-3.5 hover:bg-rakura-gold-light transition-colors duration-200 btn-glow"
              >
                🍵 {isEn ? "Take the Tea Quiz" : "ทำแบบทดสอบชา"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </AnimateOnView>

            {/* Right: visual cards */}
            <div className="hidden md:grid grid-cols-2 gap-3">
              {[
                { emoji: "⚡", labelEn: "Need energy?", labelTh: "ต้องการพลังงาน?" },
                { emoji: "🌙", labelEn: "Wind down?", labelTh: "อยากผ่อนคลาย?" },
                { emoji: "🛡️", labelEn: "Antioxidants?", labelTh: "สารต้านอนุมูล?" },
                { emoji: "🌱", labelEn: "Digestive aid?", labelTh: "ช่วยย่อยอาหาร?" },
              ].map((card, i) => (
                <AnimateOnView key={card.labelEn} animation="zoom-in" delay={i * 80}>
                  <div
                    className="border border-stone-200 rounded-sm p-4 flex flex-col gap-2 hover:border-rakura-gold/40 hover:shadow-gold transition-all duration-300 hover:-translate-y-1 card-gold-border"
                  >
                    <span className="text-2xl animate-float" style={{ animationDelay: `${i * 0.5}s` }}>{card.emoji}</span>
                    <span className="text-xs font-medium text-rakura-muted">{isEn ? card.labelEn : card.labelTh}</span>
                  </div>
                </AnimateOnView>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS ── dark showcase */}
      <section className="bg-rakura-dark py-20 sm:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimateOnView animation="fade-in-up">
            <div className="text-center mb-14">
              <p className="eyebrow mb-4">{isEn ? "Our Collections" : "คอลเลกชันของเรา"}</p>
              <h2 className="font-display font-bold text-white leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)" }}
              >
                {isEn
                  ? "Teas, Amongst The Finest In The World.\nProudly Made In Nepal."
                  : "ชา ในระดับชั้นเลิศของโลก ผลิตจากเนปาลด้วยความภาคภูมิใจ"}
              </h2>
              <div className="gold-divider mt-6 mx-auto max-w-xs" />
            </div>
          </AnimateOnView>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {collections.map((product, i) => (
              <AnimateOnView key={product.id} animation="zoom-in" delay={i * 80}>
                <Link
                  href={`/${locale}/products/${product.id}`}
                  className="group block rounded-sm overflow-hidden border border-white/10 hover:border-rakura-gold/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-gold-lg"
                >
                  <div className="aspect-[3/4] relative bg-stone-900 overflow-hidden flex items-center justify-center">
                    <Image
                      src={product.image!}
                      alt={locale === "th" ? product.nameTh : product.nameEn}
                      fill
                      className="object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    {/* Hover shimmer overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-rakura-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-4 bg-stone-900">
                    <p className="text-xs tracking-widest uppercase text-rakura-gold font-medium mb-1">
                      {isEn ? "50 bags" : "50 ซอง"}
                    </p>
                    <h3 className="text-white font-semibold text-sm leading-tight group-hover:text-rakura-gold transition-colors duration-300">
                      {locale === "th" ? product.nameTh : product.nameEn}
                    </h3>
                  </div>
                </Link>
              </AnimateOnView>
            ))}
          </div>

          <AnimateOnView animation="fade-in-up">
            <div className="mt-12 text-center">
              <Link
                href={`/${locale}#products`}
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-rakura-gold border border-rakura-gold/40 hover:border-rakura-gold hover:bg-rakura-gold/10 px-8 py-3 transition-all duration-300 animate-border-glow"
              >
                {t.ctaProducts}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </AnimateOnView>
        </div>
      </section>

      {/* ── FULL PRODUCT CATALOGUE ── */}
      <ProductsSection locale={locale} />

      {/* ── SUSTAINABILITY ── full-bleed image with overlay */}
      <section id="sustainability" className="relative py-24 sm:py-36 px-4 scroll-mt-16 overflow-hidden">
        <Image
          src="/assets/pdf/page10_large_0.png"
          alt="Rakura production technology"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/95" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <AnimateOnView animation="fade-in-up">
            <div className="text-center mb-16">
              <p className="eyebrow mb-4">{isEn ? "Our Commitment" : "ความมุ่งมั่นของเรา"}</p>
              <TextReveal
                as="h2"
                className="font-display font-bold text-white mb-4 leading-tight"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
                stagger={50}
              >
                {tSustainability.title as string}
              </TextReveal>
              <div className="gold-divider mt-6 mx-auto max-w-xs" />
              <p className="text-white/80 max-w-xl mx-auto mt-6">{t.featuresSubtitle}</p>
            </div>
          </AnimateOnView>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 mb-16">
            {[
              { title: tSustainability.trueTitle, lead: tSustainability.trueLead },
              { title: tSustainability.standardsTitle, lead: tSustainability.standardsLead },
              { title: tSustainability.environmentTitle, lead: tSustainability.environmentLead },
            ].map((block, i) => (
              <AnimateOnView key={i} animation="slide-in-left" delay={i * 100}>
                <div className="border-t border-rakura-gold/40 pt-6 group hover:border-rakura-gold transition-colors duration-300">
                  <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-rakura-gold transition-colors duration-300">{block.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{block.lead}</p>
                </div>
              </AnimateOnView>
            ))}
          </div>

          {/* ── 1NG Teabag Innovation — Horizontal Scroll Strip ── */}
          <AnimateOnView animation="fade-in-up">
            <div className="mt-4 pt-14 border-t border-white/10">

              {/* Header row */}
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-xs tracking-widest uppercase text-rakura-gold font-semibold mb-2">
                    {isEn ? "Among The World's First" : "หนึ่งในรายแรกของโลก"}
                  </p>
                  <h3 className="font-display font-semibold text-white text-2xl sm:text-3xl">
                    {isEn ? "1NG Teabag Innovation" : "นวัตกรรมซองชา 1NG"}
                  </h3>
                </div>
                <span className="text-white/30 text-xs flex items-center gap-1.5 shrink-0 ml-6 pb-1">
                  {isEn ? "Scroll" : "เลื่อนดู"}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>

              {/* Scroll container */}
              <div className="relative">
                {/* Right-edge fade */}
                <div className="absolute right-0 top-0 bottom-3 w-24 bg-gradient-to-l from-black/90 to-transparent z-10 pointer-events-none rounded-sm" />

                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {features1NG.map((f, i) => (
                    <div
                      key={f.id}
                      className="snap-start shrink-0 w-56 sm:w-64 border border-white/10 bg-white/5 p-6 flex flex-col hover:border-rakura-gold/50 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1"
                      style={{
                        animationDelay: `${i * 50}ms`,
                      }}
                    >
                      {/* Large dim number */}
                      <p className="font-display font-bold text-6xl leading-none text-white/[0.06] mb-3 select-none tracking-tight">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      {/* Icon */}
                      <span className="text-2xl mb-4 block animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
                        {featureIcons[f.id] ?? "✦"}
                      </span>
                      {/* Title */}
                      <h4 className="font-semibold text-white text-sm mb-2 leading-snug group-hover:text-rakura-gold transition-colors duration-200 flex-none">
                        {isEn ? f.titleEn : f.titleTh}
                      </h4>
                      {/* Description */}
                      <p className="text-white/45 text-xs leading-relaxed mt-auto pt-3 border-t border-white/10">
                        {isEn ? f.descriptionEn : f.descriptionTh}
                      </p>
                    </div>
                  ))}
                  {/* End spacer */}
                  <div className="shrink-0 w-12" />
                </div>

                {/* Thin progress rail */}
                <div className="flex gap-px mt-2">
                  {features1NG.map((f) => (
                    <div key={f.id} className="h-px flex-1 bg-white/10" />
                  ))}
                </div>
                <p className="text-white/20 text-[10px] tracking-widest uppercase mt-1.5">
                  {features1NG.length} {isEn ? "innovations" : "นวัตกรรม"}
                </p>
              </div>

            </div>
          </AnimateOnView>

        </div>
      </section>

      {/* ── MARQUEE (dark variant) ── */}
      <div className="marquee-pause">
        <Marquee locale={locale} variant="dark" />
      </div>

      {/* ── CONTACT ── */}
      <ContactSection locale={locale} />
    </div>
  );
}
