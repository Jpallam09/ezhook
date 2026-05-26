import { getRegistryIndex } from "@/lib/registry";
import { NextResponse } from "next/server";

export async function GET() {
  const index = await getRegistryIndex();
  return NextResponse.json(index);
}
