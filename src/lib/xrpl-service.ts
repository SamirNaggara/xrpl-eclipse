"use client";

import { Client, Wallet, convertStringToHex } from "xrpl";

// Configuration pour le testnet (comme recommandé par le hackathon)
const XRPL_CONFIG = {
  server: "wss://s.devnet.rippletest.net:51233",
  maxRetries: 10,
  retryInterval: 2000,
} as const;

// Adresses de test pour la démo
export const MOCK_ROLES = {
  OWNER: "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
  BRAND: "rwg12GMSypywW4gxaTznd6iZ7pdBGahM2T",
} as const;

// Clés du wallet brand (à ne pas exposer en production !)
const BRAND_WALLET = {
  address: MOCK_ROLES.BRAND,
  privateKey:
    "EDA00201E5C4EA9445B62CBA107F909898A4FCE1DD727B86F113FEBCD68C3CF0E5",
  publicKey:
    "EDD5989C078490EFC3CCD29B7A455AF34B2176A2E21CCBBDC9D865C03D0807903B",
};

class XRPLService {
  private static instance: XRPLService;
  private client: Client | null = null;
  private wallet: Wallet | null = null;

  private constructor() {}

  static getInstance(): XRPLService {
    if (!XRPLService.instance) {
      XRPLService.instance = new XRPLService();
    }
    return XRPLService.instance;
  }

  private async waitForAccountFunding(wallet: Wallet): Promise<void> {
    if (!this.client) throw new Error("Client non connecté");

    let attempts = 0;
    while (attempts < XRPL_CONFIG.maxRetries) {
      try {
        await this.client.request({
          command: "account_info",
          account: wallet.address,
          ledger_index: "validated",
        });
        return;
      } catch {
        attempts++;
        if (attempts === XRPL_CONFIG.maxRetries) {
          throw new Error(
            "Le compte n'a pas été créé après plusieurs tentatives"
          );
        }
        await new Promise((resolve) =>
          setTimeout(resolve, XRPL_CONFIG.retryInterval)
        );
      }
    }
  }

  async connectAsNewWallet(): Promise<void> {
    try {
      if (!this.client) {
        this.client = new Client(XRPL_CONFIG.server);
        await this.client.connect();
      }

      const fundResult = await this.client.fundWallet();
      this.wallet = fundResult.wallet;
      console.log("Nouveau wallet créé:", this.wallet.address);

      await this.waitForAccountFunding(this.wallet);
    } catch (error) {
      console.error("Erreur lors de la création du wallet:", error);
      throw error;
    }
  }

  async connectAsBrand(): Promise<void> {
    try {
      if (!this.client) {
        this.client = new Client(XRPL_CONFIG.server);
        await this.client.connect();
      }

      this.wallet = Wallet.fromSeed(BRAND_WALLET.privateKey);
      console.log("Connecté en tant que Brand:", this.wallet.address);

      await this.waitForAccountFunding(this.wallet);
    } catch (error) {
      console.error("Erreur de connexion en tant que brand:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.disconnect();
      this.client = null;
      this.wallet = null;
    }
  }

  getWallet(): Wallet | null {
    return this.wallet;
  }

  async getBalance(): Promise<string> {
    if (!this.client || !this.wallet) {
      throw new Error("Client ou wallet non connecté");
    }

    try {
      const response = await this.client.request({
        command: "account_info",
        account: this.wallet.address,
        ledger_index: "validated",
      });

      const balanceInDrops = response.result.account_data.Balance;
      const balanceInXRP = (parseInt(balanceInDrops) / 1_000_000).toFixed(2);
      return balanceInXRP;
    } catch (error) {
      console.error("Erreur lors de la récupération du solde:", error);
      return "0.00";
    }
  }

  getRole(): "owner" | "brand" | null {
    if (!this.wallet) return null;
    if (this.wallet.address === MOCK_ROLES.OWNER) return "owner";
    if (this.wallet.address === MOCK_ROLES.BRAND) return "brand";
    return null;
  }

  // Nouvelles fonctionnalités recommandées par le hackathon
  async sendPayment(destination: string, amount: string): Promise<void> {
    if (!this.client || !this.wallet) {
      throw new Error("Client ou wallet non connecté");
    }

    try {
      const prepared = await this.client.autofill({
        TransactionType: "Payment",
        Account: this.wallet.address,
        Amount: (parseFloat(amount) * 1_000_000).toString(),
        Destination: destination,
      });

      const signed = this.wallet.sign(prepared);
      const result = await this.client.submitAndWait(signed.tx_blob);

      if (result.result.meta.TransactionResult !== "tesSUCCESS") {
        throw new Error(
          `Transaction échouée: ${result.result.meta.TransactionResult}`
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du paiement:", error);
      throw error;
    }
  }

  async setMessageOnLedger(message: string): Promise<void> {
    if (!this.client || !this.wallet) {
      throw new Error("Client ou wallet non connecté");
    }

    try {
      const prepared = await this.client.autofill({
        TransactionType: "Payment",
        Account: this.wallet.address,
        Amount: "0",
        Destination: this.wallet.address,
        Memos: [
          {
            Memo: {
              MemoData: convertStringToHex(message),
              MemoType: convertStringToHex("message"),
              MemoFormat: convertStringToHex("text/plain"),
            },
          },
        ],
      });

      const signed = this.wallet.sign(prepared);
      await this.client.submitAndWait(signed.tx_blob);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du message:", error);
      throw error;
    }
  }
}

export const xrplService = XRPLService.getInstance();
