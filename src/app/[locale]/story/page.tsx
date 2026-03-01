import { redirect } from "next/navigation";

export default function StoryRedirect({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}#story`);
}
