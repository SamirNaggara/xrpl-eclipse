import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { MOCK_DATA } from "@/lib/mockData";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop() || "";
  const data = MOCK_DATA[id as keyof typeof MOCK_DATA]?.public;
  if (!data) {
    return NextResponse.json(
      { ok: false, error: "Not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ ok: true, data });
}
