import { NextResponse } from "next/server";
import { MOCK_DATA } from "@/lib/mockData";

export async function POST(req: Request) {
  const { nftId, role } = await req.json();
  const data = MOCK_DATA[nftId as keyof typeof MOCK_DATA];
  if (!data || (role !== "owner" && role !== "brand")) {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    );
  }
  const ownerBlob = data.owner;
  const brandBlob = role === "brand" ? data.brand : null;
  const res = NextResponse.json({ role, ownerBlob, brandBlob });
  res.cookies.set(`role-${nftId}`, role, {
    httpOnly: true,
    maxAge: 600, // 10 min
    path: "/",
    sameSite: "lax",
  });
  return res;
}
