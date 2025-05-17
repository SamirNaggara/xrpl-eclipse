import { NextResponse } from "next/server";
import { XummSdk } from "xumm-sdk";

const xumm = new XummSdk(
  "ffe37e7d-cb32-4011-abe5-c0591cc4a7a1",
  "1885fe62-b212-4212-b40c-2f70ab0a92b7"
);

export async function POST(request: Request) {
  try {
    const payload = await xumm.payload.create({
      txjson: {
        TransactionType: "SignIn",
        Account: "",
        SignIn: true,
      },
      options: {
        expire: 5,
        signinToValidate: true,
        multisign: false,
      },
    });

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
