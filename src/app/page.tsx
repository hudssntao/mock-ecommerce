import { FeaturedProduct, ProductFeed } from "@/components/product";
import { HydrateClient } from "@/trpc/server";

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
