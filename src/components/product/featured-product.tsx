"use client";

import { Image, Skeleton } from "@heroui/react";
import Link from "next/link";
import { api } from "@/trpc/react";

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
