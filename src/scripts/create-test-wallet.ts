import { Client, Wallet } from "xrpl";

async function main() {
  console.log("Création d'un wallet de test...");

  // Connexion au testnet
  const client = new Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  try {
    // Générer un nouveau wallet
    const fund_result = await client.fundWallet();
    const test_wallet = fund_result.wallet;

    console.log("\nWallet créé avec succès !");
    console.log("===================");
    console.log("Adresse:", test_wallet.address);
    console.log("Clé privée:", test_wallet.privateKey);
    console.log("Clé publique:", test_wallet.publicKey);
    console.log("Balance:", fund_result.balance, "XRP");
    console.log("\nGardez ces informations en lieu sûr !");
  } catch (err) {
    console.error("Erreur lors de la création du wallet:", err);
  }

  await client.disconnect();
}

main();
