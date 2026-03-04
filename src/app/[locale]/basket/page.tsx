"use client";

import { useBasket } from "@/contexts/BasketContext";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import { useParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { contact } from "@/data/contact";

export default function BasketPage() {
  const params = useParams();
  const locale = (params.locale as Locale) ?? "en";
  const isEn = locale === "en";

  const { items, removeItem, clearBasket } = useBasket();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const productList = items.map((i) => (isEn ? i.nameEn : i.nameTh)).join(", ");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (items.length === 0) return;
      setStatus("sending");
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            productInterest: productList,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setStatus("success");
          clearBasket();
          setFormData({ name: "", email: "", phone: "", message: "" });
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    },
    [formData, items, productList, clearBasket]
  );

  const inputCls =
    "w-full border-b border-foreground/20 bg-transparent px-0 py-2.5 text-foreground placeholder:text-rakura-muted/60 focus:border-rakura-gold focus:outline-none transition-colors duration-200 text-sm";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-rakura-dark py-14 px-4 text-center">
        <p className="eyebrow text-rakura-gold mb-3">
          {isEn ? "Your Selection" : "ชาที่คุณเลือก"}
        </p>
        <h1 className="font-display font-bold text-white text-2xl sm:text-4xl">
          {isEn ? "Enquiry Basket" : "ตะกร้าสอบถาม"}
        </h1>
        {items.length > 0 && (
          <p className="text-white/60 mt-2 text-sm">
            {isEn
              ? `${items.length} product${items.length > 1 ? "s" : ""} selected`
              : `เลือก ${items.length} ผลิตภัณฑ์`}
          </p>
        )}
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        {items.length === 0 ? (
          /* Empty state */
          <div className="text-center py-20">
            <div className="text-5xl mb-6">🛒</div>
            <h2 className="font-display font-bold text-foreground text-2xl mb-4">
              {isEn ? "Your basket is empty" : "ตะกร้าของคุณว่างเปล่า"}
            </h2>
            <p className="text-rakura-muted mb-8 max-w-sm mx-auto">
              {isEn
                ? "Add teas to your basket from the product pages to create a combined enquiry."
                : "เพิ่มชาจากหน้าผลิตภัณฑ์เพื่อส่งคำถามรวม"}
            </p>
            <Link
              href={`/${locale}#products`}
              className="inline-flex items-center gap-2 bg-rakura-gold text-rakura-dark font-semibold text-sm tracking-wider uppercase px-8 py-3.5 hover:bg-rakura-gold-light transition-colors"
            >
              {isEn ? "Browse Teas" : "ดูชาทั้งหมด"}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: basket items */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-foreground text-lg">
                  {isEn ? "Selected Teas" : "ชาที่เลือก"}
                </h2>
                <button
                  onClick={clearBasket}
                  className="text-xs text-rakura-muted hover:text-foreground underline underline-offset-2 transition-colors"
                >
                  {isEn ? "Clear all" : "ล้างทั้งหมด"}
                </button>
              </div>

              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border border-stone-200 group hover:border-rakura-gold/30 transition-colors"
                  >
                    {item.image && (
                      <div className="relative w-16 h-20 shrink-0 bg-stone-50 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={isEn ? item.nameEn : item.nameTh}
                          fill
                          className="object-contain p-1"
                          sizes="64px"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm leading-snug">
                        {isEn ? item.nameEn : item.nameTh}
                      </p>
                      <p className="text-xs text-rakura-muted mt-1 capitalize">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/${locale}/products/${item.id}`}
                        className="text-xs text-rakura-gold hover:underline underline-offset-2 whitespace-nowrap"
                      >
                        {isEn ? "View" : "ดู"}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        title={isEn ? "Remove" : "ลบ"}
                        className="text-stone-300 hover:text-red-400 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick contact buttons */}
              <div className="mt-8 pt-6 border-t border-stone-200">
                <p className="text-xs text-rakura-muted mb-3">
                  {isEn ? "Or enquire directly:" : "หรือสอบถามโดยตรง:"}
                </p>
                <div className="flex gap-3">
                  <a
                    href={`${contact.thailand.whatsappUrl}?text=${encodeURIComponent(
                      isEn
                        ? `Hi, I'm interested in: ${productList}`
                        : `สวัสดี ฉันสนใจ: ${productList}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 border border-[#25D366] text-[#25D366] text-xs font-semibold tracking-wider uppercase py-2.5 hover:bg-[#25D366] hover:text-white transition-colors duration-200"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={contact.thailand.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 border border-[#06C755] text-[#06C755] text-xs font-semibold tracking-wider uppercase py-2.5 hover:bg-[#06C755] hover:text-white transition-colors duration-200"
                  >
                    Line
                  </a>
                </div>
              </div>
            </div>

            {/* Right: enquiry form */}
            <div>
              <h2 className="font-semibold text-foreground text-lg mb-6">
                {isEn ? "Send Enquiry" : "ส่งคำถาม"}
              </h2>

              {status === "success" ? (
                <div className="text-center py-12 border border-green-200 bg-green-50">
                  <div className="text-4xl mb-4">✅</div>
                  <p className="font-semibold text-green-700 mb-2">
                    {isEn ? "Enquiry Sent!" : "ส่งคำถามแล้ว!"}
                  </p>
                  <p className="text-green-600 text-sm">
                    {isEn ? "We'll get back to you within 24 hours." : "เราจะตอบกลับภายใน 24 ชั่วโมง"}
                  </p>
                  <Link href={`/${locale}#products`} className="mt-6 inline-block text-xs text-rakura-gold hover:underline underline-offset-2">
                    {isEn ? "Continue browsing →" : "ดูผลิตภัณฑ์ต่อ →"}
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Products (read-only display) */}
                  <div className="bg-stone-50 border border-stone-200 p-4 rounded-sm">
                    <p className="text-xs font-semibold tracking-widest uppercase text-rakura-muted mb-2">
                      {isEn ? "Enquiring About" : "สอบถามเกี่ยวกับ"}
                    </p>
                    <p className="text-sm text-foreground">{productList}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-rakura-muted mb-2">
                      {isEn ? "Name" : "ชื่อ"} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-rakura-muted mb-2">
                      {isEn ? "Email" : "อีเมล"} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-rakura-muted mb-2">
                      {isEn ? "Phone / Line ID" : "โทรศัพท์ / Line ID"}
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-rakura-muted mb-2">
                      {isEn ? "Message (optional)" : "ข้อความ (ถ้ามี)"}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                      placeholder={isEn ? "e.g. quantities, delivery needs, hotel name..." : "เช่น ปริมาณ ความต้องการจัดส่ง ชื่อโรงแรม..."}
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-500 text-sm">
                      {isEn ? "Something went wrong. Please try via Line or WhatsApp." : "เกิดข้อผิดพลาด กรุณาลองทาง Line หรือ WhatsApp"}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending" || items.length === 0}
                    className="w-full bg-rakura-gold text-rakura-dark font-semibold text-xs tracking-wider uppercase py-4 hover:bg-rakura-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {status === "sending"
                      ? isEn ? "Sending..." : "กำลังส่ง..."
                      : isEn ? "Send Enquiry" : "ส่งคำถาม"}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
