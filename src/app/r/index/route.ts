import { getRegistryIndex } from "@/lib/registry";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const index = await getRegistryIndex();
  return NextResponse.json(index);
}
