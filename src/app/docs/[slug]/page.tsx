import { notFound } from "next/navigation";
import { Metadata } from "next";
import { registry } from "@/registry";
import { HookDocs } from "@/app/pages/docs/hook-docs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(registry).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const hook = registry[slug];

  if (!hook) {
    return {
      title: "Hook Not Found | ezhook",
    };
  }

  return {
    title: `${hook.name} - ezhook`,
    description: hook.description,
  };
}

export default async function HookPage({ params }: PageProps) {
  const { slug } = await params;
  const hook = registry[slug];

  if (!hook) {
    notFound();
  }

  return <HookDocs hook={hook} />;
}
