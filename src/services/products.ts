import type { ProductPassport } from "@/lib/types/product";

// Stockage temporaire des produits (à remplacer par une base de données)
const products: { [key: string]: ProductPassport } = {};

export const ProductService = {
  // Initialiser un produit
  initProduct(id: string, data: ProductPassport) {
    products[id] = data;
  },

  // Obtenir un produit
  getProduct(id: string): ProductPassport | null {
    return products[id] || null;
  },

  // Mettre à jour un produit
  updateProduct(id: string, data: Partial<ProductPassport>) {
    if (!products[id]) {
      throw new Error("Produit non trouvé");
    }
    products[id] = {
      ...products[id],
      ...data,
      lastUpdated: new Date().toISOString(),
    };
    return products[id];
  },

  // Mettre à jour le txID de certification
  updateCertification(id: string, txID: string) {
    if (!products[id]) {
      throw new Error("Produit non trouvé");
    }
    products[id] = {
      ...products[id],
      certificationTxID: txID,
      lastUpdated: new Date().toISOString(),
      lifecycleEvents: [
        ...products[id].lifecycleEvents,
        {
          id: `cert_${Date.now()}`,
          type: "production",
          date: new Date().toISOString(),
          description: "Certification du produit",
          location: "XRPL Testnet",
          operator: products[id].brandWalletAddress,
          transactionHash: txID,
        },
      ],
    };
    return products[id];
  },
};
