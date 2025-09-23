import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import { CartProvider } from "@/lib";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: {
    default: "Not Amazon",
    template: "%s | Not Amazon",
  },
  description: "Your trusted online shopping destination with great products at amazing prices.",
  keywords: ["ecommerce", "shopping", "online store", "products", "deals"],
  authors: [{ name: "Not Amazon Team" }],
  creator: "Not Amazon",
  publisher: "Not Amazon",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: new URL(
    process.env.NODE_ENV === 'production' 
      ? 'https://not-amazon.com'
      : 'http://localhost:3000'
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Not Amazon",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <TRPCReactProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
