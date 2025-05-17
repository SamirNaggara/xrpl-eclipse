"use client";

interface VerifyButtonProps {
  txID: string;
  className?: string;
}

export default function VerifyButton({
  txID,
  className = "",
}: VerifyButtonProps) {
  const handleVerification = () => {
    window.open(`https://testnet.xrpl.org/transactions/${txID}`, "_blank");
  };

  return (
    <button
      onClick={handleVerification}
      className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors ${className}`}
    >
      Vérifier l'authenticité
    </button>
  );
}
