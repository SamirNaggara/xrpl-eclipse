import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Passeport Produit XRPL",
  description: "Passeport numérique pour montre connectée sur XRPL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/logo-safeout2.png" sizes="any" />
        <Script
          src="https://xumm.app/assets/cdn/xumm.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50 text-gray-900`}
      >
        <header className="flex items-center gap-2 p-4 border-b border-gray-200">
          <Image
            src="/logo-safeout2.png"
            alt="Logo Safeout"
            width={40}
            height={40}
            className="rounded"
            priority
          />
          <span className="font-bold text-lg">Brand-Controlled Token</span>
        </header>
        {children}
      </body>
    </html>
  );
}
