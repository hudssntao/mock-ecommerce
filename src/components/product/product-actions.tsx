import { Button, ButtonGroup } from "@heroui/react";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useCartWithSync } from "@/hooks";
import { formatPrice } from "@/utils/format";

/**
 * Props interface for the ProductActions component.
 */
type ProductActionsProps = {
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
  /** Optional CSS classes for styling customization */
  className?: string;
};

/**
 * Product actions component providing cart interaction and price display.
 * 
 * Displays the product price as a clickable button linking to the product detail page,
 * and provides cart interaction controls. Shows different UI states based on whether
 * the item is in the cart (quantity controls) or not (add to cart button).
 * 
 * @param props - ProductActions properties
 * @returns JSX element representing product action controls
 * 
 * @example
 * ```typescript
 * // In ProductCard
 * <ProductActions
 *   id={product.id}
 *   name={product.name}
 *   description={product.description}
 *   price={product.price}
 *   imageUrl={product.imageUrl}
 *   className="mt-4"
 * />
 * ```
 * 
 * @features
 * - Formatted price display with link to product detail
 * - Dynamic UI: Add to cart button vs quantity controls
 * - Optimistic updates with server synchronization
 * - Plus/minus buttons for quantity adjustment
 * - Visual feedback for cart operations
 * - Responsive button sizing (w-44 h-10)
 * 
 * @behavior
 * - When item not in cart: Shows "Add to Cart" button
 * - When item in cart: Shows quantity controls with +/- buttons
 * - Price button always links to product detail page
 * - All cart operations use optimistic updates
 */
export default function ProductActions({
  id,
  name,
  description,
  price,
  imageUrl,
  className,
}: ProductActionsProps) {
  const { updateQuantity, getCartItem } = useCartWithSync();

  const cartItem = getCartItem(id);
  const cartQuantity = cartItem?.quantity || 0;

  const product = {
    id,
    name,
    description,
    price,
    imageUrl,
  };

  const handleAddToCart = async () => {
    await updateQuantity(id, cartQuantity + 1, product);
  };

  const handleRemoveFromCart = async () => {
    await updateQuantity(id, cartQuantity - 1, product);
  };

  return (
    <div className={`flex w-full justify-between items-center ${className}`}>
      <Link href={`/products/${id}`} className="w-fit">
        <Button className="font-sans font-semibold text-sm leading-5 tracking-tight px-[14px] py-[10px]">
          {formatPrice(price)}
        </Button>
      </Link>
      {cartQuantity > 0 ? (
        <ButtonGroup
          variant="flat"
          className="flex w-44 h-10 gap-2 items-center justify-between"
        >
          <Button
            onPress={handleRemoveFromCart}
            className="flex items-center justify-center w-16 h-10 bg-button-primary-background rounded-xl"
          >
            <Minus size={16} />
          </Button>
          {cartQuantity}
          <Button
            onPress={handleAddToCart}
            className="flex items-center justify-center w-16 h-10 bg-button-primary-background rounded-xl"
          >
            <Plus size={16} />
          </Button>
        </ButtonGroup>
      ) : (
        <Button
          onPress={handleAddToCart}
          className="bg-button-primary-background rounded-xl font-sans font-medium text-sm leading-5 tracking-tight w-44 h-10"
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
}
