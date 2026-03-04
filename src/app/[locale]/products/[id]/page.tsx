import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductById, products } from "@/data/products";
import type { Locale } from "@/lib/i18n";
import { AnimateOnView } from "@/components/AnimateOnView";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

const brewingGuide: Record<string, { temp: string; time: string; amount: string }> = {
  collections: { temp: "90–95°C", time: "3–4 min", amount: "1 teabag / 200ml" },
  classic: { temp: "90–95°C", time: "3–4 min", amount: "1 teabag / 200ml" },
  superHerbs: { temp: "95–100°C", time: "5–7 min", amount: "1 teabag / 250ml" },
  selections: { temp: "85–90°C", time: "2–3 min", amount: "1 teabag / 200ml" },
  looseLeaf: { temp: "90–95°C", time: "3–4 min", amount: "2–3g / 200ml" },
  presenters: { temp: "90–95°C", time: "3–4 min", amount: "1 teabag / 200ml" },
};

export default function ProductDetailPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const locale = params.locale as Locale;
  const product = getProductById(params.id);
  if (!product) notFound();

  const isEn = locale === "en";
  const name = isEn ? product.nameEn : product.nameTh;
  const description = isEn ? product.shortDescriptionEn : product.shortDescriptionTh;
  const brewing = brewingGuide[product.category] ?? brewingGuide.classic;
  const inquireUrl = `/${locale}?product=${encodeURIComponent(product.id)}#contact`;
  const hasImage = product.image && !product.image.includes("placeholder");

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-foreground/10 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-rakura-muted">
          <Link href={`/${locale}`} className="hover:text-foreground transition-colors">{isEn ? "Home" : "หน้าแรก"}</Link>
          <span>/</span>
          <Link href={`/${locale}#products`} className="hover:text-foreground transition-colors">{isEn ? "Products" : "ผลิตภัณฑ์"}</Link>
          <span>/</span>
          <span className="text-foreground">{name}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image */}
          <AnimateOnView animation="fade-in-up">
            <div className="aspect-[3/4] relative bg-stone-50 rounded-sm overflow-hidden max-w-sm mx-auto w-full">
              {hasImage ? (
                <Image
                  src={product.image!}
                  alt={name}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 768px) 80vw, 40vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-stone-300 font-display font-bold text-2xl tracking-widest">RAKURA</span>
                </div>
              )}
            </div>
          </AnimateOnView>

          {/* Details */}
          <AnimateOnView animation="fade-in-up" delay={80}>
            <div className="flex flex-col gap-6">
              <div>
                <p className="eyebrow mb-3">
                  {isEn ? "Rakura Collection" : "คอลเลกชัน Rakura"}
                </p>
                <h1 className="font-display font-bold text-foreground leading-tight text-3xl sm:text-4xl section-heading">
                  {name}
                </h1>
                {product.bagCount != null && (
                  <p className="text-rakura-gold text-sm font-medium mt-4 tracking-wide">
                    {product.bagCount} {isEn ? "Bags" : "ซอง"}
                  </p>
                )}
                {product.weight != null && (
                  <p className="text-rakura-gold text-sm font-medium mt-2 tracking-wide">{product.weight}</p>
                )}
              </div>

              <p className="text-rakura-muted leading-relaxed">{description}</p>

              {/* Tasting note */}
              {product.tastingNoteEn && (
                <div className="border-l-2 border-rakura-gold pl-4 py-1">
                  <p className="text-xs font-semibold tracking-widest uppercase text-rakura-gold mb-1">
                    {isEn ? "Tasting Note" : "รสชาติ"}
                  </p>
                  <p className="text-foreground text-sm italic leading-relaxed">
                    {isEn ? product.tastingNoteEn : product.tastingNoteTh}
                  </p>
                </div>
              )}

              {/* Origin */}
              {product.origin && (
                <div className="flex items-center gap-2 text-sm text-rakura-muted">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-rakura-gold shrink-0">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  {product.origin}
                </div>
              )}

              {/* Brewing guide */}
              <div className="bg-stone-50 rounded-sm p-5 space-y-3">
                <p className="text-xs font-semibold tracking-widest uppercase text-rakura-gold">
                  {isEn ? "Brewing Guide" : "วิธีชงชา"}
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: isEn ? "Temperature" : "อุณหภูมิ", value: brewing.temp },
                    { label: isEn ? "Steep Time" : "เวลาชง", value: brewing.time },
                    { label: isEn ? "Amount" : "ปริมาณ", value: brewing.amount },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center">
                      <p className="text-rakura-dark font-semibold text-sm">{value}</p>
                      <p className="text-rakura-muted text-xs mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href={inquireUrl}
                  className="flex-1 inline-flex items-center justify-center bg-rakura-gold text-rakura-dark font-semibold text-xs tracking-wider uppercase py-3.5 hover:bg-rakura-gold-light transition-colors duration-200"
                >
                  {isEn ? "Enquire About This Product" : "สอบถามสินค้านี้"}
                </Link>
                <Link
                  href={`/${locale}#products`}
                  className="inline-flex items-center justify-center border border-foreground/20 text-foreground text-xs font-semibold tracking-wider uppercase py-3.5 px-6 hover:border-foreground/40 transition-colors duration-200"
                >
                  {isEn ? "All Products" : "ดูทั้งหมด"}
                </Link>
              </div>
            </div>
          </AnimateOnView>
        </div>
      </div>
    </div>
  );
}
