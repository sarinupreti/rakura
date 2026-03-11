import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductById, products } from "@/data/products";
import { getTeaProfile } from "@/data/teaData";
import type { Locale } from "@/lib/i18n";
import { AnimateOnView } from "@/components/AnimateOnView";
import { AddToBasketButton } from "@/components/AddToBasketButton";
import { BrewTimer } from "@/components/BrewTimer";
import { contact } from "@/data/contact";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

const brewingGuide: Record<string, { temp: string; time: string; amount: string }> = {
  collections: { temp: "90–95°C", time: "3–4 min", amount: "1 bag / 200ml" },
  classic:     { temp: "90–95°C", time: "3–4 min", amount: "1 bag / 200ml" },
  superHerbs:  { temp: "95–100°C", time: "5–7 min", amount: "1 bag / 250ml" },
  selections:  { temp: "85–90°C", time: "2–3 min", amount: "1 bag / 200ml" },
  looseLeaf:   { temp: "90–95°C", time: "3–4 min", amount: "2–3g / 200ml" },
  presenters:  { temp: "90–95°C", time: "3–4 min", amount: "1 bag / 200ml" },
};

// Default steep seconds for timer (midpoint of range)
const steepSecondsMap: Record<string, number> = {
  collections: 210,  // 3.5 min
  classic:     210,
  superHerbs:  360,  // 6 min
  selections:  150,  // 2.5 min
  looseLeaf:   210,
  presenters:  210,
};


const caffeineColors: Record<string, string> = {
  none: "bg-stone-200 text-stone-600",
  low: "bg-green-100 text-green-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-red-100 text-red-700",
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
  const steepSeconds = steepSecondsMap[product.category] ?? 210;
  const whatsappMsg = isEn
    ? `Hi! I'd like to inquire about: ${product.nameEn}. Please let me know the price and availability.`
    : `สวัสดี! ฉันต้องการสอบถามเกี่ยวกับ: ${product.nameTh} กรุณาแจ้งราคาและความพร้อมจำหน่ายด้วยค่ะ`;
  const whatsappUrl = `${contact.thailand.whatsappUrl}?text=${encodeURIComponent(whatsappMsg)}`;
  const hasImage = product.image && !product.image.includes("placeholder");
  const tea = getTeaProfile(product.teaType);

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
        {/* ── TOP: Image + Core Details ── */}
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
            <div className="flex flex-col gap-5">
              <div>
                <p className="eyebrow mb-3">{isEn ? "Rakura Tea" : "ชา Rakura"}</p>
                <h1 className="font-display font-bold text-foreground leading-tight text-3xl sm:text-4xl section-heading">
                  {name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  {product.bagCount != null && (
                    <span className="text-rakura-gold text-sm font-medium tracking-wide">
                      {product.bagCount} {isEn ? "Bags" : "ซอง"}
                    </span>
                  )}
                  {product.weight != null && (
                    <span className="text-rakura-gold text-sm font-medium tracking-wide">{product.weight}</span>
                  )}
                  {tea && (
                    <span className={`text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full ${caffeineColors[tea.caffeineLevel]}`}>
                      {isEn ? tea.caffeineEn : tea.caffeineTh}
                    </span>
                  )}
                </div>
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

              {/* Origin + best time */}
              <div className="flex flex-wrap gap-4 text-sm text-rakura-muted">
                {product.origin && (
                  <div className="flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-rakura-gold shrink-0">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
                    </svg>
                    {product.origin}
                  </div>
                )}
                {tea && (
                  <div className="flex items-center gap-1.5">
                    <span>{tea.bestTimeIcon}</span>
                    <span>{isEn ? tea.bestTimeEn : tea.bestTimeTh}</span>
                  </div>
                )}
              </div>

              {/* Taste profile — 3-column editorial grid */}
              {tea && (
                <div className="border border-stone-200 rounded-sm overflow-hidden">
                  <div className="bg-stone-50 border-b border-stone-200 px-5 py-3">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-rakura-gold">
                      {isEn ? "Taste Profile" : "โปรไฟล์รสชาติ"}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 divide-x divide-stone-200">
                    {[
                      { labelEn: "Strength",     labelTh: "ความเข้มข้น",           val: tea.strength },
                      { labelEn: "Antioxidants", labelTh: "สารต้านอนุมูลอิสระ",    val: tea.antioxidants },
                      { labelEn: "Sweetness",    labelTh: "ความหวาน",              val: tea.sweetness },
                    ].map(({ labelEn, labelTh, val }) => (
                      <div key={labelEn} className="flex flex-col items-center text-center px-3 py-6">
                        <p className="text-[9px] font-semibold tracking-widest uppercase text-stone-400 mb-4">
                          {isEn ? labelEn : labelTh}
                        </p>
                        <div className="flex items-baseline gap-0.5 mb-4">
                          <span className="font-display font-bold text-4xl text-foreground leading-none">{val}</span>
                          <span className="text-xs text-stone-300 font-normal leading-none mb-0.5">/5</span>
                        </div>
                        <div className="flex gap-1.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                i < val ? "bg-rakura-gold" : "bg-stone-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Full-width fill bar at base */}
                  <div className="grid grid-cols-3 divide-x divide-stone-200 border-t border-stone-200">
                    {[tea.strength, tea.antioxidants, tea.sweetness].map((val, i) => (
                      <div key={i} className="h-1 bg-stone-100">
                        <div
                          className="h-full bg-rakura-gold"
                          style={{ width: `${(val / 5) * 100}%` }}
                        />
                      </div>
                    ))}
                  </div>
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
                      <p className="text-foreground font-semibold text-sm">{value}</p>
                      <p className="text-rakura-muted text-xs mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Brew Timer */}
              <BrewTimer steepSeconds={steepSeconds} locale={locale} />

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row sm:justify-center gap-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold text-xs tracking-wider uppercase py-3.5 px-8 hover:opacity-90 transition-opacity"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  {isEn ? "Order via WhatsApp" : "สั่งผ่าน WhatsApp"}
                </a>
                <Link
                  href={inquireUrl}
                  className="inline-flex items-center justify-center bg-rakura-gold text-rakura-dark font-semibold text-xs tracking-wider uppercase py-3.5 px-8 hover:bg-rakura-gold-light transition-colors duration-200"
                >
                  {isEn ? "Enquire About This Product" : "สอบถามสินค้านี้"}
                </Link>
                <AddToBasketButton
                  item={{
                    id: product.id,
                    nameEn: product.nameEn,
                    nameTh: product.nameTh,
                    image: product.image,
                    category: product.category,
                  }}
                  locale={locale}
                />
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

        {/* ── HEALTH BENEFITS ── */}
        {tea && (
          <AnimateOnView animation="fade-in-up" delay={120}>
            <div className="mt-20 pt-16 border-t border-foreground/10">
              <div className="text-center mb-10">
                <p className="eyebrow mb-3">{isEn ? "Why This Tea" : "ประโยชน์ของชานี้"}</p>
                <h2 className="font-display font-bold text-foreground text-2xl sm:text-3xl">
                  {isEn ? "Health Benefits" : "ประโยชน์ต่อสุขภาพ"}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {tea.benefits.map((b, i) => (
                  <div key={i} className="bg-stone-50 rounded-sm p-5 flex flex-col gap-3 hover:shadow-soft transition-shadow">
                    <span className="text-2xl">{b.icon}</span>
                    <h3 className="font-semibold text-foreground text-sm">
                      {isEn ? b.titleEn : b.titleTh}
                    </h3>
                    <p className="text-rakura-muted text-xs leading-relaxed">
                      {isEn ? b.descEn : b.descTh}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnView>
        )}

        {/* ── FOOD PAIRINGS ── */}
        {tea && (
          <AnimateOnView animation="fade-in-up" delay={160}>
            <div className="mt-12 bg-rakura-dark rounded-sm p-8">
              <p className="eyebrow mb-3" style={{ color: "var(--rakura-gold)" }}>
                {isEn ? "Pairs Well With" : "เข้ากันได้ดีกับ"}
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                {(isEn ? tea.pairingsEn : tea.pairingsTh).map((p) => (
                  <span key={p} className="text-xs font-medium text-white/80 border border-white/20 rounded-full px-4 py-1.5">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </AnimateOnView>
        )}

        {/* ── SUSTAINABILITY NOTE ── */}
        <AnimateOnView animation="fade-in-up" delay={200}>
          <div className="mt-8 flex items-start gap-4 border border-foreground/10 rounded-sm p-5">
            <span className="text-xl shrink-0">🌿</span>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-rakura-gold mb-1">
                {isEn ? "Sustainability" : "ความยั่งยืน"}
              </p>
              <p className="text-rakura-muted text-xs leading-relaxed">
                {isEn
                  ? "Packaged in FSC-certified, plastic-free, compostable Magic-knot teabags. From farm to cup, Rakura supports Nepalese tea farmers and sustainable highland agriculture."
                  : "บรรจุในซองชา Magic-knot ที่ได้รับรอง FSC ปลอดพลาสติก และย่อยสลายได้ Rakura สนับสนุนเกษตรกรชาเนปาลและการเกษตรที่ยั่งยืน"}
              </p>
            </div>
          </div>
        </AnimateOnView>
      </div>
    </div>
  );
}
