"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { localeNames } from "@/lib/i18n";
import { getTranslations } from "@/data/translations";
import { useBasket } from "@/contexts/BasketContext";

type NavKey = "home" | "products" | "ourStory" | "sustainability" | "contact" | "quiz" | "hospitality";

interface NavLink {
  key: NavKey;
  anchor: string | null;
  page: string | null;
}

const navLinks: NavLink[] = [
  { key: "home", anchor: null, page: null },
  { key: "products", anchor: "products", page: null },
  { key: "ourStory", anchor: "story", page: null },
  { key: "sustainability", anchor: "sustainability", page: null },
  { key: "contact", anchor: "contact", page: null },
  { key: "quiz", anchor: null, page: "quiz" },
  { key: "hospitality", anchor: null, page: "hospitality" },
];

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [logoFailed, setLogoFailed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = getTranslations(locale).nav;
  const base = `/${locale}`;
  const { count } = useBasket();

  return (
    <header className="sticky top-0 z-50 bg-rakura-dark/95 backdrop-blur-md border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href={base}
          className="font-semibold text-xl text-foreground tracking-tight flex items-center gap-2 min-h-[2rem] transition-opacity hover:opacity-75"
        >
          {!logoFailed ? (
            <Image
              src="/assets/logo-transparent.png"
              alt="Rakura"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <span className="font-display font-bold tracking-wide text-white">Rakura</span>
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map(({ key, anchor, page }) => {
            const path = page
              ? `${base}/${page}`
              : anchor
              ? `${base}#${anchor}`
              : base;

            const isHome = key === "home";
            const active = page
              ? pathname.includes(`/${page}`)
              : isHome && (pathname === base || pathname === `${base}/`);

            return (
              <Link
                key={key}
                href={path}
                className={`text-xs font-medium tracking-wide transition-colors duration-200 ${
                  active ? "text-rakura-gold" : "text-white/70 hover:text-white"
                }`}
              >
                {key === "quiz" ? `🍵 ${t[key]}` : t[key]}
              </Link>
            );
          })}
        </nav>

        {/* Right utilities */}
        <div className="flex items-center gap-3">
          {/* Search icon */}
          <Link
            href={`${base}/search`}
            title={locale === "en" ? "Search" : "ค้นหา"}
            className="flex items-center justify-center w-8 h-8 text-white/70 hover:text-white transition-colors"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </Link>

          {/* Basket icon */}
          <Link
            href={`${base}/basket`}
            title={t.basket}
            className="relative flex items-center justify-center w-8 h-8 text-white/70 hover:text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-rakura-gold text-rakura-dark text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Link>

          <LocaleSwitcher locale={locale} pathname={pathname} />

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden flex flex-col gap-1.5 p-2 text-white/70 hover:text-white"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-5 bg-current transition-transform duration-200 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition-transform duration-200 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-rakura-dark">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map(({ key, anchor, page }) => {
              const path = page
                ? `${base}/${page}`
                : anchor
                ? `${base}#${anchor}`
                : base;
              return (
                <Link
                  key={key}
                  href={path}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  {key === "quiz" ? `🍵 ${t[key]}` : t[key]}
                </Link>
              );
            })}
            <Link
              href={`${base}/basket`}
              onClick={() => setMobileOpen(false)}
              className="py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors flex items-center gap-2"
            >
              🛒 {t.basket}
              {count > 0 && (
                <span className="bg-rakura-gold text-rakura-dark text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {count}
                </span>
              )}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function LocaleSwitcher({ locale, pathname }: { locale: Locale; pathname: string }) {
  const otherLocale = locale === "th" ? "en" : "th";
  const pathWithoutLocale = pathname.replace(/^\/th|\/en/, "") || "/";
  const newPath = `/${otherLocale}${pathWithoutLocale}`;

  return (
    <Link
      href={newPath}
      className="text-xs font-semibold tracking-widest uppercase text-rakura-gold hover:text-rakura-gold-light transition-colors border border-rakura-gold/40 hover:border-rakura-gold rounded px-2.5 py-1"
      aria-label={`Switch to ${localeNames[otherLocale]}`}
    >
      {localeNames[otherLocale]}
    </Link>
  );
}
