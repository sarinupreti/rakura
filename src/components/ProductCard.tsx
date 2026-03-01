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
    <article className="group rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-soft hover:shadow-soft-lg hover:border-rakura-gold/40 hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="aspect-square bg-stone-100 relative flex items-center justify-center overflow-hidden">
        {hasImage ? (
          <Image
            src={product.image!}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <span className="text-rakura-muted font-medium">Rakura</span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-foreground group-hover:text-rakura-gold transition-colors">{name}</h3>
        {product.bagCount != null && (
          <p className="text-sm text-rakura-muted mt-1">
            {product.bagCount} {t.bags}
          </p>
        )}
        {product.weight != null && (
          <p className="text-sm text-rakura-muted mt-1">
            {t.weight}: {product.weight}
          </p>
        )}
        <p className="text-sm text-rakura-muted mt-2 line-clamp-2">{description}</p>
        <Link
          href={inquireUrl}
          className="mt-4 inline-flex items-center justify-center rounded-xl border-2 border-rakura-gold text-rakura-gold font-medium px-4 py-2.5 text-sm hover:bg-rakura-gold/10 hover:shadow-gold transition-all duration-200 w-full sm:w-auto hover:scale-[1.02] active:scale-[0.98]"
        >
          {t.inquire}
        </Link>
      </div>
    </article>
  );
}
