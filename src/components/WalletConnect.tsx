"use client";

import { useXRPLWallet } from "@/hooks/useXRPLWallet";

export function WalletConnect() {
  const { isConnected, address, connectWallet, disconnectWallet } =
    useXRPLWallet();

  return (
    <div className="flex items-center gap-4 justify-center">
      {isConnected ? (
        <>
          <div className="text-sm">
            <span className="text-gray-500">Connecté avec:</span>
            <code className="ml-2 px-2 py-1 bg-gray-100 rounded">
              {address}
            </code>
          </div>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            Déconnexion
          </button>
        </>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Connecter avec XUMM
        </button>
      )}
    </div>
  );
}
