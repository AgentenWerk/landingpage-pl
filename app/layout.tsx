import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = `${protocol}://${host}`;

  return {
    metadataBase: new URL(baseUrl),
    title:
      "Kosztorysant AI | Szybsze kosztorysy z przedmiarów i ofert",
    description:
      "Agent AI dla firm wykonawczych: czyta przedmiary, znajduje ceny, proponuje stawki i oznacza ryzyka. Kosztorysant zachowuje pełną kontrolę.",
    alternates: { canonical: "/" },
    openGraph: {
      title: "Kosztorysant AI",
      description:
        "Więcej kosztorysów ofertowych. Bez dodatkowej pracy ręcznej.",
      url: "/",
      siteName: "Kosztorysant AI",
      locale: "pl_PL",
      type: "website",
      images: [
        {
          url: `${baseUrl}/og.png`,
          width: 1200,
          height: 630,
          alt: "Kosztorysant AI — więcej kosztorysów ofertowych bez dodatkowej pracy ręcznej",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Kosztorysant AI",
      description:
        "Więcej kosztorysów ofertowych. Bez dodatkowej pracy ręcznej.",
      images: [`${baseUrl}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
