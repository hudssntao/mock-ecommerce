"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { api } from "@/trpc/react";
import ProductCard, { ProductCardSkeleton } from "./product-card";

/**
 * Props interface for the ProductFeed component.
 */
interface ProductFeedProps {
  /** Number of products to fetch per batch (default: 12) */
  batchSize?: number;
  /** Product ID to exclude from results (useful for related products) */
  excludeId?: number;
}

/**
 * Product feed component implementing infinite scroll for product listings.
 * 
 * Displays a grid of products with automatic loading of additional items as the user
 * scrolls. Uses intersection observer to detect when the last item comes into view
 * and triggers the next batch fetch. Includes loading states, error handling, and
 * skeleton components for smooth UX.
 * 
 * @param props - ProductFeed properties
 * @returns JSX element representing the product grid with infinite scroll
 * 
 * @example
 * ```typescript
 * // On homepage - show all products
 * <ProductFeed batchSize={20} />
 * 
 * // On product detail page - show related products
 * <ProductFeed batchSize={4} excludeId={currentProductId} />
 * ```
 * 
 * @features
 * - Infinite scroll with intersection observer
 * - Cursor-based pagination for efficient loading
 * - Loading skeletons during data fetching
 * - Error handling with user-friendly messages
 * - Configurable batch sizes for different contexts
 * - Product exclusion for related product sections
 * - Responsive grid layout (1024px width)
 * 
 * @performance
 * - Uses react-intersection-observer for efficient scroll detection
 * - 100px root margin for preemptive loading
 * - Skeleton components prevent layout shift
 * - Optimized re-renders with proper dependency arrays
 * 
 * @behavior
 * - Automatically loads next batch when last item is 10% visible
 * - Shows loading skeletons during initial load and pagination
 * - Displays error state with retry information
 * - Maintains scroll position during data updates
 */
export default function ProductFeed({ batchSize = 12, excludeId }: ProductFeedProps) {
  const { ref: lastItemRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: "100px",
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = api.product.getInfinite.useInfiniteQuery(
    { limit: batchSize, excludeId },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Error loading products
          </h3>
          <p className="text-foreground-500">
            {error?.message || "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  const products = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className="w-[1024px] flex flex-wrap gap-6 justify-between">
      {products.map((product, index) => {
        const is_last = index === products.length - 1;
        const ref = is_last ? lastItemRef : null;

        return (
          <ProductCard
            ref={ref}
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        );
      })}
      {(isLoading || isFetchingNextPage) &&
        Array.from({ length: batchSize }).map((_, index) => (
          <ProductCardSkeleton key={`skeleton-${index}`} />
        ))}
    </div>
  );
}
