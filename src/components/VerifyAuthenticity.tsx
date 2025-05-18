"use client";

import { useState, useEffect, useRef } from "react";
import { Client } from "xrpl";

interface XRPLTransaction {
  Account: string;
  Fee: string;
  date?: number;
  validated: boolean;
}

interface VerifyAuthenticityProps {
  txID?: string;
}

interface VerificationStatus {
  isVerified: boolean;
  message: string;
  details?: {
    date: string;
    account: string;
    fee: string;
  };
}

export function VerifyAuthenticity({ txID }: VerifyAuthenticityProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [status, setStatus] = useState<VerificationStatus | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setStatus(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!txID) {
    return (
      <button
        className="text-gray-500 hover:text-gray-600 text-sm font-medium cursor-not-allowed"
        disabled
        title="Aucun token de certification trouvé"
      >
        Vérifier l&apos;authenticité →
      </button>
    );
  }

  const handleVerification = async () => {
    setIsVerifying(true);
    setStatus(null);

    try {
      // Connexion au client XRPL testnet
      const client = new Client("wss://s.altnet.rippletest.net:51233");
      await client.connect();

      // Récupération de la transaction
      const tx = await client.request({
        command: "tx",
        transaction: txID,
      });

      const result = tx.result as unknown as XRPLTransaction;

      if (result.validated) {
        const date = new Date().toLocaleString("fr-FR", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        });
        setStatus({
          isVerified: true,
          message: "Certification vérifiée sur XRPL",
          details: {
            date,
            account: result.Account || "Inconnu",
            fee: `${Number(result.Fee || 0) / 1000000} XRP`,
          },
        });
      } else {
        setStatus({
          isVerified: false,
          message: "Transaction non validée sur XRPL",
        });
      }

      await client.disconnect();
    } catch (error) {
      console.error("Erreur lors de la vérification:", error);
      setStatus({
        isVerified: false,
        message: "Erreur lors de la vérification",
      });
    }

    setIsVerifying(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleVerification}
        disabled={isVerifying}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
          isVerifying
            ? "bg-gray-100 text-gray-500"
            : status?.isVerified
            ? "bg-green-50 text-green-700 hover:bg-green-100"
            : "bg-blue-50 text-blue-700 hover:bg-blue-100"
        }`}
      >
        {isVerifying ? (
          <>
            <svg
              className="animate-spin h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Vérification en cours...</span>
          </>
        ) : (
          <>
            {status?.isVerified ? (
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
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
            )}
            <span>
              {status?.isVerified
                ? "Certification vérifiée"
                : "Vérifier l'authenticité"}
            </span>
          </>
        )}
      </button>

      {status && (
        <div
          ref={popupRef}
          className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border p-4 z-10"
        >
          <div
            className={`text-sm font-medium mb-2 ${
              status.isVerified ? "text-green-700" : "text-red-700"
            }`}
          >
            {status.message}
          </div>
          {status.details && (
            <div className="text-sm space-y-1 text-gray-600">
              <p>
                <span className="font-medium">Date :</span>{" "}
                {status.details.date}
              </p>
              <p>
                <span className="font-medium">Compte :</span>{" "}
                {status.details.account}
              </p>
              <p>
                <span className="font-medium">Frais :</span>{" "}
                {status.details.fee}
              </p>
            </div>
          )}
          <div className="mt-3 text-xs text-gray-500">
            <a
              href={`https://testnet.xrpl.org/transactions/${txID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Voir sur XRPL Explorer →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
