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
        substances: [
          {
            name: "Indium",
            cas_number: "7440-74-6",
            location: "Couche conductrice",
            concentration: "0.01%",
            risk_level: "low",
            reach_status: "Autorisé",
          },
        ],
        recyclingInstructions:
          "Démontage spécifique requis pour récupération des terres rares",
      },
      {
        name: "Processeur XRPL",
        supplier: "ChipSecure",
        certifications: ["CE", "FCC"],
        recyclingInstructions:
          "Recyclable avec les déchets électroniques standards",
      },
      {
        name: "Batterie Li-Ion",
        supplier: "PowerTech",
        certifications: ["UL", "IEC 62133"],
        substances: [
          {
            name: "Lithium",
            cas_number: "7439-93-2",
            location: "Cellules batterie",
            concentration: "2%",
            risk_level: "medium",
            reach_status: "Déclaration obligatoire",
          },
        ],
        recyclingInstructions: "À recycler via filière spécialisée batteries",
      },
    ],
    manufacturingProcess: {
      location: "Grenoble, France",
      carbonFootprint: 8.5,
      waterUsage: 180,
      energyConsumption: 450,
      wasteGenerated: 0.8,
    },
    qualityControls: [
      {
        date: "2024-03-18",
        inspector: "Sophie Martin",
        result: "pass",
        notes: "Tous les tests conformes aux spécifications",
      },
      {
        date: "2024-03-19",
        inspector: "Lucas Dubois",
        result: "pass",
        notes: "Vérification finale des fonctionnalités XRPL",
      },
    ],
  },
  brandWalletAddress: "rQpsRwhrMQw8H3sja5aN4EtG3atBQWLGrh",
  substances: [
    {
      name: "Lithium",
      cas_number: "7439-93-2",
      location: "Batterie",
      concentration: "2%",
      risk_level: "medium",
      reach_status: "Déclaration obligatoire",
    },
    {
      name: "Indium",
      cas_number: "7440-74-6",
      location: "Écran",
      concentration: "0.01%",
      risk_level: "low",
      reach_status: "Autorisé",
    },
  ],
  environmentalIndicators: [
    {
      name: "Empreinte Carbone",
      value: "8.5",
      unit: "kg CO2e",
      description: "Impact carbone total du cycle de vie",
      verificationDate: "2024-03-15",
      verifier: "Bureau Veritas",
    },
    {
      name: "Contenu Recyclé",
      value: "45",
      unit: "%",
      description: "Pourcentage de matériaux recyclés",
      verificationDate: "2024-03-15",
      verifier: "Bureau Veritas",
    },
    {
      name: "Indice de Réparabilité",
      value: "8.5",
      unit: "/10",
      description: "Score selon l'indice français",
      verificationDate: "2024-03-15",
      verifier: "Bureau Veritas",
    },
  ],
  lifecycleEvents: [
    {
      id: "prod_001",
      type: "production",
      date: "2024-03-20",
      description: "Production initiale",
      location: "Grenoble, France",
      operator: "TechWear Manufacturing",
      transactionHash: "0xabc...123",
    },
  ],
  lastUpdated: "2024-03-20",
  complianceStatus: {
    espr: true,
    reach: true,
    rohs: true,
  },
  certificationTxID:
    "A8AB75A0BEC689B80480634D98333080C3144EE004B66E55D42B497B585319D7",
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

        <ProductPassport
          data={WATCH_DATA}
          connectedAddress={address}
          productId={nftId || "nft001"}
        />
      </div>
    </main>
  );
}
