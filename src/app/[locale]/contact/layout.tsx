import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk Tea. Get in touch with Rakura via form, Line or WhatsApp. We reply in Thai and English.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
