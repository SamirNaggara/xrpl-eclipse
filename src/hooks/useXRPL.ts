"use client";

import { useState, useEffect } from "react";
import { Client, Wallet } from "xrpl";

// Adresses de test pour la démo
const MOCK_ADDRESSES = {
  OWNER: "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
  BRAND: "rDsbeamud4WDQKK5jkf9p8kYCtzWVQKqHY",
} as const;

export interface XRPLState {
  client: Client | null;
  wallet: Wallet | null;
  isConnected: boolean;
  error: string | null;
  role: "owner" | "brand" | null;
}

export function useXRPL() {
  const [state, setState] = useState<XRPLState>({
    client: null,
    wallet: null,
    isConnected: false,
    error: null,
    role: null,
  });

  const connectToTestnet = async () => {
    try {
      const client = new Client("wss://s.altnet.rippletest.net:51233");
      await client.connect();

      // Créer un wallet test pour la démo
      const testWallet = Wallet.generate();

      // Pour la démo, on simule un rôle en fonction de l'adresse
      let role: "owner" | "brand" | null = null;
      if (testWallet.address === MOCK_ADDRESSES.OWNER) {
        role = "owner";
      } else if (testWallet.address === MOCK_ADDRESSES.BRAND) {
        role = "brand";
      }

      setState({
        client,
        wallet: testWallet,
        isConnected: true,
        error: null,
        role,
      });
    } catch (err) {
      setState((prev: XRPLState) => ({
        ...prev,
        error: err instanceof Error ? err.message : "Failed to connect",
      }));
    }
  };

  const disconnect = async () => {
    if (state.client) {
      await state.client.disconnect();
      setState({
        client: null,
        wallet: null,
        isConnected: false,
        error: null,
        role: null,
      });
    }
  };

  const signMessage = async (message: string): Promise<string | null> => {
    if (!state.wallet) {
      setState((prev: XRPLState) => ({
        ...prev,
        error: "No wallet connected",
      }));
      return null;
    }

    try {
      // Pour la démo, on simule une signature
      return `${state.wallet.address}:${message}`;
    } catch (err) {
      setState((prev: XRPLState) => ({
        ...prev,
        error: err instanceof Error ? err.message : "Failed to sign message",
      }));
      return null;
    }
  };

  useEffect(() => {
    return () => {
      if (state.client) {
        state.client.disconnect();
      }
    };
  }, []);

  return {
    ...state,
    connectToTestnet,
    disconnect,
    signMessage,
  };
}
