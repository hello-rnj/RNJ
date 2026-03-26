import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    "conseil stratégique",
    "conformité réglementaire",
    "analyse institutionnelle",
    "développement économique",
    "acteurs publics",
    "entreprises privées",
    "investisseurs",
    "RNJ Advisory",
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
