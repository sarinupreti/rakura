export const locales = ["th", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "th";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export const localeNames: Record<Locale, string> = {
  th: "ไทย",
  en: "EN",
};
