"use client";

import { useUserRole } from "@/hooks/useUserRole";
import type { ProductPassport } from "@/lib/types/product";
import { motion } from "framer-motion";
import { SubstancesList } from "./SubstancesList";
import { EnvironmentalData } from "./EnvironmentalData";
import { LifecycleEvents } from "./LifecycleEvents";
import { BrandPrivateData } from "./BrandPrivateData";
import { VerifyAuthenticity } from "./VerifyAuthenticity";
import { useRouter } from "next/navigation";

interface ProductPassportProps {
  data: ProductPassport;
  connectedAddress: string | null;
  productId: string;
}

export function ProductPassport({
  data,
  connectedAddress,
  productId,
}: ProductPassportProps) {
  const router = useRouter();
  const userRole = useUserRole(
    connectedAddress,
    data?.brandWalletAddress || ""
  );

  const handleCertify = () => {
    // Encoder les données du produit en base64 pour la transmission
    const productData = Buffer.from(JSON.stringify(data)).toString("base64");
    router.push(`/certify?data=${productData}&id=${productId}`);
  };

  // Vérification si data est undefined
  if (!data) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-600">Chargement des données du produit...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* En-tête avec statut de conformité */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-sm p-4 mb-8 flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="bg-green-500 rounded-full p-2">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-green-800">
              Passeport Produit Conforme ESPR
            </h3>
            <p className="text-sm text-green-600">
              Dernière mise à jour : {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <VerifyAuthenticity txID={data.certificationTxID} />
          {connectedAddress && (
            <button
              onClick={handleCertify}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>
                {data.certificationTxID ? "Recertifier" : "Certifier"}
              </span>
            </button>
          )}
        </div>
      </motion.div>

      {/* Informations produit */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6 mb-8"
      >
        <h2 className="text-2xl font-bold mb-6">Informations Produit</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <img
              src={data.public.imageUrl}
              alt={data.public.name}
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="space-y-4">
            <InfoItem label="Nom" value={data.public.name} />
            <InfoItem label="Modèle" value={data.public.model} />
            <InfoItem
              label="Numéro de série"
              value={data.public.serialNumber}
            />
            <InfoItem
              label="Date de fabrication"
              value={data.public.manufacturingDate}
            />
            <InfoItem label="Marque" value={data.public.brand} />
          </div>
        </div>
      </motion.div>

      {/* Substances de préoccupation (SoC) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Substances Réglementées</h2>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            Conforme REACH
          </span>
        </div>
        <div className="divide-y divide-gray-200">
          <SubstancesList />
        </div>
      </motion.div>

      {/* Indicateurs environnementaux */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6 mb-8"
      >
        <h2 className="text-2xl font-bold mb-6">Impact Environnemental</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EnvironmentalData />
        </div>
      </motion.div>

      {/* Historique du cycle de vie */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6 mb-8"
      >
        <h2 className="text-2xl font-bold mb-6">Cycle de Vie du Produit</h2>
        <LifecycleEvents />
      </motion.div>

      {/* Informations privées visibles uniquement pour la marque */}
      {userRole === "brand" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Informations Confidentielles</h2>
            <span className="px-3 py-1 bg-violet-100 text-violet-800 rounded-full text-sm">
              Accès Fabricant
            </span>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-semibold mb-4">
                Composants Détaillés
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {data.private.components.map((component, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded-lg hover:border-violet-200 transition-colors"
                  >
                    <h4 className="font-medium">{component.name}</h4>
                    <p className="text-gray-600">
                      Fournisseur: {component.supplier}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {component.certifications.map((cert, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-violet-50 text-violet-700 rounded-full text-xs"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4">Contrôles Qualité</h3>
              <div className="grid grid-cols-1 gap-4">
                {data.private.qualityControls.map((control, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded-lg hover:border-violet-200 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{control.date}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          control.result === "pass"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {control.result === "pass" ? "Réussi" : "Échec"}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">
                      Inspecteur: {control.inspector}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </motion.div>
      )}

      {/* Données privées de la marque */}
      {userRole === "brand" && connectedAddress === data.brandWalletAddress && (
        <BrandPrivateData data={data.private} />
      )}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-lg text-gray-900">{value}</dd>
    </div>
  );
}
