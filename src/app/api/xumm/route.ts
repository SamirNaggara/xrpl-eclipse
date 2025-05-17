import { NextResponse } from "next/server";
import { XummSdk } from "xumm-sdk";
import { XAMAN_API_KEY, XAMAN_SECRET } from "@/config/xaman";

const xumm = new XummSdk(XAMAN_API_KEY, XAMAN_SECRET);

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      // Si pas de body, créer une demande de connexion simple
      body = {
        TransactionType: "SignIn",
      };
    }

    const payload = await xumm.payload.create(body);
    return NextResponse.json(payload);
  } catch (error) {
    console.error("Erreur lors de la création du payload:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du payload" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uuid = searchParams.get("uuid");

  if (!uuid) {
    return NextResponse.json({ error: "UUID manquant" }, { status: 400 });
  }

  try {
    const payload = await xumm.payload.get(uuid);
    return NextResponse.json(payload);
  } catch (error) {
    console.error("Erreur lors de la récupération du payload:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du payload" },
      { status: 500 }
    );
  }
}
