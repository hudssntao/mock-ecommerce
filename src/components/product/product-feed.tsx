"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { api } from "@/trpc/react";
import ProductCard, { ProductCardSkeleton } from "./product-card";

interface ProductFeedProps {
  batchSize?: number;
}

export default function ProductFeed({ batchSize = 12 }: ProductFeedProps) {
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
    { limit: batchSize },
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
      {isLoading &&
        Array.from({ length: batchSize }).map((_, index) => (
          <ProductCardSkeleton key={`skeleton-${index}`} />
        ))}
    </div>
  );
}
