import { redirect } from "next/navigation";

export default function SustainabilityRedirect({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}#sustainability`);
}
