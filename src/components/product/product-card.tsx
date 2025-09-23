"use client";

import { Card, CardBody, CardFooter, Image, Skeleton } from "@heroui/react";
import Link from "next/link";
import ProductActions from "./product-actions";

/**
 * Props interface for the ProductCard component.
 */
interface ProductCardProps {
  /** Ref callback for intersection observer (used in infinite scroll) */
  ref: ((node?: HTMLDivElement | null) => void) | null;
  /** Unique product identifier */
  id: number;
  /** Product display name */
  name: string;
  /** Product description text */
  description: string;
  /** Product price in USD */
  price: number;
  /** URL to product image */
  imageUrl: string;
}

/**
 * ProductCard component displaying a product in a grid layout.
 * 
 * Renders a card with product image, name, description, and action buttons.
 * Supports intersection observer refs for infinite scroll functionality.
 * Includes navigation to product detail page and cart interaction.
 * 
 * @param props - ProductCard properties
 * @returns JSX element representing a product card
 * 
 * @example
 * ```typescript
 * <ProductCard
 *   ref={lastProductRef}
 *   id={product.id}
 *   name={product.name}
 *   description={product.description}
 *   price={product.price}
 *   imageUrl={product.imageUrl}
 * />
 * ```
 * 
 * @features
 * - Responsive design (300px fixed width)
 * - Truncated description with line clamping
 * - Clickable image linking to product detail
 * - Integrated cart actions (add/remove)
 * - Loading skeleton variant available
 */
export default function ProductCard({
  ref,
  id,
  name,
  description,
  price,
  imageUrl,
}: ProductCardProps) {
  return (
    <Card
      className="w-[300px] h-[338px] border border-primary rounded-xl p-[12px] shadow-md"
      ref={ref}
    >
      <CardBody className="flex flex-col gap-2 p-0">
        <Link href={`/products/${id}`} className="w-fit">
          <Image
            src={imageUrl}
            alt={name}
            width={276}
            height={156}
            className="w-full h-full rounded-xl object-cover"
          />
        </Link>
        <div className="px-2">
          <h2 className="font-sans font-medium text-lg leading-6 tracking-tight">
            {name}
          </h2>
          <p className="font-sans font-medium text-sm leading-5 tracking-tight text-zinc-400 line-clamp-4">
            {description}
          </p>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between items-center w-full p-0 pt-1">
        <ProductActions
          id={id}
          name={name}
          description={description}
          price={price}
          imageUrl={imageUrl}
        />
      </CardFooter>
    </Card>
  );
}

/**
 * Loading skeleton component for ProductCard.
 * 
 * Displays a placeholder card with animated skeleton elements while
 * product data is loading. Maintains the same dimensions and layout
 * as the actual ProductCard for consistent user experience.
 * 
 * @returns JSX element representing a loading skeleton
 * 
 * @example
 * ```typescript
 * // Show skeletons while loading
 * {isLoading && (
 *   <>
 *     <ProductCardSkeleton />
 *     <ProductCardSkeleton />
 *     <ProductCardSkeleton />
 *   </>
 * )}
 * ```
 */
export function ProductCardSkeleton() {
  return (
    <Card className="w-[300px] h-[338px] rounded-xl p-[12px] bg-gray-50">
      <CardBody className="flex flex-col gap-2 p-0">
        <Skeleton className="w-[276px] h-[156px] rounded-xl bg-gray-100" />
        <div className="px-2">
          <Skeleton className="h-6 w-3/4 rounded-lg mb-2 bg-gray-100" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded-lg bg-gray-100" />
            <Skeleton className="h-4 w-full rounded-lg bg-gray-100" />
            <Skeleton className="h-4 w-2/3 rounded-lg bg-gray-100" />
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between items-center w-full p-0 pt-3">
        <Skeleton className="h-10 w-20 rounded-xl bg-gray-100" />
        <Skeleton className="h-10 w-44 rounded-xl bg-gray-100" />
      </CardFooter>
    </Card>
  );
}
