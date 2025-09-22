import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import { CartProvider } from "@/lib";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "Not Amazon",
  description: "Not the real Amazon.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
