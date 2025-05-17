"use client";

import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/ui/button";

export function ConnectWallet() {
  const { isConnected, wallet, balance, role, error, connect, disconnect } =
    useWallet();

  return (
    <div className="flex flex-col gap-2">
      {error && <div className="text-red-500 text-sm">{error}</div>}

      {isConnected && wallet ? (
        <div className="flex flex-col gap-2">
          <div className="text-sm font-mono bg-gray-100 p-2 rounded">
            {wallet.address}
          </div>
          <div className="text-sm font-mono bg-gray-100/50 p-2 rounded">
            Balance: {balance} XRP
          </div>
          {role && (
            <div className="text-sm">
              Rôle : <span className="font-semibold capitalize">{role}</span>
            </div>
          )}
          <Button
            variant="outline"
            onClick={disconnect}
            className="text-red-500"
          >
            Déconnecter le Wallet
          </Button>
        </div>
      ) : (
        <Button
          onClick={connect}
          className="bg-violet-600 hover:bg-violet-700 text-white"
        >
          Créer un Wallet de Test
        </Button>
      )}
    </div>
  );
}
