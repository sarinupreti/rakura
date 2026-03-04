"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AddToBasketButton } from "@/components/AddToBasketButton";
import type { BasketItem } from "@/contexts/BasketContext";

interface Props {
  product: BasketItem & { image?: string };
  locale: string;
  inquireUrl: string;
  /** ID of the sentinel element to observe — should be placed just below the page CTAs */
  sentinelId?: string;
}

/**
 * Fixed bottom bar that slides up when the main page CTAs scroll out of view.
 * Uses IntersectionObserver to track a sentinel element with the given sentinelId.
 */
export function StickyEnquiryBar({
  product,
  locale,
  inquireUrl,
  sentinelId = "enquiry-cta-sentinel",
}: Props) {
  const [visible, setVisible] = useState(false);
  const isEn = locale === "en";
  const name = isEn ? product.nameEn : product.nameTh;
  const hasImage = product.image && !product.image.includes("placeholder");

  useEffect(() => {
    const sentinel = document.getElementById(sentinelId);
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show bar when sentinel is NOT intersecting (CTAs scrolled away)
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [sentinelId]);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Safe-area padding for iOS home indicator */}
      <div className="bg-background border-t border-foreground/10 shadow-soft-lg">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3 sm:gap-5">

          {/* Product thumbnail */}
          {hasImage && (
            <div className="relative w-10 h-10 shrink-0 bg-stone-100 dark:bg-stone-800 rounded-sm overflow-hidden border border-stone-200 dark:border-white/10 hidden sm:block">
              <Image
                src={product.image!}
                alt={name}
                fill
                className="object-contain p-1"
                sizes="40px"
              />
            </div>
          )}

          {/* Name */}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-rakura-muted tracking-wide hidden sm:block">
              {isEn ? "Currently viewing" : "กำลังดู"}
            </p>
            <p className="text-sm font-semibold text-foreground truncate leading-tight">
              {name}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-2 shrink-0">
            <AddToBasketButton item={product} locale={locale} compact />

            <Link
              href={inquireUrl}
              className="inline-flex items-center justify-center bg-rakura-gold text-rakura-dark font-semibold text-xs tracking-wider uppercase py-2.5 px-5 hover:bg-rakura-gold-light transition-colors duration-200 whitespace-nowrap"
            >
              {isEn ? "Enquire →" : "สอบถาม →"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
