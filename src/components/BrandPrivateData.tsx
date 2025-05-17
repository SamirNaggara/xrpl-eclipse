"use client";

import { motion } from "framer-motion";
import type { PrivateProductData } from "@/lib/types/product";

interface BrandPrivateDataProps {
  data: PrivateProductData;
}

export function BrandPrivateData({ data }: BrandPrivateDataProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-violet-50 rounded-lg shadow-lg p-6 mt-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-violet-900">
          Données Confidentielles Marque
        </h2>
        <span className="px-3 py-1 bg-violet-200 text-violet-800 rounded-full text-sm font-medium">
          Accès Restreint
        </span>
      </div>

      <div className="space-y-8">
        {/* Composants détaillés */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-violet-800">
            Composants Détaillés
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {data.components.map((component, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border border-violet-200 hover:border-violet-400 transition-colors"
              >
                <h4 className="font-medium text-violet-900">
                  {component.name}
                </h4>
                <p className="text-violet-700 mt-1">
                  Fournisseur: {component.supplier}
                </p>

                {component.substances && component.substances.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-violet-800">
                      Substances:
                    </p>
                    <div className="mt-2 space-y-2">
                      {component.substances.map((substance, idx) => (
                        <div
                          key={idx}
                          className="text-sm text-violet-600 bg-violet-50 p-2 rounded"
                        >
                          {substance.name} - {substance.concentration}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {component.recyclingInstructions && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-violet-800">
                      Instructions de recyclage:
                    </p>
                    <p className="text-sm text-violet-600 mt-1">
                      {component.recyclingInstructions}
                    </p>
                  </div>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  {component.certifications.map((cert, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-violet-100 text-violet-700 rounded-full text-xs"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Processus de fabrication */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-violet-800">
            Processus de Fabrication
          </h3>
          <div className="bg-white p-4 rounded-lg border border-violet-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-violet-800">
                  Localisation
                </p>
                <p className="mt-1 text-violet-700">
                  {data.manufacturingProcess.location}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-violet-800">
                  Empreinte Carbone
                </p>
                <p className="mt-1 text-violet-700">
                  {data.manufacturingProcess.carbonFootprint} kg CO2
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-violet-800">
                  Consommation d'eau
                </p>
                <p className="mt-1 text-violet-700">
                  {data.manufacturingProcess.waterUsage} L
                </p>
              </div>
              {data.manufacturingProcess.energyConsumption && (
                <div>
                  <p className="text-sm font-medium text-violet-800">
                    Consommation d'énergie
                  </p>
                  <p className="mt-1 text-violet-700">
                    {data.manufacturingProcess.energyConsumption} kWh
                  </p>
                </div>
              )}
              {data.manufacturingProcess.wasteGenerated && (
                <div>
                  <p className="text-sm font-medium text-violet-800">
                    Déchets générés
                  </p>
                  <p className="mt-1 text-violet-700">
                    {data.manufacturingProcess.wasteGenerated} kg
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contrôles qualité */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-violet-800">
            Contrôles Qualité
          </h3>
          <div className="space-y-4">
            {data.qualityControls.map((control, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border border-violet-200 hover:border-violet-400 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-violet-900">
                    {control.date}
                  </span>
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
                <p className="text-violet-700 mt-2">
                  Inspecteur: {control.inspector}
                </p>
                {control.notes && (
                  <p className="text-sm text-violet-600 mt-2 bg-violet-50 p-2 rounded">
                    {control.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
