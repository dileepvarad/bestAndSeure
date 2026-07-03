// app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Best & Secure Tours & Travels | Premium Cab Service in Visakhapatnam",
  description:
    "Best & Secure Tours & Travels — Visakhapatnam's most trusted premium cab rental service. Airport transfers, outstation trips, group tours, corporate travel & wedding rentals. Available 24x7. Call: +91 86913 33397",
  keywords:
    "cab service Visakhapatnam, car rental Vizag, airport transfer Vizag, Araku Valley trip, outstation cab, group tours Vizag, Best Secure Tours, premium taxi Vizag, tempo traveller Vizag, wedding car rental",
  openGraph: {
    title: "Best & Secure Tours & Travels | Premium Cab Service Visakhapatnam",
    description:
      "Premium cab service in Visakhapatnam. Airport transfers, outstation trips, group tours, and wedding rentals. Available 24x7.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="IN-AP" />
        <meta name="geo.placename" content="Visakhapatnam" />
        <link rel="canonical" href="https://bestsecuretours.in" />
      </head>
      <body className="font-sans bg-black text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}