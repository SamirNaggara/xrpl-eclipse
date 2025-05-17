"use client";

import { useState, useEffect } from "react";
import { xrplService } from "@/lib/xrpl-service";
import type { Wallet } from "xrpl";

interface WalletState {
  isConnected: boolean;
  wallet: Wallet | null;
  balance: string;
  role: "owner" | "brand" | null;
  error: string | null;
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    isConnected: false,
    wallet: null,
    balance: "0.00",
    role: null,
    error: null,
  });

  const connect = async () => {
    try {
      await xrplService.connectAsNewWallet();
      const wallet = xrplService.getWallet();
      const role = xrplService.getRole();
      const balance = await xrplService.getBalance();

      if (!wallet) {
        throw new Error("Échec de la création du wallet");
      }

      setState({
        isConnected: true,
        wallet,
        balance,
        role,
        error: null,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : "Erreur de connexion",
      }));
    }
  };

  const disconnect = async () => {
    try {
      await xrplService.disconnect();
      setState({
        isConnected: false,
        wallet: null,
        balance: "0.00",
        role: null,
        error: null,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : "Erreur de déconnexion",
      }));
    }
  };

  useEffect(() => {
    return () => {
      xrplService.disconnect();
    };
  }, []);

  return {
    ...state,
    connect,
    disconnect,
  };
}
