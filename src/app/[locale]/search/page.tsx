import type { Locale } from "@/lib/i18n";
import { SearchClient } from "./SearchClient";

export const metadata = {
  title: "Search — Rakura Tea",
};

export default function SearchPage({
  params,
}: {
  params: { locale: string };
}) {
  return <SearchClient locale={params.locale as Locale} />;
}
