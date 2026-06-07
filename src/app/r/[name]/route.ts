import { getRegistryItem } from "@/lib/registry";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const item = await getRegistryItem(name);

  if (!item) {
    return new NextResponse("Hook not found", { status: 404 });
  }

  return NextResponse.json(item);
}
