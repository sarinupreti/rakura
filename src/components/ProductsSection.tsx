"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/data/translations";
import { products, productCategories, type ProductCategory } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { AnimateOnView } from "@/components/AnimateOnView";

const categoryKeys: Record<
  ProductCategory,
  "collections" | "classic" | "superHerbs" | "selections" | "looseLeaf" | "presenters"
> = {
  collections: "collections",
  classic: "classic",
  superHerbs: "superHerbs",
  selections: "selections",
  looseLeaf: "looseLeaf",
  presenters: "presenters",
};

export function ProductsSection({ locale }: { locale: Locale }) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const t = getTranslations(locale).products;

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="products" className="py-20 sm:py-28 px-4 bg-background scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <AnimateOnView animation="fade-in-up">
            <p className="eyebrow mb-3">{locale === "th" ? "ผลิตภัณฑ์ทั้งหมด" : "Full Range"}</p>
            <h2 className="font-display font-bold text-foreground text-3xl sm:text-4xl section-heading">{t.title}</h2>
            <p className="mt-4 text-rakura-muted">{t.subtitle}</p>
          </AnimateOnView>
        </header>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-foreground/10 dark:border-white/10 pb-5">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
              activeCategory === "all"
                ? "bg-rakura-gold text-rakura-dark"
                : "border border-foreground/20 dark:border-white/20 text-rakura-muted hover:border-rakura-gold hover:text-foreground"
            }`}
          >
            {locale === "th" ? "ทั้งหมด" : "All"}
          </button>
          {productCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-rakura-gold text-rakura-dark"
                  : "border border-foreground/20 dark:border-white/20 text-rakura-muted hover:border-rakura-gold hover:text-foreground"
              }`}
            >
              {t[categoryKeys[cat]]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
