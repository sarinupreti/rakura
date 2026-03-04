"use client";

import { useState } from "react";
import { useBasket, type BasketItem } from "@/contexts/BasketContext";

interface Props {
  item: BasketItem;
  locale: string;
  compact?: boolean;
}

export function AddToBasketButton({ item, locale, compact = false }: Props) {
  const { addItem, removeItem, isInBasket } = useBasket();
  const [justAdded, setJustAdded] = useState(false);
  const inBasket = isInBasket(item.id);
  const isEn = locale === "en";

  function handleClick(e: React.MouseEvent) {
    e.preventDefault(); // don't follow card link if inside a Link
    e.stopPropagation();
    if (inBasket) {
      removeItem(item.id);
    } else {
      addItem(item);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    }
  }

  if (compact) {
    // Icon-only button for tighter layouts
    return (
      <button
        onClick={handleClick}
        title={
          inBasket
            ? isEn ? "Remove from enquiry basket" : "ลบออกจากตะกร้าสอบถาม"
            : isEn ? "Add to enquiry basket" : "เพิ่มในตะกร้าสอบถาม"
        }
        className={`flex items-center justify-center w-8 h-8 rounded-sm border transition-all duration-200 ${
          inBasket
            ? "border-rakura-gold bg-rakura-gold text-rakura-dark"
            : "border-stone-300 text-stone-400 hover:border-rakura-gold hover:text-rakura-gold"
        }`}
      >
        {justAdded ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            {inBasket ? (
              <path d="M9 12l2 2 4-4" />
            ) : (
              <path d="M12 10v4M10 12h4" />
            )}
          </svg>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wider uppercase px-4 py-2 border transition-all duration-200 ${
        inBasket
          ? "border-rakura-gold bg-rakura-gold text-rakura-dark"
          : "border-stone-300 text-stone-500 hover:border-rakura-gold hover:text-rakura-gold bg-transparent"
      }`}
    >
      {justAdded ? (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          {isEn ? "Added!" : "เพิ่มแล้ว!"}
        </>
      ) : inBasket ? (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          {isEn ? "In Basket" : "ในตะกร้า"}
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M12 10v4M10 12h4" />
          </svg>
          {isEn ? "Basket" : "ตะกร้า"}
        </>
      )}
    </button>
  );
}
