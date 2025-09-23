import type { Metadata } from "next";
import { FeaturedProduct, ProductFeed } from "@/components/product";
import { HydrateClient } from "@/trpc/server";

export const metadata: Metadata = {
  title: "Your Online Shopping Destination",
  description: "Discover amazing products at great prices. Browse our featured items and extensive product catalog. Shop with confidence at Not Amazon.",
  openGraph: {
    title: "Your Online Shopping Destination",
    description: "Discover amazing products at great prices. Browse our featured items and extensive product catalog.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Online Shopping Destination", 
    description: "Discover amazing products at great prices. Browse our featured items and extensive product catalog.",
  },
};

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center gap-6">
        <FeaturedProduct />
        <ProductFeed />
      </main>
    </HydrateClient>
  );
}
