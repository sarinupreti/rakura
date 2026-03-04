"use client";

import { Suspense, useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { AnimateOnView } from "@/components/AnimateOnView";
import { getTranslations } from "@/data/translations";
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

  const inputCls = "w-full border-b border-foreground/20 dark:border-white/20 bg-transparent px-0 py-2.5 text-foreground placeholder:text-rakura-muted/60 focus:border-rakura-gold focus:outline-none transition-colors duration-200 text-sm";

  if (status === "success") {
    return (
      <div className="text-center py-16 border border-green-200 bg-green-50 max-w-2xl mx-auto">
        <div className="text-4xl mb-4">✅</div>
        <p className="font-semibold text-green-700 text-lg mb-2">
          {locale === "th" ? "ส่งข้อความแล้ว!" : "Message Sent!"}
        </p>
        <p className="text-green-600 text-sm">
          {locale === "th" ? "เราจะตอบกลับภายใน 24 ชั่วโมง" : "We'll get back to you within 24 hours."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-semibold tracking-wider uppercase text-rakura-muted mb-2">
            {t.formName} *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-xs font-semibold tracking-wider uppercase text-rakura-muted mb-2">
            {t.formEmail} *
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
            className={inputCls}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-phone" className="block text-xs font-semibold tracking-wider uppercase text-rakura-muted mb-2">
            {t.formPhone}
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="contact-productInterest" className="block text-xs font-semibold tracking-wider uppercase text-rakura-muted mb-2">
            {t.formProductInterest}
          </label>
          <input
            id="contact-productInterest"
            type="text"
            value={formData.productInterest}
            onChange={(e) => setFormData((d) => ({ ...d, productInterest: e.target.value }))}
            className={inputCls}
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold tracking-wider uppercase text-rakura-muted mb-2">
          {t.formMessage}
        </label>
        <textarea
          id="contact-message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
          className={`${inputCls} resize-none`}
        />
      </div>
      {status === "error" && <p className="text-red-500 text-sm font-medium">{t.error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-rakura-gold text-rakura-dark font-semibold text-xs tracking-wider uppercase py-3.5 hover:bg-rakura-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {status === "sending" ? (locale === "th" ? "กำลังส่ง..." : "Sending...") : t.submit}
      </button>
    </form>
  );
}

export function ContactSection({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).contact;
  return (
    <section id="contact" className="py-20 sm:py-28 px-4 scroll-mt-16 bg-background">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <AnimateOnView animation="fade-in-up">
            <p className="eyebrow mb-3">{locale === "th" ? "ติดต่อเรา" : "Get In Touch"}</p>
            <h2 className="font-display font-bold text-foreground text-3xl sm:text-4xl section-heading">{t.title}</h2>
            <p className="mt-4 text-rakura-muted">{t.subtitle}</p>
          </AnimateOnView>
        </header>
        <AnimateOnView animation="fade-in-up" delay={80}>
          <Suspense fallback={<div className="animate-pulse h-64 bg-foreground/5 rounded-sm" />}>
            <ContactFormInner locale={locale} />
          </Suspense>
        </AnimateOnView>
      </div>
    </section>
  );
}
