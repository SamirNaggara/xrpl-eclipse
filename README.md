# PoC Brand-Controlled Token (Next.js)

## Installation

```bash
pnpm install
```

## Lancement

```bash
pnpm dev
```

## URL de test

[http://localhost:3000/scan?id=nft001](http://localhost:3000/scan?id=nft001)

## Fonctionnement

- La page `/scan` affiche les données publiques d'un NFT mock.
- Cliquez sur "Débloquer" et choisissez un rôle (Owner ou Brand) pour simuler l'accès à des données privées.
- Owner : dévoile le bloc Owner (bleu).
- Brand : dévoile Owner (bleu) + Brand (violet).
- Les cookies de rôle sont simulés (10 min).

## Stack

- Next.js App Router, TypeScript
- Tailwind CSS, shadcn/ui
- qrcode.react, framer-motion (optionnel)

Aucune logique XRPL réelle : tout est mocké côté front et API.
