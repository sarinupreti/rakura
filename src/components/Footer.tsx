"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { contact } from "@/data/contact";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/data/translations";

export function Footer({ locale }: { locale: Locale }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const t = getTranslations(locale).footer;
  const base = `/${locale}`;

  return (
    <footer className="bg-stone-900 text-stone-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            {!logoFailed ? (
              <span className="inline-block h-7 [&_img]:h-7 [&_img]:w-auto [&_img]:object-contain">
                <Image
                  src="/assets/logo.png"
                  alt="Rakura"
                  width={100}
                  height={28}
                  className="brightness-0 invert opacity-90"
                  onError={() => setLogoFailed(true)}
                />
              </span>
            ) : (
              <p className="font-semibold text-white text-lg">Rakura</p>
            )}
            <p className="text-sm mt-1">{t.talkTea}</p>
            <p className="text-sm mt-2">{contact.tagline}</p>
          </div>
          <div>
            <p className="font-semibold text-white">{t.contact}</p>
            <p className="text-sm mt-2">{contact.regional.address}</p>
            <p className="text-sm">{contact.regional.phone}</p>
            <p className="text-sm mt-2">{contact.headOffice.address}</p>
            <p className="text-sm">{contact.headOffice.phone}</p>
            <a
              href={`mailto:${contact.email}`}
              className="text-rakura-gold-light hover:underline text-sm mt-2 inline-block transition-opacity hover:opacity-90"
            >
              {contact.email}
            </a>
          </div>
          <div>
            <p className="font-semibold text-white">{t.follow}</p>
            <div className="flex gap-4 mt-3">
              <a
                href={process.env.NEXT_PUBLIC_LINE_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-rakura-gold-light hover:underline transition-opacity hover:opacity-90"
              >
                Line
              </a>
              <a
                href={process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/66"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-rakura-gold-light hover:underline transition-opacity hover:opacity-90"
              >
                WhatsApp
              </a>
            </div>
            <Link href={`${base}#contact`} className="text-sm text-rakura-gold-light hover:underline mt-2 inline-block transition-opacity hover:opacity-90">
              {locale === "th" ? "ติดต่อเรา" : "Contact"}
            </Link>
          </div>
        </div>
        <p className="text-center text-stone-500 text-sm mt-8">
          TM and © {new Date().getFullYear()} Rakura. {t.rights}
        </p>
      </div>
    </footer>
  );
}
