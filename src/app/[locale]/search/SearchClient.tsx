"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { products, productCategories, type ProductCategory } from "@/data/products";
import { AddToBasketButton } from "@/components/AddToBasketButton";
import type { Locale } from "@/lib/i18n";

const categoryLabels: Record<
  ProductCategory | "all",
  { en: string; th: string }
> = {
  all:         { en: "All", th: "ทั้งหมด" },
  collections: { en: "Collections", th: "คอลเลกชัน" },
  classic:     { en: "Classic", th: "คลาสสิก" },
  superHerbs:  { en: "Super Herbs", th: "ซูเปอร์เฮิร์บ" },
  selections:  { en: "Selections", th: "ชุดชา" },
  looseLeaf:   { en: "Loose Leaf", th: "ใบชาแบบหลวม" },
  presenters:  { en: "Presenters", th: "กล่องชา" },
};

interface Props {
  locale: Locale;
}

export function SearchClient({ locale }: Props) {
  const isEn = locale === "en";
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory =
        activeCategory === "all" || p.category === activeCategory;

      if (!matchesCategory) return false;
      if (!q) return true;

      const haystack = [
        p.nameEn,
        p.nameTh,
        p.shortDescriptionEn,
        p.shortDescriptionTh,
        p.tastingNoteEn ?? "",
        p.tastingNoteTh ?? "",
        p.origin ?? "",
        p.category,
        p.teaType ?? "",
      ]
        .join(" ")
        .toLowerCase();

      // Support multi-word: all words must appear somewhere
      return q.split(/\s+/).every((word) => haystack.includes(word));
    });
  }, [query, activeCategory]);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* ── Search hero bar ── */}
      <div className="border-b border-foreground/10 bg-background sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="relative">
            {/* Search icon */}
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-rakura-muted pointer-events-none"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>

            <input
              ref={inputRef}
              type="search"
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                isEn
                  ? "Search teas, flavours, origins…"
                  : "ค้นหาชา รสชาติ แหล่งที่มา…"
              }
              className="w-full pl-11 pr-10 py-3.5 bg-stone-50 dark:bg-white/5 border border-foreground/10 focus:border-rakura-gold text-foreground placeholder-rakura-muted text-sm focus:outline-none transition-colors"
            />

            {/* Clear button */}
            {hasQuery && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-rakura-muted hover:text-foreground transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category filter pills */}
          <div className="flex gap-1.5 mt-3 overflow-x-auto pb-0.5 [scrollbar-width:none]">
            {(["all", ...productCategories] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-3 py-1 text-[10px] font-semibold tracking-wider uppercase transition-all duration-150 ${
                  activeCategory === cat
                    ? "bg-rakura-gold text-rakura-dark"
                    : "border border-foreground/15 text-rakura-muted hover:border-rakura-gold hover:text-foreground"
                }`}
              >
                {isEn ? categoryLabels[cat].en : categoryLabels[cat].th}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Result count */}
        <p className="text-[10px] font-semibold tracking-widest uppercase text-rakura-muted mb-6">
          {hasQuery
            ? isEn
              ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`
              : `พบ ${results.length} รายการสำหรับ "${query}"`
            : isEn
              ? `${results.length} teas`
              : `${results.length} รายการ`}
        </p>

        {results.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🍃</p>
            <p className="font-semibold text-foreground mb-2">
              {isEn ? "No teas found" : "ไม่พบชาที่ค้นหา"}
            </p>
            <p className="text-rakura-muted text-sm">
              {isEn
                ? "Try a different keyword or browse by category."
                : "ลองคำค้นหาอื่น หรือเลือกหมวดหมู่ด้านบน"}
            </p>
            <button
              type="button"
              onClick={() => { setQuery(""); setActiveCategory("all"); }}
              className="mt-6 text-xs font-semibold tracking-wider uppercase text-rakura-gold border border-rakura-gold/40 px-6 py-2.5 hover:bg-rakura-gold/10 transition-colors"
            >
              {isEn ? "Clear Filters" : "ล้างตัวกรอง"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {results.map((product) => {
              const name = isEn ? product.nameEn : product.nameTh;
              const desc = isEn
                ? product.shortDescriptionEn
                : product.shortDescriptionTh;
              const hasImage =
                product.image && !product.image.includes("placeholder");

              return (
                <div key={product.id} className="flex flex-col">
                  <Link
                    href={`/${locale}/products/${product.id}`}
                    className="group block flex-1"
                  >
                    {/* Image */}
                    <div className="aspect-[3/4] relative bg-stone-50 dark:bg-stone-900 rounded-sm overflow-hidden border border-stone-200 dark:border-white/10 mb-3 group-hover:border-rakura-gold/40 transition-colors duration-200">
                      {hasImage ? (
                        <Image
                          src={product.image!}
                          alt={name}
                          fill
                          className="object-contain p-5 group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-stone-300 dark:text-white/20 font-display font-bold text-xs tracking-widest">
                            RAKURA
                          </span>
                        </div>
                      )}

                      {/* Category badge */}
                      <div className="absolute bottom-2 left-2">
                        <span className="text-[9px] font-semibold tracking-widest uppercase bg-rakura-dark/70 text-white/80 px-2 py-0.5 rounded-sm">
                          {isEn
                            ? categoryLabels[product.category].en
                            : categoryLabels[product.category].th}
                        </span>
                      </div>
                    </div>

                    {/* Text */}
                    <p className="text-xs font-semibold text-foreground leading-snug line-clamp-2 mb-1 group-hover:text-rakura-gold transition-colors duration-200">
                      {name}
                    </p>
                    {product.bagCount && (
                      <p className="text-[10px] text-rakura-gold font-medium mb-0.5">
                        {product.bagCount} {isEn ? "bags" : "ซอง"}
                      </p>
                    )}
                    {product.weight && (
                      <p className="text-[10px] text-rakura-gold font-medium mb-0.5">
                        {product.weight}
                      </p>
                    )}
                    <p className="text-[10px] text-rakura-muted line-clamp-1">
                      {desc}
                    </p>
                  </Link>

                  {/* Quick-add to basket */}
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
        )}
      </div>
    </div>
  );
}
