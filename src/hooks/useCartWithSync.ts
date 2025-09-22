import { useCallback } from "react";
import type { CartItem } from "@/lib/cart-context";
import { api } from "@/trpc/react";
import { useCart } from ".";

export function useCartWithSync() {
  const cart = useCart();

  const update_quantity_mutation = api.cart.updateQuantity.useMutation();
  const clear_cart_mutation = api.cart.clearCart.useMutation();
  const remove_item_mutation = api.cart.removeItem.useMutation();

  const updateQuantity = useCallback(
    async (
      productId: number,
      quantity: number,
      product?: CartItem["product"]
    ) => {
      // Optimistic update - update UI immediately
      cart.updateQuantity(productId, quantity, product);

      try {
        // Sync to database
        await update_quantity_mutation.mutateAsync({
          productId,
          quantity,
        });
      } catch (error) {
        // On error, we could revert the optimistic update
        // For now, we'll just log the error
        console.error("Failed to sync cart update to database:", error);

        // Optional: Show user notification about sync failure
        // You could add toast notifications here
      }
    },
    [cart, update_quantity_mutation]
  );

  // Enhanced addToCart with database sync
  const addToCart = useCallback(
    async (product: CartItem["product"], quantity: number = 1) => {
      const existingItem = cart.getCartItem(product.id);
      const newQuantity = (existingItem?.quantity || 0) + quantity;

      // Use our enhanced updateQuantity which handles both add and update
      await updateQuantity(product.id, newQuantity, product);
    },
    [cart, updateQuantity]
  );

  // Enhanced removeFromCart with database sync
  const removeFromCart = useCallback(
    async (productId: number) => {
      // Optimistic update
      cart.removeFromCart(productId);

      try {
        // Sync to database
        await remove_item_mutation.mutateAsync({ productId });
      } catch (error) {
        console.error("Failed to sync cart removal to database:", error);
      }
    },
    [cart, remove_item_mutation]
  );

  // Enhanced clearCart with database sync
  const clearCart = useCallback(async () => {
    // Optimistic update
    cart.clearCart();

    try {
      // Sync to database
      await clear_cart_mutation.mutateAsync();
    } catch (error) {
      console.error("Failed to sync cart clear to database:", error);
    }
  }, [cart, clear_cart_mutation]);

  return {
    ...cart,
    updateQuantity,
    addToCart,
    removeFromCart,
    clearCart,
    isUpdating: update_quantity_mutation.isPending,
    isClearing: clear_cart_mutation.isPending,
    isRemoving: remove_item_mutation.isPending,
  };
}
