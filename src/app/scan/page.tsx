"use client";

import { ProductPassport } from "@/components/ProductPassport";
import { WalletConnect } from "@/components/WalletConnect";
import { useXRPLWallet } from "@/hooks/useXRPLWallet";
import { useSearchParams } from "next/navigation";
import type { ProductPassport as ProductPassportType } from "@/lib/types/product";

// Données de démonstration pour la montre connectée
const WATCH_DATA: ProductPassportType = {
  public: {
    name: "XRP SmartWatch Elite",
    model: "XRP-SW2024",
    serialNumber: "XRP24-001",
    manufacturingDate: "2024-03-20",
    brand: "TechWear",
    imageUrl: "/montre-xrpl.png",
  },
  private: {
    components: [
      {
        name: "Écran AMOLED",
        supplier: "DisplayTech Solutions",
        certifications: ["ISO 9001", "RoHS", "REACH"],
      },
      {
        name: "Processeur XRPL",
        supplier: "ChipSecure",
        certifications: ["CE", "FCC"],
      },
      {
        name: "Batterie Li-Ion",
        supplier: "PowerTech",
        certifications: ["UL", "IEC 62133"],
      },
    ],
    manufacturingProcess: {
      location: "Grenoble, France",
      carbonFootprint: 8.5,
      waterUsage: 180,
    },
    qualityControls: [
      {
        date: "2024-03-18",
        inspector: "Sophie Martin",
        result: "pass" as const,
      },
      {
        date: "2024-03-19",
        inspector: "Lucas Dubois",
        result: "pass" as const,
      },
      {
        date: "2024-03-20",
        inspector: "Emma Bernard",
        result: "pass" as const,
      },
    ],
  },
  brandWalletAddress: "rQpsRwhrMQw8H3sja5aN4EtG3atBQWLGrh",
};

export default function ScanPage() {
  const { address } = useXRPLWallet();
  const searchParams = useSearchParams();
  const nftId = searchParams.get("id");

  // Vérifier si l'ID correspond à notre montre
  if (nftId !== "nft001") {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-red-600">
              Produit non trouvé
            </h2>
            <p className="mt-2 text-gray-600">
              Le produit avec l'identifiant {nftId} n'existe pas dans notre base
              de données.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Passeport Digital XRP SmartWatch
          </h1>
          <p className="text-gray-600 mb-6">
            Scannez le QR code ou connectez votre wallet pour voir les détails
            complets
          </p>
          <WalletConnect />
        </div>

        <ProductPassport data={WATCH_DATA} connectedAddress={address} />
      </div>
    </main>
  );
}
