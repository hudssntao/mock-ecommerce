"use client";

import { Image, Skeleton } from "@heroui/react";
import Link from "next/link";
import { api } from "@/trpc/react";

/**
 * Featured product component displaying the daily highlighted product.
 * 
 * Fetches and displays the featured product with optimized caching strategy.
 * The featured product rotates daily using a deterministic algorithm on the server.
 * Includes loading states and error handling for a smooth user experience.
 * 
 * @returns JSX element representing the featured product or loading state
 * 
 * @example
 * ```typescript
 * // On homepage
 * export default function Home() {
 *   return (
 *     <main>
 *       <FeaturedProduct />
 *       <ProductFeed />
 *     </main>
 *   );
 * }
 * ```
 * 
 * @features
 * - Daily product rotation with server-side deterministic selection
 * - Optimized caching (24-hour stale time and garbage collection)
 * - Loading skeleton with matching dimensions
 * - Error handling with graceful fallback
 * - Click-through navigation to product detail page
 * - Large hero image format (1024x408px)
 * 
 * @performance
 * - No refetch on window focus or reconnect
 * - Skeleton loading prevents layout shift
 */
export default function FeaturedProduct() {
  const {
    data: product,
    isLoading,
    error,
  } = api.product.getFeatured.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000, 
  });

  if (isLoading) {
    return (
      <Skeleton className="w-[1024px] h-[408px] rounded-xl bg-gray-100 animate-pulse" />
    );
  }

  if (error || !product) {
    return;
  }

  return (
    <Link href={`/products/${product.id}`} className="w-fit">
      <div className="w-[1024px] h-[408px] rounded-xl">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={1024}
          height={408}
          className="rounded-xl object-cover h-full w-full"
        />
      </div>
    </Link>
  );
}
