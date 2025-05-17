interface MaintenanceEvent {
  date: string;
  type: string;
  notes: string;
}

interface OwnerInfo {
  purchaseDate: string;
  warrantyEnd: string;
  maintenanceHistory: MaintenanceEvent[];
}

interface ProductComponent {
  name: string;
  supplier: string;
  serialNumber: string;
  composition?: string;
  version?: string;
}

interface TraceEvent {
  step: number;
  label: string;
  date: string;
  location: string;
}

interface BrandInfo {
  recipe: string;
  components: ProductComponent[];
  traceHistory: TraceEvent[];
}

interface ProductData {
  public: {
    id: string;
    name: string;
    brand: string;
    model: string;
    serialNumber: string;
    madeIn: string;
    imageUrl: string;
    description: string;
  };
  owner: OwnerInfo;
  brand: BrandInfo;
}

interface MockData {
  [key: string]: ProductData;
}

export const MOCK_DATA: MockData = {
  nft001: {
    public: {
      id: "nft001",
      name: "Montre Connectée XRPL",
      brand: "XRPTime",
      model: "XRP-W1-2024",
      serialNumber: "XRT-2024-001234",
      madeIn: "France",
      imageUrl: "/montre-xrpl.png",
      description:
        "Montre connectée de luxe avec intégration native XRPL pour les paiements et la traçabilité.",
    },
    owner: {
      purchaseDate: "2023-05-10",
      warrantyEnd: "2025-05-10",
      maintenanceHistory: [
        {
          date: "2023-12-01",
          type: "Maintenance",
          notes: "Mise à jour firmware v2.1",
        },
      ],
    },
    brand: {
      recipe: "Alliage spécial titane, puce XRPL, firmware v2.1",
      components: [
        {
          name: "Boîtier Titane",
          supplier: "TitaniumTech",
          serialNumber: "TT-2023-789",
          composition: "Grade 5 Titanium",
        },
        {
          name: "Module XRPL",
          supplier: "RippleTech",
          serialNumber: "RT-2023-456",
          version: "v2.1",
        },
      ],
      traceHistory: [
        {
          step: 1,
          label: "Assemblage",
          date: "2023-04-01",
          location: "Atelier Grenoble",
        },
        {
          step: 2,
          label: "Contrôle qualité",
          date: "2023-04-10",
          location: "Laboratoire Paris",
        },
        {
          step: 3,
          label: "Certification",
          date: "2023-04-20",
          location: "Bureau Veritas Lyon",
        },
        {
          step: 4,
          label: "Expédition",
          date: "2023-05-01",
          location: "Centre logistique Marseille",
        },
      ],
    },
  },
};
