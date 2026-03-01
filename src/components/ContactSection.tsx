"use client";

import { Suspense, useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { AnimateOnView } from "@/components/AnimateOnView";
import { getTranslations } from "@/data/translations";
import { contact } from "@/data/contact";
import { getProductById } from "@/data/products";

function ContactFormInner({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");
  const product = productId ? getProductById(productId) : null;

  const t = getTranslations(locale).contact;
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    productInterest: product ? (locale === "th" ? product.nameTh : product.nameEn) : "",
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus("sending");
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setStatus("success");
          setFormData({ name: "", email: "", phone: "", message: "", productInterest: "" });
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    },
    [formData]
  );

  const lineUrl = process.env.NEXT_PUBLIC_LINE_URL || "#";
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/66";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <section>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1">
              {t.formName} *
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
              className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-foreground bg-white focus:ring-2 focus:ring-rakura-gold/50 focus:border-rakura-gold outline-none transition-shadow duration-200"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1">
              {t.formEmail} *
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
              className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-foreground bg-white focus:ring-2 focus:ring-rakura-gold/50 focus:border-rakura-gold outline-none transition-shadow duration-200"
            />
          </div>
          <div>
            <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground mb-1">
              {t.formPhone}
            </label>
            <input
              id="contact-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
              className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-foreground bg-white focus:ring-2 focus:ring-rakura-gold/50 focus:border-rakura-gold outline-none transition-shadow duration-200"
            />
          </div>
          <div>
            <label htmlFor="contact-productInterest" className="block text-sm font-medium text-foreground mb-1">
              {t.formProductInterest}
            </label>
            <input
              id="contact-productInterest"
              type="text"
              value={formData.productInterest}
              onChange={(e) => setFormData((d) => ({ ...d, productInterest: e.target.value }))}
              className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-foreground bg-white focus:ring-2 focus:ring-rakura-gold/50 focus:border-rakura-gold outline-none transition-shadow duration-200"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1">
              {t.formMessage}
            </label>
            <textarea
              id="contact-message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
              className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-foreground bg-white focus:ring-2 focus:ring-rakura-gold/50 focus:border-rakura-gold outline-none resize-none transition-shadow duration-200"
            />
          </div>
          {status === "success" && <p className="text-green-600 text-sm">{t.success}</p>}
          {status === "error" && <p className="text-red-600 text-sm">{t.error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-xl bg-rakura-gold text-white font-medium py-3 shadow-soft hover:shadow-gold hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200"
          >
            {status === "sending" ? (locale === "th" ? "กำลังส่ง..." : "Sending...") : t.submit}
          </button>
        </form>
      </section>

      <section className="space-y-6">
        <p className="text-sm text-rakura-muted">{t.weReply}</p>
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#06C755] text-white font-medium py-3 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
        >
          {t.lineCta}
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#25D366] text-white font-medium py-3 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
        >
          {t.whatsappCta}
        </a>
        <div className="pt-4 border-t border-stone-200">
          <p className="font-medium text-foreground">{contact.companyName}</p>
          <p className="text-sm text-rakura-muted mt-2">{contact.regional.label}</p>
          <p className="text-sm text-rakura-muted">{contact.regional.address}</p>
          <p className="text-sm text-rakura-muted">{contact.regional.phone}</p>
          <p className="text-sm text-rakura-muted mt-3">{contact.headOffice.label}</p>
          <p className="text-sm text-rakura-muted">{contact.headOffice.address}</p>
          <p className="text-sm text-rakura-muted">{contact.headOffice.phone}</p>
          <a href={`mailto:${contact.email}`} className="text-rakura-gold hover:underline text-sm mt-2 inline-block">
            {contact.email}
          </a>
        </div>
      </section>
    </div>
  );
}

export function ContactSection({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).contact;
  return (
    <section id="contact" className="py-16 px-4 scroll-mt-20 bg-white">
      <div className="max-w-2xl mx-auto md:max-w-4xl">
        <header className="mb-10">
          <AnimateOnView animation="fade-in-up">
            <h2 className="text-3xl font-bold text-foreground section-heading">{t.title}</h2>
            <p className="mt-2 text-rakura-muted">{t.subtitle}</p>
          </AnimateOnView>
        </header>
        <AnimateOnView animation="fade-in-up" delay={80}>
          <Suspense fallback={<div className="animate-pulse h-64 bg-stone-100 rounded-2xl" />}>
            <ContactFormInner locale={locale} />
          </Suspense>
        </AnimateOnView>
      </div>
    </section>
  );
}
