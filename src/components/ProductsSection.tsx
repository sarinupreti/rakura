"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/data/translations";
import {
  products,
  productCategories,
  getFeaturedProducts,
  getProductsByCategory,
  type ProductCategory,
} from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductShelf } from "@/components/ProductShelf";
import { AnimateOnView } from "@/components/AnimateOnView";
import { TiltCard } from "@/components/TiltCard";

const categoryKeys: Record<
  ProductCategory,
  "collections" | "classic" | "superHerbs" | "selections" | "looseLeaf" | "presenters"
> = {
  collections: "collections",
  classic:     "classic",
  superHerbs:  "superHerbs",
  selections:  "selections",
  looseLeaf:   "looseLeaf",
  presenters:  "presenters",
};

export function ProductsSection({ locale }: { locale: Locale }) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const t = getTranslations(locale).products;
  const isEn = locale === "en";

  // Products shown in the vertical grid
  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Products shown in the horizontal shelf:
  // "all"  → flagship collections as a curated preview
  // other  → that category's products
  const shelfProducts = useMemo(() => {
    if (activeCategory === "all") return getFeaturedProducts();
    return getProductsByCategory(activeCategory);
  }, [activeCategory]);

  const shelfLabel =
    activeCategory === "all"
      ? isEn ? "Featured Collection" : "คอลเลกชันแนะนำ"
      : isEn
        ? `Browse ${t[categoryKeys[activeCategory]]}`
        : `เลือกดู ${t[categoryKeys[activeCategory]]}`;

  const productCountLabel =
    activeCategory === "all"
      ? isEn ? `${products.length} teas` : `${products.length} รายการ`
      : isEn
        ? `${filteredProducts.length} ${t[categoryKeys[activeCategory]]} teas`
        : `${filteredProducts.length} รายการ`;

  return (
    <section id="products" className="py-20 sm:py-28 px-4 bg-background scroll-mt-16">
      <div className="max-w-7xl mx-auto">

        {/* ── Section header ── */}
        <header className="mb-10">
          <AnimateOnView animation="fade-in-up">
            <p className="eyebrow mb-3">{isEn ? "Full Range" : "ผลิตภัณฑ์ทั้งหมด"}</p>
            <h2 className="font-display font-bold text-foreground text-3xl sm:text-4xl section-heading">
              {t.title}
            </h2>
            <p className="mt-4 text-rakura-muted">{t.subtitle}</p>
          </AnimateOnView>
        </header>

        {/* ── Category tabs ── */}
        <AnimateOnView animation="fade-in-up" delay={60}>
          <div className="flex flex-wrap gap-2 mb-8 border-b border-foreground/10 pb-5">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                activeCategory === "all"
                  ? "bg-rakura-gold text-rakura-dark"
                  : "border border-foreground/20 text-rakura-muted hover:border-rakura-gold hover:text-foreground"
              }`}
            >
              {isEn ? "All" : "ทั้งหมด"}
            </button>
            {productCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-rakura-gold text-rakura-dark"
                    : "border border-foreground/20 text-rakura-muted hover:border-rakura-gold hover:text-foreground"
                }`}
              >
                {t[categoryKeys[cat]]}
              </button>
            ))}
          </div>
        </AnimateOnView>

        {/* ── Horizontal shelf — only shown for "All" to avoid repeating the filtered grid ── */}
        {activeCategory === "all" && (
          <AnimateOnView animation="fade-in-up" delay={100}>
            <ProductShelf
              products={shelfProducts}
              locale={locale}
              label={shelfLabel}
            />
          </AnimateOnView>
        )}

        {/* ── Divider with product count ── */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-foreground/10" />
          <p className="text-[10px] tracking-widest uppercase text-rakura-muted font-semibold shrink-0">
            {productCountLabel}
          </p>
          <div className="flex-1 h-px bg-foreground/10" />
        </div>

        {/* ── Stagger grid ── key on activeCategory so cards re-animate on tab switch */}
        <div
          key={activeCategory}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5"
        >
          {filteredProducts.map((product, i) => (
            // Stagger delay resets per row of 5 so each visible row animates independently
            <AnimateOnView
              key={product.id}
              animation="fade-in-up"
              delay={(i % 5) * 60}
              className="h-full"
            >
              <TiltCard className="h-full">
                <ProductCard product={product} locale={locale} />
              </TiltCard>
            </AnimateOnView>
          ))}
        </div>

      </div>
    </section>
  );
}
