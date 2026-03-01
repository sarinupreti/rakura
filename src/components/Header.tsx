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
  const t = getTranslations(locale).nav;
  const base = `/${locale}`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200/80 shadow-soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link
          href={base}
          className="font-semibold text-xl text-foreground tracking-tight flex items-center gap-2 min-h-[2rem] transition-opacity hover:opacity-80"
        >
          {!logoFailed ? (
            <Image
              src="/assets/logo.png"
              alt="Rakura"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <span>Rakura</span>
          )}
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, key, anchor }) => {
            const path = anchor ? `${base}#${anchor}` : base;
            const isHome = href === "/";
            const active = isHome && (pathname === base || pathname === `${base}/`);
            return (
              <Link
                key={key}
                href={path}
                className={`text-sm font-medium transition-colors duration-200 underline-offset-4 ${
                  active ? "text-rakura-gold" : "text-rakura-muted hover:text-foreground hover:underline"
                }`}
              >
                {t[key]}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-4">
          <LocaleSwitcher locale={locale} pathname={pathname} />
        </div>
      </div>
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
      className="text-sm font-medium text-rakura-muted hover:text-foreground"
      aria-label={`Switch to ${localeNames[otherLocale]}`}
    >
      {localeNames[otherLocale]}
    </Link>
  );
}
