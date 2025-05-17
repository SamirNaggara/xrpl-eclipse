"use client";

import { useState } from "react";

interface Substance {
  name: string;
  cas_number: string;
  location: string;
  concentration: string;
  risk_level: "high" | "medium" | "low";
  reach_status: string;
}

const MOCK_SUBSTANCES: Substance[] = [
  {
    name: "Plomb",
    cas_number: "7439-92-1",
    location: "Soudures électroniques",
    concentration: "0.1%",
    risk_level: "high",
    reach_status: "Substance SVHC",
  },
  {
    name: "Phtalate de bis(2-éthylhexyle)",
    cas_number: "117-81-7",
    location: "Gaine de câble",
    concentration: "0.05%",
    risk_level: "medium",
    reach_status: "Substance SVHC",
  },
];

export function SubstancesList() {
  const [expandedSubstance, setExpandedSubstance] = useState<string | null>(
    null
  );

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {MOCK_SUBSTANCES.map((substance) => (
        <div
          key={substance.cas_number}
          className="border rounded-lg overflow-hidden bg-white"
        >
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
            onClick={() =>
              setExpandedSubstance(
                expandedSubstance === substance.cas_number
                  ? null
                  : substance.cas_number
              )
            }
          >
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">
                {substance.name}
              </h3>
              <p className="text-sm text-gray-500">
                CAS: {substance.cas_number}
              </p>
            </div>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(
                substance.risk_level
              )}`}
            >
              {substance.risk_level.toUpperCase()}
            </span>
          </div>

          {expandedSubstance === substance.cas_number && (
            <div className="px-4 pb-4 space-y-3 border-t">
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Localisation
                  </p>
                  <p className="mt-1">{substance.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Concentration
                  </p>
                  <p className="mt-1">{substance.concentration}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Statut REACH
                  </p>
                  <p className="mt-1">{substance.reach_status}</p>
                </div>
              </div>
              <div className="mt-4">
                <a
                  href={`https://echa.europa.eu/fr/search-for-chemicals?p_p_id=disssimplesearch_WAR_disssearchportlet&p_p_lifecycle=0&_disssimplesearch_WAR_disssearchportlet_searchOccurred=true&_disssimplesearch_WAR_disssearchportlet_sessionCriteriaId=dissSimpleSearchSessionParam101401593324037936&_disssimplesearch_WAR_disssearchportlet_searchCriteria.searchValue=${substance.cas_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-violet-600 hover:text-violet-800"
                >
                  Voir sur ECHA →
                </a>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
