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
  const featured = getFeaturedProducts();

  return (
    <div>
      {/* Hero */}
      <section
        id="hero"
        className="relative overflow-hidden py-20 sm:py-28 px-4 scroll-mt-0 bg-gradient-to-b from-stone-100 via-stone-50/80 to-background"
      >
        <div className="max-w-4xl mx-auto text-center relative">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight animate-fade-in-up">
            {t.heroTitle}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-rakura-muted max-w-2xl mx-auto animate-fade-in-up [animation-delay:120ms] [animation-fill-mode:both]">
            {t.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center animate-fade-in-up [animation-delay:220ms] [animation-fill-mode:both]">
            <Link
              href={`/${locale}#products`}
              className="inline-flex items-center justify-center rounded-xl bg-rakura-gold text-white font-medium px-6 py-3 shadow-soft hover:shadow-gold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              {t.heroCta}
            </Link>
            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center justify-center rounded-xl border-2 border-rakura-gold text-rakura-gold font-medium px-6 py-3 hover:bg-rakura-gold/10 hover:border-rakura-gold-light transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {t.heroCta2}
            </Link>
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="py-16 px-4 max-w-3xl mx-auto scroll-mt-20">
        <AnimateOnView animation="fade-in-up">
          <h2 className="text-3xl font-bold text-foreground mb-10 section-heading">{tStory.title}</h2>
        </AnimateOnView>
        <div className="space-y-12">
          {[
            { title: tStory.dreamTitle, lead: tStory.dreamLead },
            { title: tStory.pioneerTitle, lead: tStory.pioneerLead },
            { title: tStory.futureTitle, lead: tStory.futureLead },
            { title: tStory.himalayanTitle, lead: tStory.himalayanLead },
          ].map((block, i) => (
            <AnimateOnView key={i} animation="fade-in-up" delay={i * 60}>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{block.title}</h3>
                <p className="text-rakura-muted leading-relaxed">{block.lead}</p>
              </div>
            </AnimateOnView>
          ))}
        </div>
      </section>

      {/* Featured collections */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimateOnView animation="fade-in-up">
            <h2 className="text-2xl font-semibold text-foreground mb-8 section-heading">
              {locale === "th" ? "คอลเลกชันแนะนำ" : "Featured collections"}
            </h2>
          </AnimateOnView>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product, i) => {
              const hasImage = product.image && !product.image.includes("placeholder");
              return (
                <AnimateOnView key={product.id} animation="scale-in" delay={i * 80}>
                  <Link
                    href={`/${locale}#products`}
                    className="group block rounded-2xl border border-stone-200 overflow-hidden bg-white shadow-soft hover:shadow-soft-lg hover:border-rakura-gold/40 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="aspect-square bg-stone-100 relative flex items-center justify-center overflow-hidden">
                      {hasImage ? (
                        <Image
                          src={product.image!}
                          alt={locale === "th" ? product.nameTh : product.nameEn}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, 25vw"
                        />
                      ) : (
                        <span className="text-rakura-muted font-medium text-lg">Rakura</span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-foreground group-hover:text-rakura-gold transition-colors">
                        {locale === "th" ? product.nameTh : product.nameEn}
                      </h3>
                      <p className="text-sm text-rakura-muted mt-1">
                        {product.bagCount} {locale === "th" ? "ซอง" : "bags"}
                      </p>
                    </div>
                  </Link>
                </AnimateOnView>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link
              href={`/${locale}#products`}
              className="inline-flex items-center gap-1 text-rakura-gold font-medium hover:underline underline-offset-4 transition-all"
            >
              {t.ctaProducts}
            </Link>
          </div>
        </div>
      </section>

      {/* Products (full grid with category filter) */}
      <ProductsSection locale={locale} />

      {/* 1NG features / Sustainability */}
      <section id="sustainability" className="py-16 px-4 bg-stone-50 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <AnimateOnView animation="fade-in-up">
            <h2 className="text-3xl font-bold text-foreground text-center mb-2 section-heading">
              {tSustainability.title}
            </h2>
          </AnimateOnView>
          <p className="text-center text-rakura-muted mb-10">{t.featuresSubtitle}</p>

          <div className="max-w-3xl mx-auto space-y-12 mb-12">
            {[
              { title: tSustainability.trueTitle, lead: tSustainability.trueLead },
              { title: tSustainability.standardsTitle, lead: tSustainability.standardsLead },
              { title: tSustainability.environmentTitle, lead: tSustainability.environmentLead },
            ].map((block, i) => (
              <AnimateOnView key={i} animation="fade-in-up" delay={i * 80}>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{block.title}</h3>
                  <p className="text-rakura-muted leading-relaxed">{block.lead}</p>
                </div>
              </AnimateOnView>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-foreground text-center mb-6">
            {locale === "th" ? "นวัตกรรมซองชา 1NG" : "1NG Teabag innovation"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {features1NG.map((f, i) => (
              <AnimateOnView key={f.id} animation="scale-in" delay={i * 50}>
                <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-soft hover:shadow-soft-lg hover:border-rakura-gold/30 transition-all duration-300">
                  <h4 className="font-medium text-foreground">
                    {locale === "th" ? f.titleTh : f.titleEn}
                  </h4>
                  <p className="text-sm text-rakura-muted mt-1 line-clamp-2">
                    {locale === "th" ? f.descriptionTh : f.descriptionEn}
                  </p>
                </div>
              </AnimateOnView>
            ))}
          </div>
          <AnimateOnView animation="fade-in-up">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-soft max-w-4xl mx-auto ring-1 ring-stone-100">
              <Image
                src="/assets/1NG_Features.jpg"
                alt="Rakura teabag features - plastic free, compostable, FSC certified"
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
              />
            </div>
          </AnimateOnView>
        </div>
      </section>

      {/* Contact */}
      <ContactSection locale={locale} />
    </div>
  );
}
