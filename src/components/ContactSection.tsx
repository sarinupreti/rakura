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

  const inputCls = "w-full border-b border-foreground/20 dark:border-white/20 bg-transparent px-0 py-2.5 text-foreground placeholder:text-rakura-muted/60 focus:border-rakura-gold focus:outline-none transition-colors duration-200 text-sm";
  const lineUrl = process.env.NEXT_PUBLIC_LINE_URL || "#";
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/66";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
      {/* Form */}
      <section>
        <form onSubmit={handleSubmit} className="space-y-6">
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
          {status === "success" && <p className="text-green-600 text-sm font-medium">{t.success}</p>}
          {status === "error" && <p className="text-red-500 text-sm font-medium">{t.error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-rakura-gold text-rakura-dark font-semibold text-xs tracking-wider uppercase py-3.5 hover:bg-rakura-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {status === "sending" ? (locale === "th" ? "กำลังส่ง..." : "Sending...") : t.submit}
          </button>
        </form>
      </section>

      {/* Contact info */}
      <section className="space-y-8">
        <p className="text-sm text-rakura-muted leading-relaxed">{t.weReply}</p>

        <div className="flex flex-col gap-3">
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full border border-[#06C755] text-[#06C755] font-semibold text-xs tracking-wider uppercase py-3 hover:bg-[#06C755] hover:text-white transition-colors duration-200"
          >
            {t.lineCta}
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full border border-[#25D366] text-[#25D366] font-semibold text-xs tracking-wider uppercase py-3 hover:bg-[#25D366] hover:text-white transition-colors duration-200"
          >
            {t.whatsappCta}
          </a>
        </div>

        <div className="pt-6 border-t border-foreground/10 dark:border-white/10 space-y-4">
          {/* Thailand contacts */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-rakura-gold mb-3">
              {locale === "th" ? "ติดต่อในประเทศไทย" : "For Inquiries — Thailand"}
            </p>
            <div className="space-y-2">
              {contact.thailand.agents.map((agent) => (
                <div key={agent.name} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rakura-gold mt-2 shrink-0" />
                  <div>
                    <span className="text-sm text-foreground font-medium">{agent.name}</span>
                    <span className="text-xs text-rakura-muted ml-2">({agent.languages})</span>
                    <a href={`tel:${agent.phone.replace(/\s/g, "")}`} className="block text-sm text-rakura-gold hover:text-rakura-gold-light transition-colors">
                      {agent.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <a href={`mailto:${contact.thailand.email}`} className="block text-sm text-rakura-gold hover:text-rakura-gold-light transition-colors">
                {contact.thailand.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
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
