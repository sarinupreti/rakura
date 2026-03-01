import { redirect } from "next/navigation";

export default function ContactRedirect({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const locale = params.locale;
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(searchParams)) {
    if (v !== undefined) q.set(k, Array.isArray(v) ? v[0]! : v);
  }
  const query = q.toString();
  const suffix = query ? `?${query}#contact` : "#contact";
  redirect(`/${locale}${suffix}`);
}
