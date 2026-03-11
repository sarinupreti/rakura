"use client";

import { useEffect, useState, useCallback } from "react";

export function WishlistButton({ productId }: { productId: string }) {
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const wishlist: string[] = JSON.parse(localStorage.getItem("rakura-wishlist") || "[]");
    setSaved(wishlist.includes(productId));
    setMounted(true);
  }, [productId]);

  const toggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const wishlist: string[] = JSON.parse(localStorage.getItem("rakura-wishlist") || "[]");
    let next: string[];
    if (wishlist.includes(productId)) {
      next = wishlist.filter((id) => id !== productId);
    } else {
      next = [...wishlist, productId];
    }
    localStorage.setItem("rakura-wishlist", JSON.stringify(next));
    setSaved(next.includes(productId));
  }, [productId]);

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
      title={saved ? "Remove from wishlist" : "Save for later"}
      className={`absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200 ${
        saved ? "bg-red-500 text-white shadow-sm" : "bg-white/80 text-stone-400 hover:text-red-400 hover:bg-white"
      }`}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
