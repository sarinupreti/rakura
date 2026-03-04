import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/data/translations";
import { getFeaturedProducts } from "@/data/products";
import { features1NG } from "@/data/features";
import { ProductsSection } from "@/components/ProductsSection";
import { ContactSection } from "@/components/ContactSection";
import { AnimateOnView } from "@/components/AnimateOnView";

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
          className="object-cover object-[50%_40%]"
          sizes="100vw"
        />
        {/* Layered overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-rakura-dark/20" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="eyebrow text-rakura-gold mb-6 animate-fade-in-down">
            {isEn ? "EST. 1973 · NEPAL" : "ก่อตั้ง ปี 2516 · เนปาล"}
          </p>
          <h1 className="font-display font-bold text-white leading-[1.05] tracking-tight animate-fade-in-up"
            style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)" }}
          >
            {isEn ? (
              <>THE FINEST<br />HIMALAYAN TEAS</>
            ) : (
              <>{t.heroTitle}</>
            )}
          </h1>
          <p className="mt-6 text-stone-300 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:120ms]">
            {isEn
              ? "Pure. Single Origin. Amongst The World's Finest."
              : t.heroSubtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center animate-fade-in-up [animation-delay:240ms]">
            <Link
              href={`/${locale}#products`}
              className="inline-flex items-center justify-center rounded-none bg-rakura-gold text-rakura-dark font-semibold px-8 py-3.5 text-sm tracking-wider uppercase hover:bg-rakura-gold-light transition-colors duration-200 shadow-gold"
            >
              {t.heroCta}
            </Link>
            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center justify-center rounded-none border border-white/60 text-white font-semibold px-8 py-3.5 text-sm tracking-wider uppercase hover:bg-white/10 hover:border-white transition-colors duration-200"
            >
              {t.heroCta2}
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ── BRAND STATEMENT ── */}
      <section className="bg-background py-20 sm:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <AnimateOnView animation="fade-in-up">
            <p className="eyebrow mb-5">
              {isEn ? "A Tea Secret Revealed" : "ความลับของชาที่ถูกเปิดเผย"}
            </p>
            <h2 className="font-display font-bold text-foreground leading-tight"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)" }}
            >
              {isEn
                ? "Introducing The World To One Of The Best Kept Tea Secrets: Himalayan Tea."
                : "แนะนำความลับของชาที่ดีที่สุดในโลกให้ทุกคนได้รู้จัก: ชาหิมาลัย"}
            </h2>
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
          <div className="relative min-h-[400px] md:min-h-[560px] order-2 md:order-1">
            <Image
              src="/assets/pdf/page9_large_0.png"
              alt="Rakura tea tasting"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {/* Text */}
          <div className="bg-rakura-dark text-white px-8 sm:px-14 py-16 flex flex-col justify-center order-1 md:order-2">
            <AnimateOnView animation="fade-in-up">
              <p className="eyebrow text-rakura-gold mb-4">
                {isEn ? "The Dream" : "ความฝัน"}
              </p>
              <h2 className="font-display font-bold text-white mb-6 leading-tight text-3xl sm:text-4xl">
                {tStory.dreamTitle}
              </h2>
              <p className="text-white/70 leading-relaxed">{tStory.dreamLead}</p>
            </AnimateOnView>
          </div>
        </div>
      </section>

      {/* ── STORY: THE PIONEER ── reversed */}
      <section className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Text */}
          <div className="bg-rakura-crimson text-white px-8 sm:px-14 py-16 flex flex-col justify-center">
            <AnimateOnView animation="fade-in-up">
              <p className="eyebrow text-white/70 mb-4">
                {isEn ? "The Pioneer" : "ผู้บุกเบิก"}
              </p>
              <h2 className="font-display font-bold text-white mb-6 leading-tight text-3xl sm:text-4xl">
                {tStory.pioneerTitle}
              </h2>
              <p className="text-white/80 leading-relaxed">{tStory.pioneerLead}</p>
            </AnimateOnView>
          </div>
          {/* Image */}
          <div className="relative min-h-[400px] md:min-h-[560px]">
            <Image
              src="/assets/pdf/page23_large_0.png"
              alt="Himalayan tea plantation"
              fill
              className="object-cover object-[50%_60%]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ── STORY: THE FUTURE ── split */}
      <section className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative min-h-[400px] md:min-h-[520px] order-2 md:order-1">
            <Image
              src="/assets/pdf/page24_large_0.png"
              alt="Tea picker in the Himalayas"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {/* Text */}
          <div className="bg-background px-8 sm:px-14 py-16 flex flex-col justify-center order-1 md:order-2 border-l border-foreground/10">
            <AnimateOnView animation="fade-in-up">
              <p className="eyebrow mb-4">
                {isEn ? "The Future" : "อนาคต"}
              </p>
              <h2 className="font-display font-bold text-foreground mb-6 leading-tight text-3xl sm:text-4xl">
                {tStory.futureTitle}
              </h2>
              <p className="text-rakura-muted leading-relaxed">{tStory.futureLead}</p>
              <div className="mt-8 pt-8 border-t border-foreground/10">
                <p className="eyebrow mb-3">{isEn ? "Himalayan Origin" : "ต้นกำเนิดหิมาลัย"}</p>
                <h3 className="font-semibold text-foreground text-xl mb-3">{tStory.himalayanTitle}</h3>
                <p className="text-rakura-muted leading-relaxed text-sm">{tStory.himalayanLead}</p>
              </div>
            </AnimateOnView>
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
            </div>
          </AnimateOnView>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {collections.map((product, i) => (
              <AnimateOnView key={product.id} animation="scale-in" delay={i * 80}>
                <Link
                  href={`/${locale}#products`}
                  className="group block rounded-sm overflow-hidden border border-white/10 hover:border-rakura-gold/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[3/4] relative bg-stone-900 overflow-hidden">
                    <Image
                      src={product.image!}
                      alt={locale === "th" ? product.nameTh : product.nameEn}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4 bg-stone-900/80">
                    <p className="text-xs tracking-widest uppercase text-rakura-gold font-medium mb-1">
                      {isEn ? "50 bags" : "50 ซอง"}
                    </p>
                    <h3 className="text-white font-semibold text-sm leading-tight group-hover:text-rakura-gold transition-colors">
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
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-rakura-gold border border-rakura-gold/40 hover:border-rakura-gold hover:bg-rakura-gold/10 px-8 py-3 transition-all duration-200"
              >
                {t.ctaProducts}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
        <div className="absolute inset-0 bg-rakura-dark/80" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <AnimateOnView animation="fade-in-up">
            <div className="text-center mb-16">
              <p className="eyebrow mb-4">{isEn ? "Our Commitment" : "ความมุ่งมั่นของเรา"}</p>
              <h2 className="font-display font-bold text-white mb-4 leading-tight"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
              >
                {tSustainability.title}
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">{t.featuresSubtitle}</p>
            </div>
          </AnimateOnView>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 mb-16">
            {[
              { title: tSustainability.trueTitle, lead: tSustainability.trueLead },
              { title: tSustainability.standardsTitle, lead: tSustainability.standardsLead },
              { title: tSustainability.environmentTitle, lead: tSustainability.environmentLead },
            ].map((block, i) => (
              <AnimateOnView key={i} animation="fade-in-up" delay={i * 80}>
                <div className="border-t border-rakura-gold/40 pt-6">
                  <h3 className="text-white font-semibold text-lg mb-3">{block.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{block.lead}</p>
                </div>
              </AnimateOnView>
            ))}
          </div>

          {/* 1NG teabag section */}
          <AnimateOnView animation="fade-in-up">
            <div className="border border-white/10 rounded-sm overflow-hidden">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10">
                <h3 className="text-white font-display font-semibold text-xl">
                  {locale === "th" ? "นวัตกรรมซองชา 1NG" : "1NG Teabag Innovation"}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
                {features1NG.map((f) => (
                  <div key={f.id} className="bg-rakura-dark/90 p-5">
                    <h4 className="font-medium text-white text-sm mb-1">
                      {locale === "th" ? f.titleTh : f.titleEn}
                    </h4>
                    <p className="text-white/50 text-xs leading-relaxed line-clamp-2">
                      {locale === "th" ? f.descriptionTh : f.descriptionEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnView>

          <AnimateOnView animation="fade-in-up">
            <div className="mt-8 rounded-sm overflow-hidden border border-white/10 max-w-3xl mx-auto">
              <Image
                src="/assets/1NG_Features.jpg"
                alt="Rakura teabag features"
                width={900}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </AnimateOnView>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <ContactSection locale={locale} />
    </div>
  );
}
