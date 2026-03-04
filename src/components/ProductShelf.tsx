"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import type { Locale } from "@/lib/i18n";

// Matches categoryStyles in ProductCard
const categoryDot: Record<string, string> = {
  collections: "bg-rakura-gold",
  classic:     "bg-amber-600",
  superHerbs:  "bg-emerald-600",
  selections:  "bg-teal-600",
  looseLeaf:   "bg-lime-600",
  presenters:  "bg-rose-700",
};

export function ProductShelf({
  products,
  locale,
  label,
}: {
  products: Product[];
  locale: Locale;
  label?: string;
}) {
  if (products.length === 0) return null;
  const isEn = locale === "en";

  return (
    <div className="mb-2">
      {/* Row header */}
      {label && (
        <div className="flex items-center justify-between mb-4 px-0">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-rakura-muted">
            {label}
          </p>
          <span className="text-[10px] text-rakura-muted/50 flex items-center gap-1">
            {isEn ? "Scroll to explore" : "เลื่อนดูเพิ่มเติม"}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      )}

      {/* Scroll rail — extends edge-to-edge on mobile */}
      <div className="relative -mx-4 sm:-mx-6">
        {/* Right-edge fade mask */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory pb-3
                        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                        px-4 sm:px-6">
          {products.map((product) => {
            const name = isEn ? product.nameEn : product.nameTh;
            const tastingNote = isEn ? product.tastingNoteEn : product.tastingNoteTh;
            const dot = categoryDot[product.category] ?? "bg-stone-400";
            const hasImage = product.image && !product.image.includes("placeholder");

            return (
              <Link
                key={product.id}
                href={`/${locale}/products/${product.id}`}
                className="snap-start shrink-0 w-36 sm:w-44 md:w-52 group"
              >
                {/* Image tile */}
                <div className="aspect-[3/4] relative bg-stone-50 overflow-hidden border border-stone-200 group-hover:border-rakura-gold/50 transition-colors duration-300">
                  {/* Category colour dot */}
                  <div className={`absolute top-2 left-2 z-10 w-2 h-2 rounded-full ${dot} shadow-sm`} />

                  {hasImage ? (
                    <Image
                      src={product.image!}
                      alt={name}
                      fill
                      className="object-contain p-3 group-hover:scale-[1.06] transition-transform duration-500"
                      sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 208px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-stone-300 font-display font-bold tracking-widest text-xs">RAKURA</span>
                    </div>
                  )}

                  {/* Tasting note hover overlay */}
                  {tastingNote && (
                    <div className="absolute inset-0 bg-rakura-dark/93 flex flex-col items-center justify-center p-4
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-[8px] tracking-widest uppercase text-rakura-gold mb-2">
                        {isEn ? "Tasting Note" : "รสชาติ"}
                      </p>
                      <p className="text-white text-[11px] text-center italic leading-relaxed">
                        {tastingNote}
                      </p>
                      {product.origin && (
                        <p className="text-white/40 text-[9px] mt-3 tracking-wide text-center">
                          {product.origin}
                        </p>
                      )}
                    </div>
                  )}

                  {/* "View →" slide-up on hover */}
                  <div className="absolute bottom-0 inset-x-0 bg-rakura-gold/90 px-3 py-2
                                  translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-rakura-dark text-[9px] tracking-widest uppercase font-bold text-center">
                      {isEn ? "View →" : "ดูเพิ่ม →"}
                    </p>
                  </div>
                </div>

                {/* Name + count below the tile */}
                <div className="pt-2.5">
                  <p className="text-[11px] font-semibold text-stone-800 leading-snug
                                group-hover:text-rakura-gold transition-colors line-clamp-2">
                    {name}
                  </p>
                  {product.bagCount != null && (
                    <p className="text-[10px] text-rakura-gold/80 mt-0.5 font-medium">
                      {product.bagCount} {isEn ? "bags" : "ซอง"}
                    </p>
                  )}
                  {product.weight != null && (
                    <p className="text-[10px] text-rakura-gold/80 mt-0.5 font-medium">
                      {product.weight}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}

          {/* End spacer so last card clears the fade mask */}
          <div className="shrink-0 w-10 sm:w-16" />
        </div>

        {/* Thin decorative scroll rail */}
        <div className="mx-4 sm:mx-6 mt-1 h-px bg-stone-200" />
      </div>
    </div>
  );
}
