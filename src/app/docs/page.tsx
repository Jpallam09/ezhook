import { redirect } from "next/navigation";
import { registry } from "@/registry";

export default function DocsPage() {
  const first = Object.keys(registry)[0];
  if (!first) {
    redirect("/");
  }
  redirect(`/docs/${first}`);
}
