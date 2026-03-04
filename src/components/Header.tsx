"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { localeNames } from "@/lib/i18n";
import { getTranslations } from "@/data/translations";

const navLinks = [
  { href: "/", key: "home" as const, anchor: null },
  { href: "/products", key: "products" as const, anchor: "products" },
  { href: "/story", key: "ourStory" as const, anchor: "story" },
  { href: "/sustainability", key: "sustainability" as const, anchor: "sustainability" },
  { href: "/contact", key: "contact" as const, anchor: "contact" },
];

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [logoFailed, setLogoFailed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = getTranslations(locale).nav;
  const base = `/${locale}`;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-foreground/10 shadow-sm">
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
            <span className="font-display font-bold tracking-wide">Rakura</span>
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, key, anchor }) => {
            const path = anchor ? `${base}#${anchor}` : base;
            const isHome = href === "/";
            const active = isHome && (pathname === base || pathname === `${base}/`);
            return (
              <Link
                key={key}
                href={path}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  active
                    ? "text-rakura-gold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {t[key]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <LocaleSwitcher locale={locale} pathname={pathname} />
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden flex flex-col gap-1.5 p-2 text-foreground/70 hover:text-foreground"
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
        <div className="md:hidden border-t border-foreground/10 bg-background/98">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map(({ href, key, anchor }) => {
              const path = anchor ? `${base}#${anchor}` : base;
              return (
                <Link
                  key={key}
                  href={path}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  {t[key]}
                </Link>
              );
            })}
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
