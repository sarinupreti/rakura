import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/data/translations";
import { AddToBasketButton } from "@/components/AddToBasketButton";

// Colour accent per product category
const categoryStyles: Record<string, { dot: string; label: string; labelEn: string; labelTh: string }> = {
  collections: { dot: "bg-rakura-gold",      label: "border-rakura-gold/20",   labelEn: "Collection",  labelTh: "คอลเลกชัน" },
  classic:     { dot: "bg-amber-600",        label: "border-amber-100",        labelEn: "Classic",     labelTh: "คลาสสิก"  },
  superHerbs:  { dot: "bg-emerald-600",      label: "border-emerald-100",      labelEn: "Super Herbs", labelTh: "สมุนไพร"   },
  selections:  { dot: "bg-teal-600",         label: "border-teal-100",         labelEn: "Selection",   labelTh: "ชุดชา"    },
  looseLeaf:   { dot: "bg-lime-600",         label: "border-lime-100",         labelEn: "Loose Leaf",  labelTh: "ใบชา"     },
  presenters:  { dot: "bg-rose-700",         label: "border-rose-100",         labelEn: "Gift Set",    labelTh: "กล่องชา"   },
};

export function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const t = getTranslations(locale).products;
  const name = locale === "th" ? product.nameTh : product.nameEn;
  const description = locale === "th" ? product.shortDescriptionTh : product.shortDescriptionEn;
  const isEn = locale === "en";
  const productUrl = `/${locale}/products/${product.id}`;
  const inquireUrl = `/${locale}?product=${encodeURIComponent(product.id)}#contact`;
  const hasImage = product.image && !product.image.includes("placeholder");
  void isEn; // used below

  // Hide description if it only repeats the bag count info (boilerplate)
  const isBoilerplateDesc =
    /Magic-knot/.test(product.shortDescriptionEn) ||
    /ย่อยสลายได้/.test(product.shortDescriptionTh) ||
    /^Loose leaf\. \d/.test(product.shortDescriptionEn);
  const showDescription = description && !isBoilerplateDesc;

  const catStyle = categoryStyles[product.category] ?? categoryStyles.classic;

  // Basket item payload
  const basketItem = {
    id: product.id,
    nameEn: product.nameEn,
    nameTh: product.nameTh,
    image: product.image,
    category: product.category,
  };

  return (
    <article className="group flex flex-col rounded-sm border border-stone-200 bg-white overflow-hidden hover:border-rakura-gold hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      {/* Category colour dot + label */}
      <div className={`flex items-center gap-1.5 px-3 pt-2.5 pb-0`}>
        <span className={`w-2 h-2 rounded-full shrink-0 ${catStyle.dot}`} />
        <span className="text-[9px] tracking-widest uppercase font-semibold text-stone-400">
          {isEn ? catStyle.labelEn : catStyle.labelTh}
        </span>
      </div>

      {/* Clickable image → product detail */}
      <Link href={productUrl} className="block">
        <div className="aspect-[3/4] relative bg-stone-50 overflow-hidden mt-1">
          {hasImage ? (
            <Image
              src={product.image!}
              alt={name}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-500 p-3"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-stone-300 font-display font-bold text-lg tracking-widest">RAKURA</span>
            </div>
          )}
          {/* Hover overlay: tasting note */}
          {product.tastingNoteEn && (
            <div className="absolute inset-0 bg-rakura-dark/92 flex flex-col items-center justify-center p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-xs tracking-widest uppercase text-rakura-gold mb-3 font-semibold">
                {locale === "th" ? "รสชาติ" : "Tasting Note"}
              </p>
              <p className="text-white text-xs text-center leading-relaxed italic">
                {locale === "th" ? product.tastingNoteTh : product.tastingNoteEn}
              </p>
              {product.origin && (
                <p className="text-white/40 text-xs mt-4 tracking-wide text-center">
                  {product.origin}
                </p>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* Card body */}
      <div className="px-4 pt-3 pb-4 flex flex-col flex-1 border-t border-stone-100">
        <Link href={productUrl} className="block">
          <h3 className="font-semibold text-stone-800 text-sm leading-snug group-hover:text-rakura-gold transition-colors">
            {name}
          </h3>
          {product.bagCount != null && (
            <p className="text-xs text-rakura-gold mt-1 tracking-wide font-medium">{product.bagCount} {t.bags}</p>
          )}
          {product.weight != null && (
            <p className="text-xs text-rakura-gold mt-1 tracking-wide font-medium">{product.weight}</p>
          )}
          {showDescription && (
            <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">{description}</p>
          )}
        </Link>

        {/* Action buttons */}
        <div className="mt-auto pt-3 flex gap-2">
          <Link
            href={inquireUrl}
            className="flex-1 inline-flex items-center justify-center text-xs font-semibold tracking-wider uppercase border border-rakura-gold text-rakura-gold px-3 py-2 hover:bg-rakura-gold hover:text-white transition-all duration-200"
          >
            {t.inquire}
          </Link>
          <AddToBasketButton item={basketItem} locale={locale} compact />
        </div>
      </div>
    </article>
  );
}
