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
              <Image
                src="/assets/logo-transparent.png"
                alt="Rakura"
                width={120}
                height={36}
                className="h-9 w-auto object-contain opacity-90"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <p className="font-display font-bold text-white text-xl tracking-wide">Rakura</p>
            )}
            <p className="text-sm mt-1">{t.talkTea}</p>
            <p className="text-sm mt-2">{contact.tagline}</p>
          </div>
          <div>
            <p className="font-semibold text-white">{t.contact}</p>
            <div className="mt-3 space-y-1.5 text-sm">
              {contact.thailand.agents.map((agent) => (
                <div key={agent.name}>
                  <span className="text-stone-300 font-medium">{agent.name}</span>
                  <span className="text-stone-500 text-xs ml-1.5">({agent.languages})</span>
                  <a href={`tel:${agent.phone.replace(/\s/g, "")}`} className="block text-rakura-gold-light hover:underline transition-opacity hover:opacity-90 text-sm">
                    {agent.phone}
                  </a>
                </div>
              ))}
              <a
                href={`mailto:${contact.thailand.email}`}
                className="block text-rakura-gold-light hover:underline mt-2 transition-opacity hover:opacity-90"
              >
                {contact.thailand.email}
              </a>
            </div>
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
