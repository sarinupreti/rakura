"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { isValidLocale } from "@/lib/i18n";

export function LangSetter() {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1];
  useEffect(() => {
    if (typeof document !== "undefined" && isValidLocale(locale ?? "")) {
      document.documentElement.lang = locale ?? "th";
    }
  }, [locale]);
  return null;
}
