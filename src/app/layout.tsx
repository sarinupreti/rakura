import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import { LangSetter } from "@/components/LangSetter";
import "./globals.css";

const sarabun = Sarabun({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-sarabun",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Rakura | The Finest Himalayan Teas", template: "%s | Rakura" },
  description:
    "Pure, single origin Himalayan teas from Nepal. Amongst the world's finest. Plastic-free, compostable teabags. Sustainability for farmers and community.",
  openGraph: {
    title: "Rakura | The Finest Himalayan Teas",
    description: "Pure Himalayan teas from Nepal. Sustainable. Exceptional.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={sarabun.variable}>
      <body className="antialiased min-h-screen flex flex-col">
        <LangSetter />
        {children}
      </body>
    </html>
  );
}
