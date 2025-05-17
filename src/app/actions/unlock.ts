"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Params = { nftId: string; role: "owner" | "brand" };

export async function unlock({ nftId, role }: Params) {
  const cookieStore = await cookies();
  cookieStore.set(`role-${nftId}`, role, {
    httpOnly: true,
    maxAge: 600,
    path: "/",
    sameSite: "lax",
  });
  redirect(`/scan?id=${nftId}`);
}
