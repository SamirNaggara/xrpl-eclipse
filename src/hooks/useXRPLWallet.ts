import { useState, useEffect } from "react";
import { Client } from "xrpl";

interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
}

// Utiliser le testnet XRPL
const client = new Client("wss://s.altnet.rippletest.net:51233");

export function useXRPLWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
  });

  useEffect(() => {
    // Vérifier si un cookie existe
    const cookies = document.cookie.split(";");
    const walletCookie = cookies.find((c) => c.trim().startsWith("wallet="));
    if (walletCookie) {
      const address = walletCookie.split("=")[1].trim();
      setWalletState({
        isConnected: true,
        address,
        balance: null,
      });
    }
  }, []);

  const connectWallet = async () => {
    let qrWindow: Window | null = null;

    try {
      // Créer une demande de connexion via notre API
      const response = await fetch("/api/xumm", {
        method: "POST",
      });

      const request = await response.json();

      if (!request) {
        throw new Error("Impossible de créer la demande de connexion");
      }

      // Ouvrir la fenêtre QR dans une nouvelle fenêtre
      if (request.refs.qr_png) {
        qrWindow = window.open("", "QR Code", "width=400,height=400");
        if (qrWindow) {
          qrWindow.document.write(`
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: white;">
              <img src="${request.refs.qr_png}" alt="QR Code" style="max-width: 300px;" />
              <p style="margin-top: 20px; font-family: sans-serif; color: #333;">Scannez ce QR code avec votre application XUMM</p>
              <a href="${request.next.always}" target="_blank" style="margin-top: 10px; color: blue; text-decoration: underline;">
                Ouvrir dans XUMM
              </a>
            </div>
          `);
        }
      }

      // Vérifier périodiquement le statut
      const checkStatus = async () => {
        const statusResponse = await fetch(`/api/xumm?uuid=${request.uuid}`);
        const status = await statusResponse.json();

        if (status.meta.signed) {
          try {
            // Connexion au client XRPL
            await client.connect();

            // Obtenir le solde du compte
            const accountData = await client.request({
              command: "account_info",
              account: status.response.account,
              ledger_index: "validated",
            });

            const balance = (
              Number(accountData.result.account_data.Balance) / 1000000
            ).toFixed(2);

            setWalletState({
              isConnected: true,
              address: status.response.account,
              balance: balance,
            });

            // Sauvegarder l'adresse dans un cookie (expire dans 24h)
            const d = new Date();
            d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
            document.cookie = `wallet=${
              status.response.account
            };expires=${d.toUTCString()};path=/`;

            // Fermer la connexion client
            client.disconnect();

            // Fermer la fenêtre QR si elle est ouverte
            if (qrWindow) {
              qrWindow.close();
            }

            return true;
          } catch (error) {
            console.error(
              "Erreur lors de la récupération des informations du compte:",
              error
            );
          }
        }
        return false;
      };

      // Vérifier toutes les 2 secondes jusqu'à ce que ce soit signé
      const interval = setInterval(async () => {
        const isSigned = await checkStatus();
        if (isSigned) {
          clearInterval(interval);
        }
      }, 2000);

      // Nettoyer l'intervalle après 5 minutes
      setTimeout(() => {
        clearInterval(interval);
        if (qrWindow) {
          qrWindow.close();
        }
      }, 300000);
    } catch (error) {
      console.error("Erreur lors de la connexion au wallet:", error);
      if (qrWindow) {
        qrWindow.close();
      }
    }
  };

  const disconnectWallet = () => {
    setWalletState({
      isConnected: false,
      address: null,
      balance: null,
    });
    // Supprimer le cookie
    document.cookie = "wallet=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  };

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
  };
}
