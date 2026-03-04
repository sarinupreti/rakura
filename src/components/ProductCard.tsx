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

  return (
    <article className="group flex flex-col rounded-sm border border-foreground/10 dark:border-white/10 bg-background overflow-hidden hover:border-rakura-gold/50 hover:-translate-y-0.5 transition-all duration-300">
      {/* Product image */}
      <div className="aspect-[3/4] relative bg-stone-100 dark:bg-stone-900 overflow-hidden">
        {hasImage ? (
          <Image
            src={product.image!}
            alt={name}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-rakura-muted font-display font-bold text-lg tracking-widest opacity-30">RAKURA</span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1 border-t border-foreground/10 dark:border-white/10">
        <h3 className="font-semibold text-foreground text-sm leading-snug group-hover:text-rakura-gold transition-colors">
          {name}
        </h3>
        {product.bagCount != null && (
          <p className="text-xs text-rakura-muted mt-1">{product.bagCount} {t.bags}</p>
        )}
        {product.weight != null && (
          <p className="text-xs text-rakura-muted mt-1">{t.weight}: {product.weight}</p>
        )}
        <p className="text-xs text-rakura-muted mt-2 line-clamp-2 leading-relaxed">{description}</p>
        <Link
          href={inquireUrl}
          className="mt-4 inline-flex items-center justify-center text-xs font-semibold tracking-wider uppercase border border-rakura-gold text-rakura-gold px-4 py-2 hover:bg-rakura-gold hover:text-rakura-dark transition-all duration-200 w-full"
        >
          {t.inquire}
        </Link>
      </div>
    </article>
  );
}
