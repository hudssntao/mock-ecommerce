import { useCallback } from "react";
import type { Product } from "@/db/entities/Product";
import { api } from "@/trpc/react";
import { useCart } from ".";

export function useCartWithSync() {
  const cart = useCart();

  const update_quantity_mutation = api.cart.updateQuantity.useMutation();

  const updateQuantity = useCallback(
    async (productId: number, quantity: number, product?: Product) => {
      cart.updateQuantity(productId, quantity, product);

      try {
        await update_quantity_mutation.mutateAsync({
          productId,
          quantity,
        });
      } catch (error) {
        console.error(
          "[useCartWithSync] Failed to sync cart update to database:",
          error
        );
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
