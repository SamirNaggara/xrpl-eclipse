"use client";

import { useUserRole } from "@/hooks/useUserRole";
import type { ProductPassport } from "@/lib/types/product";
import { motion } from "framer-motion";

interface ProductPassportProps {
  data: ProductPassport;
  connectedAddress: string | null;
}

export function ProductPassport({
  data,
  connectedAddress,
}: ProductPassportProps) {
  const userRole = useUserRole(
    connectedAddress,
    data?.brandWalletAddress || ""
  );

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
      {/* Informations publiques toujours visibles */}
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
              className="w-full rounded-lg"
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

      {/* Informations privées visibles uniquement pour la marque */}
      {userRole === "brand" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-6">
            Informations Confidentielles
          </h2>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-semibold mb-4">Composants</h3>
              <div className="grid grid-cols-1 gap-4">
                {data.private.components.map((component, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <h4 className="font-medium">{component.name}</h4>
                    <p className="text-gray-600">
                      Fournisseur: {component.supplier}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {component.certifications.map((cert, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
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
              <h3 className="text-xl font-semibold mb-4">
                Processus de Fabrication
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <InfoItem
                  label="Localisation"
                  value={data.private.manufacturingProcess.location}
                />
                <InfoItem
                  label="Empreinte Carbone"
                  value={`${data.private.manufacturingProcess.carbonFootprint} kg CO2`}
                />
                <InfoItem
                  label="Consommation d'eau"
                  value={`${data.private.manufacturingProcess.waterUsage} L`}
                />
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4">Contrôles Qualité</h3>
              <div className="grid grid-cols-1 gap-4">
                {data.private.qualityControls.map((control, index) => (
                  <div key={index} className="border p-4 rounded-lg">
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
