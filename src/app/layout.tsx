import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, EB_Garamond } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import CookieNotice from "@/components/CookieNotice";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { alternatesFor } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F7FCFF",
};

export const metadata: Metadata = {
  title: {
    default: "RNJ Advisory - Cabinet de conseil stratégique et réglementaire",
    template: "%s | RNJ Advisory",
  },
  description:
    "Cabinet de conseil stratégique et réglementaire spécialisé dans l'analyse institutionnelle, la conformité réglementaire et le développement économique durable. Accompagnement des acteurs publics, entreprises privées et investisseurs.",
  keywords: [
    "conseil stratégique Bruxelles",
    "conformité réglementaire Belgique",
    "analyse institutionnelle",
    "conseil juridique Bruxelles",
    "RGPD Belgique",
    "ESG conseil Belgique",
    "création entreprise Belgique",
    "PPP Tunisie",
    "recrutement international",
    "développement économique durable",
    "RNJ Advisory",
    "cabinet conseil Bruxelles",
    "Tunisie",
    "Europe",
    "Afrique du Nord",
  ],
  authors: [{ name: "RNJ Advisory" }],
  creator: "RNJ Advisory",
  publisher: "RNJ Advisory",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RNJ Advisory",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://rnj-advisory.be"),
  alternates: alternatesFor("/"),
  openGraph: {
    images: ['/opengraph-image.png'],
    type: "website",
    locale: "fr_BE",
    url: "https://rnj-advisory.be",
    title: "RNJ Advisory - Cabinet de conseil stratégique et réglementaire",
    description:
      "Cabinet de conseil stratégique et réglementaire spécialisé dans l'analyse institutionnelle et la conformité réglementaire.",
    siteName: "RNJ Advisory",
  },
  twitter: {
    card: "summary_large_image",
    title: "RNJ Advisory - Cabinet de conseil stratégique",
    description:
      "Conseil stratégique et réglementaire pour acteurs publics, entreprises et investisseurs.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": 150,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:good,w_1920,c_limit/v1779671376/rnj/optimized/wind-energy-wind-power-sustainable-renewable-en-2026-03-18-04-35-53-utc-1-84fe3c19.webp"
          fetchPriority="high"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ebGaramond.variable} antialiased`}
      >
        <JsonLd />
        {children}
        <CookieNotice />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
