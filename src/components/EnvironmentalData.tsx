"use client";

interface EnvironmentalIndicator {
  name: string;
  value: string;
  unit: string;
  description: string;
  verificationDate: string;
  verifier: string;
}

const MOCK_INDICATORS: EnvironmentalIndicator[] = [
  {
    name: "Empreinte Carbone",
    value: "12.5",
    unit: "kg CO2e",
    description: "Impact carbone total du cycle de vie du produit",
    verificationDate: "2024-03-15",
    verifier: "Bureau Veritas",
  },
  {
    name: "Contenu Recyclé",
    value: "45",
    unit: "%",
    description: "Pourcentage de matériaux recyclés dans le produit",
    verificationDate: "2024-03-15",
    verifier: "Bureau Veritas",
  },
  {
    name: "Indice de Réparabilité",
    value: "8.5",
    unit: "/10",
    description: "Facilité de réparation selon les critères européens",
    verificationDate: "2024-03-15",
    verifier: "Bureau Veritas",
  },
  {
    name: "Performance Énergétique",
    value: "A+++",
    unit: "",
    description: "Classe énergétique selon la norme européenne",
    verificationDate: "2024-03-15",
    verifier: "Bureau Veritas",
  },
];

export function EnvironmentalData() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {MOCK_INDICATORS.map((indicator) => (
        <div
          key={indicator.name}
          className="bg-white p-4 rounded-lg border hover:border-violet-200 transition-colors"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-gray-900">
              {indicator.name}
            </h3>
            <span className="text-2xl font-bold text-violet-600">
              {indicator.value}
              <span className="text-sm ml-1 text-gray-500">
                {indicator.unit}
              </span>
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{indicator.description}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Vérifié le {indicator.verificationDate}</span>
            <span>par {indicator.verifier}</span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <button className="text-sm text-violet-600 hover:text-violet-800">
              Voir le certificat →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
