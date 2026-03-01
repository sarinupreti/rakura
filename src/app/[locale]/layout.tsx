import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const titles: Record<Locale, string> = {
  th: "Rakura | ชาชั้นเลิศจากหิมาลัย",
  en: "Rakura | The Finest Himalayan Teas",
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  return {
    title: titles[locale],
    description:
      locale === "th"
        ? "ชาบริสุทธิ์แหล่งเดียวจากเนปาล ระดับโลก ซองชาปลอดพลาสติก ย่อยสลายได้ ความยั่งยืนเพื่อเกษตรกรและชุมชน"
        : "Pure single origin Himalayan teas from Nepal. Plastic-free, compostable teabags. Sustainability for farmers and community.",
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!locales.includes(locale as Locale)) notFound();

  return (
    <>
      <Header locale={locale as Locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale as Locale} />
    </>
  );
}
