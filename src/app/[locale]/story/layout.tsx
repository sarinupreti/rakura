import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Rakura—the dream, the pioneer. How Himalayan tea came to Nepal and how we're redefining its future.",
};

export default function StoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
