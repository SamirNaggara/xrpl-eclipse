import crypto from "crypto";

export interface ProductData {
  public: {
    brand: string;
    model: string;
    timestamp: number;
  };
  private: {
    serialNumber: string;
    components: string[];
  };
}

export interface CertificationResult {
  txID: string;
  timestamp: number;
  success: boolean;
}

export class CertificationService {
  static generateHash(data: any): string {
    return crypto
      .createHash("sha256")
      .update(JSON.stringify(data))
      .digest("hex");
  }

  static createPayload(data: ProductData) {
    const publicHash = this.generateHash(data.public);
    const privateHash = this.generateHash(data.private);

    return {
      TransactionType: "NFTokenMint",
      NFTokenTaxon: 0,
      Flags: 8,
      URI: Buffer.from(
        JSON.stringify({
          publicHash,
          privateHash,
          timestamp: Date.now(),
        })
      ).toString("hex"),
    };
  }
}
