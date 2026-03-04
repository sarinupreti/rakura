import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/data/translations";

export function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const t = getTranslations(locale).products;
  const name = locale === "th" ? product.nameTh : product.nameEn;
  const description = locale === "th" ? product.shortDescriptionTh : product.shortDescriptionEn;
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
        <Link
          href={inquireUrl}
          className="mt-4 inline-flex items-center justify-center text-xs font-semibold tracking-wider uppercase border border-rakura-gold text-rakura-gold px-4 py-2 hover:bg-rakura-gold hover:text-white transition-all duration-200 w-full"
        >
          {t.inquire}
        </Link>
      </div>
    </article>
  );
}
