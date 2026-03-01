import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Himalayan tea collections, classic teas, super herbs, loose leaf and tea presenters from Rakura.",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
