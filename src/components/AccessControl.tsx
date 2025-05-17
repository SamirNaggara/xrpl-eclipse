"use client";

import { useState } from "react";

interface AccessLevel {
  id: string;
  name: string;
  description: string;
  dataAccess: {
    substances: boolean;
    environmental: boolean;
    lifecycle: boolean;
    technical: boolean;
  };
}

const ACCESS_LEVELS: AccessLevel[] = [
  {
    id: "public",
    name: "Public",
    description: "Données accessibles à tous",
    dataAccess: {
      substances: true,
      environmental: true,
      lifecycle: false,
      technical: false,
    },
  },
  {
    id: "authority",
    name: "Autorité",
    description: "Accès complet pour les autorités réglementaires",
    dataAccess: {
      substances: true,
      environmental: true,
      lifecycle: true,
      technical: true,
    },
  },
  {
    id: "manufacturer",
    name: "Fabricant",
    description: "Accès aux données techniques et de production",
    dataAccess: {
      substances: true,
      environmental: true,
      lifecycle: true,
      technical: true,
    },
  },
  {
    id: "recycler",
    name: "Recycleur",
    description: "Accès aux données de composition et de démontage",
    dataAccess: {
      substances: true,
      environmental: false,
      lifecycle: true,
      technical: true,
    },
  },
];

export function AccessControl() {
  const [selectedLevel, setSelectedLevel] = useState<string>("public");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ACCESS_LEVELS.map((level) => (
          <button
            key={level.id}
            className={`p-4 rounded-lg border text-left transition-colors ${
              selectedLevel === level.id
                ? "border-violet-500 bg-violet-50"
                : "border-gray-200 hover:border-violet-200"
            }`}
            onClick={() => setSelectedLevel(level.id)}
          >
            <h3 className="font-medium text-gray-900">{level.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{level.description}</p>
          </button>
        ))}
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-medium text-gray-900 mb-4">
          Droits d'accès pour :{" "}
          {ACCESS_LEVELS.find((l) => l.id === selectedLevel)?.name}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(
            ACCESS_LEVELS.find((l) => l.id === selectedLevel)?.dataAccess || {}
          ).map(([key, hasAccess]) => (
            <div
              key={key}
              className={`p-4 rounded-lg border ${
                hasAccess
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="capitalize">{key}</span>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    hasAccess
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {hasAccess ? "Autorisé" : "Restreint"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t">
        <button className="text-sm text-violet-600 hover:text-violet-800">
          Gérer les autorisations →
        </button>
      </div>
    </div>
  );
}
