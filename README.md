# Certification de Produits sur XRPL

> **Projet lauréat du XRPL Commons Hackathon, Paris, mai 2025** (retenu par le jury parmi 14 projets).
> Démo : https://xrpl-eclipse.vercel.app
> Réalisé en deux jours. Le livrable : permettre à une marque de créer une identité numérique pour chacun de ses produits sur le XRP Ledger, et relier données off-chain et on-chain.

Une application Next.js permettant de certifier l'authenticité des produits en utilisant la blockchain XRPL (XRP Ledger) via des NFTokens. Cette solution offre une traçabilité transparente et immuable pour la certification des produits. À terme, le projet évoluera vers l'utilisation des mpTokens (Multi-Purpose Tokens) pour offrir des fonctionnalités avancées de certification.

## 🌟 Caractéristiques Principales

- Certification de produits via NFTokens sur XRPL (avec transition prévue vers mpTokens)
- Intégration avec Xaman (anciennement XUMM) pour la signature des transactions
- Interface utilisateur moderne et intuitive
- Système de vérification d'authenticité des produits
- Gestion sécurisée des connexions utilisateurs

## 🚀 Technologies Utilisées

- Next.js
- XRPL (XRP Ledger)
- Xaman (XUMM) Wallet
- TypeScript
- Tailwind CSS

## 📋 Prérequis

- Node.js (version 16 ou supérieure)
- pnpm (gestionnaire de paquets)
- Un wallet Xaman
- Clés API Xaman

## 🛠️ Installation

1. Clonez le repository :

```bash
git clone [URL_DU_REPO]
cd xrpl
```

2. Installez les dépendances :

```bash
pnpm install
```

3. Configurez les variables d'environnement :
   Créez un fichier `.env.local` avec :

```
NEXT_PUBLIC_XUMM_API_KEY=votre_api_key
XUMM_API_SECRET=votre_api_secret
```

4. Lancez l'application en mode développement :

```bash
pnpm dev
```

## 🔍 Fonctionnalités Détaillées

### Certification de Produits

- Accédez à la page `/certify` pour créer un nouveau certificat
- Remplissez les informations du produit
- Signez la transaction avec Xaman
- Le hash des informations est stocké sur la blockchain

### Vérification d'Authenticité

- Utilisez le bouton "Vérifier l'authenticité" dans le passeport produit
- Consultez l'historique des certifications
- Vérifiez la validité des certificats

## 🔐 Sécurité

- Authentification requise pour la certification
- Protection des routes sensibles
- Gestion sécurisée des clés API

## 📝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 🤝 Support

Pour toute question ou problème, veuillez ouvrir une issue dans le repository.

## 🗺️ Feuille de Route

- [x] Implémentation initiale avec NFTokens
- [ ] Migration vers mpTokens pour des fonctionnalités avancées
- [ ] Intégration de fonctionnalités spécifiques aux mpTokens
- [ ] Amélioration des capacités de traçabilité
