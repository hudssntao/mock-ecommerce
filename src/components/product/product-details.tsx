"use client";

import { Image } from "@heroui/react";
import ProductActions from "./product-actions";

/**
 * Props interface for the ProductDetails component.
 */
type ProductDetailsProps = {
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
};

/**
 * Product details component for displaying full product information.
 * 
 * Renders a detailed view of a product with large image, title, description,
 * and action controls. Used on product detail pages to provide comprehensive
 * product information in a two-column layout.
 * 
 * @param props - ProductDetails properties
 * @returns JSX element representing the product detail view
 * 
 * @example
 * ```typescript
 * // In product detail page
 * export default function ProductPage({ params }) {
 *   const product = await getProduct(params.id);
 *   
 *   return (
 *     <main className="flex justify-center">
 *       <ProductDetails
 *         id={product.id}
 *         name={product.name}
 *         description={product.description}
 *         price={product.price}
 *         imageUrl={product.imageUrl}
 *       />
 *     </main>
 *   );
 * }
 * ```
 * 
 * @features
 * - Large product image (512x512px) with rounded corners
 * - Prominent product title with large font size (40px)
 * - Full description text display
 * - Integrated cart actions with custom styling
 * - Two-column responsive layout (1024px width)
 * - Minimum height constraint for consistent layout
 * 
 * @layout
 * - Left column: Product image (512px square)
 * - Right column: Title, description, and actions
 * - Centered container with fixed width
 * - Gap spacing between elements (24px)
 */
export default function ProductDetails({
  id,
  name,
  description,
  price,
  imageUrl,
}: ProductDetailsProps) {
  return (
    <div className="flex items-center justify-center gap-6 w-[1024px] min-h-[512px]">
      <Image
        width={512}
        height={512}
        src={imageUrl}
        alt={name}
        className="rounded-xl object-cover h-full w-full"
      />
      <div className="flex flex-col gap-6 flex-1">
        <h1 className="font-sans font-medium text-[40px] leading-6 tracking-tight">
          {name}
        </h1>
        <p className="font-sans font-medium text-sm leading-5 tracking-tight text-zinc-400">
          {description}
        </p>
        <ProductActions
          id={id}
          name={name}
          description={description}
          price={price}
          imageUrl={imageUrl}
          className="justify-start gap-4"
        />
      </div>
    </div>
  );
}
