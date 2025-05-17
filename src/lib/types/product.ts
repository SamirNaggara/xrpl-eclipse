export type UserRole = "brand" | "public";

export interface PublicProductData {
  name: string;
  model: string;
  serialNumber: string;
  manufacturingDate: string;
  brand: string;
  imageUrl: string;
}

export interface PrivateProductData {
  components: {
    name: string;
    supplier: string;
    certifications: string[];
  }[];
  manufacturingProcess: {
    location: string;
    carbonFootprint: number;
    waterUsage: number;
  };
  qualityControls: {
    date: string;
    inspector: string;
    result: "pass" | "fail";
  }[];
}

export interface ProductPassport {
  public: PublicProductData;
  private: PrivateProductData;
  brandWalletAddress: string;
}
