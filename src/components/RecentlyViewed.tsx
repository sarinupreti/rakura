"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { products, type Product } from "@/data/products";
import { AnimateOnView } from "@/components/AnimateOnView";
import { AddToBasketButton } from "@/components/AddToBasketButton";

const STORAGE_KEY = "rakura-recently-viewed";
const MAX_ITEMS = 6;

interface Props {
  currentProductId: string;
  locale: string;
}

/**
 * Horizontal strip of recently viewed products (persisted in localStorage).
 * - On mount: loads the list, prepends the current product, trims to MAX_ITEMS, saves back.
 * - Renders a snap-scroll row of up to 5 products (excluding the current page product).
 */
export function RecentlyViewed({ currentProductId, locale }: Props) {
  const [recent, setRecent] = useState<Product[]>([]);
  const isEn = locale === "en";

  useEffect(() => {
    try {
      const stored: string[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? "[]"
      );

      // Prepend current, deduplicate, limit
      const updated = [
        currentProductId,
        ...stored.filter((id) => id !== currentProductId),
      ].slice(0, MAX_ITEMS);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      // Resolve product objects (exclude current page product)
      const resolved = updated
        .filter((id) => id !== currentProductId)
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p));

      setRecent(resolved);
    } catch {
      // Fail silently if localStorage is unavailable (SSR, incognito limits)
    }
  }, [currentProductId]);

  if (recent.length === 0) return null;

  return (
    <AnimateOnView animation="fade-in-up" delay={80}>
      <div className="mt-12 border-t border-foreground/10 pt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-semibold text-foreground text-lg">
            {isEn ? "Recently Viewed" : "ที่ดูล่าสุด"}
          </h2>
          <Link
            href={`/${locale}#products`}
            className="text-xs text-rakura-muted hover:text-foreground transition-colors tracking-wider uppercase font-semibold"
          >
            {isEn ? "All Products →" : "ดูทั้งหมด →"}
          </Link>
        </div>

        {/* Snap scroll row */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {recent.map((product, i) => {
            const name = isEn ? product.nameEn : product.nameTh;
            const desc = isEn
              ? product.shortDescriptionEn
              : product.shortDescriptionTh;
            const hasImage =
              product.image && !product.image.includes("placeholder");

            return (
              <div
                key={product.id}
                className="snap-start shrink-0 w-36 sm:w-44"
              >
                <Link
                  href={`/${locale}/products/${product.id}`}
                  className="group block"
                >
                  {/* Image tile */}
                  <div className="aspect-[3/4] relative bg-stone-50 dark:bg-stone-900 rounded-sm overflow-hidden border border-stone-200 dark:border-white/10 mb-2.5 group-hover:border-rakura-gold/40 transition-colors duration-200">
                    {hasImage ? (
                      <Image
                        src={product.image!}
                        alt={name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        sizes="176px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-stone-300 dark:text-white/20 font-display font-bold text-xs tracking-widest">
                          RAKURA
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <p className="text-xs font-semibold text-foreground leading-snug line-clamp-2 mb-1 group-hover:text-rakura-gold transition-colors duration-200">
                    {name}
                  </p>
                  <p className="text-[10px] text-rakura-muted leading-snug line-clamp-1">
                    {desc}
                  </p>
                </Link>

                {/* Quick add */}
                <div className="mt-2">
                  <AddToBasketButton
                    item={{
                      id: product.id,
                      nameEn: product.nameEn,
                      nameTh: product.nameTh,
                      image: product.image,
                      category: product.category,
                    }}
                    locale={locale}
                    compact
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AnimateOnView>
  );
}
