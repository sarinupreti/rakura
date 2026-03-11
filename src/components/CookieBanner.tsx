"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function CookieBanner({ locale }: { locale: string }) {
  const [visible, setVisible] = useState(false);
  const isEn = locale === "en";

  useEffect(() => {
    const consent = localStorage.getItem("rakura-cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("rakura-cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("rakura-cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-rakura-dark border-t border-white/10 shadow-2xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-white/80 leading-relaxed">
          {isEn ? (
            <>
              We use cookies to improve your experience.{" "}
              <Link href={`/${locale}#contact`} className="text-rakura-gold hover:underline">
                Privacy Policy
              </Link>
              {" "}(PDPA Compliant)
            </>
          ) : (
            <>
              เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์ของคุณ{" "}
              <Link href={`/${locale}#contact`} className="text-rakura-gold hover:underline">
                นโยบายความเป็นส่วนตัว
              </Link>
              {" "}(สอดคล้อง PDPA)
            </>
          )}
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="text-xs font-semibold tracking-wider uppercase text-white/50 hover:text-white transition-colors px-4 py-2"
          >
            {isEn ? "Decline" : "ปฏิเสธ"}
          </button>
          <button
            onClick={accept}
            className="text-xs font-semibold tracking-wider uppercase bg-rakura-gold text-rakura-dark px-6 py-2 hover:bg-rakura-gold-light transition-colors"
          >
            {isEn ? "Accept" : "ยอมรับ"}
          </button>
        </div>
      </div>
    </div>
  );
}
