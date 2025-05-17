"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CertificationService,
  type ProductData,
} from "@/services/certification";
import { useXRPLWallet } from "@/hooks/useXRPLWallet";
import { WalletConnect } from "@/components/WalletConnect";
import { ProductService } from "@/services/products";

export default function CertifyPage() {
  const router = useRouter();
  const { address } = useXRPLWallet();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [txID, setTxID] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [productId, setProductId] = useState<string | null>(null);

  useEffect(() => {
    const encodedData = searchParams.get("data");
    const id = searchParams.get("id");
    if (encodedData && id) {
      try {
        const decodedData = JSON.parse(
          Buffer.from(encodedData, "base64").toString()
        );
        setProductData(decodedData);
        setProductId(id);
        // Initialiser le produit dans le service
        ProductService.initProduct(id, decodedData);
      } catch (error) {
        console.error("Erreur lors du décodage des données:", error);
        setError("Données du produit invalides");
      }
    }
  }, [searchParams]);

  const handleCertification = async () => {
    let qrWindow: Window | null = null;

    try {
      setStatus("processing");
      setError(null);
      console.log("Début de la certification...");

      const payload = CertificationService.createPayload(
        productData || {
          public: {
            brand: "SafeOut",
            model: "SmartWatch",
            timestamp: Date.now(),
          },
          private: {
            serialNumber: "XYZ123",
            components: ["comp1", "comp2"],
          },
        }
      );
      console.log("Payload créé:", payload);

      console.log("Envoi du payload à Xaman...");
      try {
        const request = await fetch("/api/xumm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            txjson: payload,
          }),
        });

        if (!request.ok) {
          throw new Error("Erreur lors de la création de la requête Xaman");
        }

        const response = await request.json();
        console.log("Réponse de Xaman:", response);

        if (response.uuid) {
          // Ouvrir la fenêtre QR dans une nouvelle fenêtre
          if (response.refs.qr_png) {
            qrWindow = window.open("", "QR Code", "width=400,height=400");
            if (qrWindow) {
              qrWindow.document.write(`
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: white;">
                  <img src="${
                    response.refs.qr_png
                  }" alt="QR Code" style="max-width: 300px;" />
                  <p style="margin-top: 20px; font-family: sans-serif; color: #333;">Scannez ce QR code avec votre application XUMM</p>
                  <a href="${
                    response.next?.always || ""
                  }" target="_blank" style="margin-top: 10px; color: blue; text-decoration: underline;">
                    Ouvrir dans XUMM
                  </a>
                </div>
              `);
            }
          }

          // Vérifier périodiquement le statut
          const checkStatus = async () => {
            const statusResponse = await fetch(
              `/api/xumm?uuid=${response.uuid}`
            );
            const status = await statusResponse.json();

            if (status.meta.signed) {
              const newTxID = status.response.txid;
              setTxID(newTxID);
              setStatus("success");

              // Mettre à jour le produit avec le nouveau txID
              if (productId) {
                try {
                  ProductService.updateCertification(productId, newTxID);
                  // Rediriger vers la page du produit après 3 secondes
                  setTimeout(() => {
                    router.push(`/scan?id=${productId}`);
                  }, 3000);
                } catch (error) {
                  console.error(
                    "Erreur lors de la mise à jour du produit:",
                    error
                  );
                }
              }

              return true;
            }
            return false;
          };

          // Vérifier toutes les 2 secondes
          const interval = setInterval(async () => {
            const isSigned = await checkStatus();
            if (isSigned) {
              clearInterval(interval);
            }
          }, 2000);

          // Nettoyer l'intervalle après 5 minutes
          setTimeout(() => {
            clearInterval(interval);
            if (status === "processing") {
              setError("La transaction a expiré");
              setStatus("error");
            }
          }, 300000);
        }
      } catch (error) {
        console.error("Erreur Xaman:", error);
        throw error;
      }
    } catch (error) {
      console.error("Erreur détaillée:", error);
      setError(error instanceof Error ? error.message : "Erreur inconnue");
      setStatus("error");
    }
  };

  if (!address) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Certification de Produit</h1>
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              Veuillez vous connecter pour accéder à la certification de
              produits
            </p>
            <WalletConnect />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Certification de Produit</h1>

        {productData && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Données du produit</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Nom :</span>{" "}
                {productData.public.brand} {productData.public.model}
              </p>
              <p>
                <span className="font-medium">Numéro de série :</span>{" "}
                {productData.private.serialNumber}
              </p>
              {productData.certificationTxID && (
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-100">
                  <p className="text-blue-700 text-sm">
                    <svg
                      className="w-5 h-5 inline-block mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Ce produit a déjà été certifié. La recertification créera
                    une nouvelle entrée dans l&apos;historique du produit.
                  </p>
                  <p className="text-sm text-blue-600 mt-2">
                    Certification précédente :{" "}
                    <a
                      href={`https://testnet.xrpl.org/transactions/${productData.certificationTxID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {productData.certificationTxID}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="section-card">
          <button
            onClick={handleCertification}
            disabled={status === "processing"}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {status === "processing"
              ? "Certification en cours..."
              : productData?.certificationTxID
              ? "Recertifier sur XRPL"
              : "Certifier sur XRPL"}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg">
              <p className="text-red-600">Erreur : {error}</p>
            </div>
          )}

          {status === "success" && txID && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-green-600 font-semibold">
                Certification réussie !
              </p>
              <p className="mt-2">Transaction ID : {txID}</p>
              <a
                href={`https://testnet.xrpl.org/transactions/${txID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                Voir sur XRPL Explorer
              </a>
              <p className="text-sm text-gray-600 mt-4">
                Redirection vers la page du produit dans quelques secondes...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
