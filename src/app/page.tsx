import { ProductPassport } from "@/components/ProductPassport";
import { WalletConnect } from "@/components/WalletConnect";
import { useXRPLWallet } from "@/hooks/useXRPLWallet";
import type { ProductPassport as ProductPassportType } from "@/lib/types/product";

// Données de démonstration - À remplacer par vos données réelles
const DEMO_PRODUCT: ProductPassportType = {
  public: {
    name: "SmartWatch Pro",
    model: "SW-2024",
    serialNumber: "SW2024-001",
    manufacturingDate: "2024-03-15",
    brand: "TechWear",
    imageUrl: "/images/smartwatch.jpg",
  },
  private: {
    components: [
      {
        name: "Écran OLED",
        supplier: "DisplayTech",
        certifications: ["ISO 9001", "RoHS"],
      },
      {
        name: "Batterie Lithium",
        supplier: "PowerCell",
        certifications: ["CE", "UL"],
      },
    ],
    manufacturingProcess: {
      location: "Grenoble, France",
      carbonFootprint: 12.5,
      waterUsage: 250,
    },
    qualityControls: [
      {
        date: "2024-03-14",
        inspector: "Jean Dupont",
        result: "pass" as const,
      },
      {
        date: "2024-03-15",
        inspector: "Marie Martin",
        result: "pass" as const,
      },
    ],
  },
  brandWalletAddress: "rQpsRwhrMQw8H3sja5aN4EtG3atBQWLGrh",
};

export default function Home() {
  const { address } = useXRPLWallet();

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <WalletConnect />
        </div>

        <ProductPassport data={DEMO_PRODUCT} connectedAddress={address} />
      </div>
    </main>
  );
}
