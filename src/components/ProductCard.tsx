import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/data/translations";

export function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const t = getTranslations(locale).products;
  const name = locale === "th" ? product.nameTh : product.nameEn;
  const description = locale === "th" ? product.shortDescriptionTh : product.shortDescriptionEn;
  const isEn = locale === "en";
  const productUrl = `/${locale}/products/${product.id}`;
  const inquireUrl = `/${locale}?product=${encodeURIComponent(product.id)}#contact`;
  const hasImage = product.image && !product.image.includes("placeholder");

  // Hide description if it only repeats the bag count info (boilerplate)
  const isBoilerplateDesc =
    /Magic-knot/.test(product.shortDescriptionEn) ||
    /ย่อยสลายได้/.test(product.shortDescriptionTh) ||
    /^Loose leaf\. \d/.test(product.shortDescriptionEn);
  const showDescription = description && !isBoilerplateDesc;

  return (
    <article className="group flex flex-col rounded-sm border border-stone-200 bg-white overflow-hidden hover:border-rakura-gold hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      {/* Product image */}
      <div className="aspect-[3/4] relative bg-stone-50 overflow-hidden">
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

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1 border-t border-stone-100">
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
        <div className="mt-4 flex gap-2">
          <Link
            href={productUrl}
            className="flex-1 inline-flex items-center justify-center text-xs font-semibold tracking-wider uppercase border border-stone-200 text-stone-600 px-3 py-2 hover:border-rakura-gold hover:text-rakura-gold transition-all duration-200"
          >
            {isEn ? "Details" : "รายละเอียด"}
          </Link>
          <Link
            href={inquireUrl}
            className="flex-1 inline-flex items-center justify-center text-xs font-semibold tracking-wider uppercase border border-rakura-gold text-rakura-gold px-3 py-2 hover:bg-rakura-gold hover:text-white transition-all duration-200"
          >
            {t.inquire}
          </Link>
        </div>
      </div>
    </article>
  );
}
