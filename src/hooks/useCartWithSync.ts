import { useCallback } from "react";
import type { Product } from "@/db/entities/Product";
import { api } from "@/trpc/react";
import { useCart } from ".";

/**
 * Enhanced cart hook with server synchronization capabilities.
 * 
 * Extends the basic useCart hook by adding automatic server synchronization
 * for cart operations. Updates are applied optimistically to the local state
 * first, then synchronized with the database. Provides loading states for
 * better UX during server operations.
 * 
 * @returns Enhanced cart context with server sync and loading states
 * 
 * @example
 * ```typescript
 * function ProductActions({ product }) {
 *   const { updateQuantity, isUpdating, getCartItem } = useCartWithSync();
 *   const cartItem = getCartItem(product.id);
 *   
 *   const handleAddToCart = async () => {
 *     const newQuantity = (cartItem?.quantity || 0) + 1;
 *     await updateQuantity(product.id, newQuantity, product);
 *   };
 *   
 *   return (
 *     <button 
 *       onClick={handleAddToCart} 
 *       disabled={isUpdating}
 *     >
 *       {isUpdating ? 'Adding...' : 'Add to Cart'}
 *     </button>
 *   );
 * }
 * ```
 * 
 * @example Error handling:
 * ```typescript
 * function CartManager() {
 *   const { updateQuantity } = useCartWithSync();
 *   
 *   const handleQuantityChange = async (productId, newQuantity) => {
 *     try {
 *       await updateQuantity(productId, newQuantity);
 *       // Success - UI already updated optimistically
 *     } catch (error) {
 *       // Error logged automatically, consider showing user notification
 *       console.log('Cart update failed, please try again');
 *     }
 *   };
 * }
 * ```
 * 
 * @behavior
 * - Updates local state immediately (optimistic updates)
 * - Synchronizes with server in background
 * - Logs errors but doesn't rollback local changes
 * - Provides loading state during server operations
 * 
 * @see {@link useCart} for basic cart operations without server sync
 */
export function useCartWithSync() {
  const cart = useCart();

  const update_quantity_mutation = api.cart.updateQuantity.useMutation();

  /**
   * Updates cart item quantity with automatic server synchronization.
   * 
   * @param productId - ID of the product to update
   * @param quantity - New quantity (0 removes the item)
   * @param product - Product data (required for new items)
   * 
   * @throws Error if server synchronization fails
   */
  const updateQuantity = useCallback(
    async (productId: number, quantity: number, product?: Product) => {
      // Apply optimistic update to local state first
      cart.updateQuantity(productId, quantity, product);

      try {
        // Synchronize with server
        await update_quantity_mutation.mutateAsync({
          productId,
          quantity,
        });
      } catch (error) {
        console.error(
          "[useCartWithSync] Failed to sync cart update to database:",
          error
        );
        // Note: We don't rollback the local state change
        // In a production app, you might want to implement rollback logic
        throw error;
      }
    },
    [cart, update_quantity_mutation]
  );

  return {
    ...cart,
    updateQuantity,
    isUpdating: update_quantity_mutation.isPending,
  };
}
