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
    <section id="products" className="py-16 px-4 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <AnimateOnView animation="fade-in-up">
            <h2 className="text-3xl font-bold text-foreground section-heading">{t.title}</h2>
            <p className="mt-2 text-rakura-muted">{t.subtitle}</p>
          </AnimateOnView>
        </header>

        <div className="flex flex-wrap gap-2 mb-10 border-b border-stone-200 pb-4">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeCategory === "all"
                ? "bg-rakura-gold text-white shadow-soft"
                : "bg-stone-100 text-rakura-muted hover:bg-stone-200 hover:text-foreground"
            }`}
          >
            {locale === "th" ? "ทั้งหมด" : "All"}
          </button>
          {productCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-rakura-gold text-white shadow-soft"
                  : "bg-stone-100 text-rakura-muted hover:bg-stone-200 hover:text-foreground"
              }`}
            >
              {t[categoryKeys[cat]]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
