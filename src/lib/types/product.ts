export type UserRole = "brand" | "public";

export interface PublicProductData {
  name: string;
  model: string;
  serialNumber: string;
  manufacturingDate: string;
  brand: string;
  imageUrl: string;
}

export interface Substance {
  name: string;
  cas_number: string;
  location: string;
  concentration: string;
  risk_level: "high" | "medium" | "low";
  reach_status: string;
}

export interface EnvironmentalIndicator {
  name: string;
  value: string;
  unit: string;
  description: string;
  verificationDate: string;
  verifier: string;
}

export interface LifecycleEvent {
  id: string;
  type: "production" | "repair" | "refurbishment" | "resale" | "recycling";
  date: string;
  description: string;
  location: string;
  operator: string;
  transactionHash: string;
}

export interface Component {
  name: string;
  supplier: string;
  certifications: string[];
  substances?: Substance[];
  recyclingInstructions?: string;
}

export interface ManufacturingProcess {
  location: string;
  carbonFootprint: number;
  waterUsage: number;
  energyConsumption?: number;
  wasteGenerated?: number;
}

export interface QualityControl {
  date: string;
  inspector: string;
  result: "pass" | "fail";
  notes?: string;
}

export interface PrivateProductData {
  components: Component[];
  manufacturingProcess: ManufacturingProcess;
  qualityControls: QualityControl[];
}

export interface ProductPassport {
  public: PublicProductData;
  private: PrivateProductData;
  brandWalletAddress: string;
  substances: Substance[];
  environmentalIndicators: EnvironmentalIndicator[];
  lifecycleEvents: LifecycleEvent[];
  lastUpdated: string;
  complianceStatus: {
    espr: boolean;
    reach: boolean;
    rohs: boolean;
  };
  certificationTxID?: string;
}
