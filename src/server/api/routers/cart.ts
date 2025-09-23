import { z } from "zod";
import { Cart } from "@/db/entities/Cart";
import { Product } from "@/db/entities/Product";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

/**
 * tRPC router for shopping cart operations.
 * 
 * Manages cart state persistence and synchronization between client and server.
 * Provides procedures for retrieving cart contents and updating item quantities.
 * 
 * note: This implementation uses a simplified cart model without user sessions.
 * in production, cart items would be associated with authenticated users or
 * session identifiers for proper isolation.
 */
export const cartRouter = createTRPCRouter({
  /**
   * Retrieves all items currently in the shopping cart.
   * 
   * Fetches cart items with populated product information, transforming
   * the data into a clean structure suitable for client consumption.
   * This is used for cart display, checkout calculations, and cart
   * synchronization on app load.
   * 
   * @returns Array of cart items with embedded product details
   * 
   * @example
   * ```typescript
   * const cartItems = await trpc.cart.getEntireCart.query();
   * const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
   * const totalPrice = cartItems.reduce((sum, item) => 
   *   sum + (item.product.price * item.quantity), 0
   * );
   * ```
   * 
   * @returns Structure:
   * ```typescript
   * {
   *   id: number;           // Cart item ID
   *   quantity: number;     // Item quantity
   *   product: {           // Full product details
   *     id: number;
   *     name: string;
   *     description: string;
   *     price: number;
   *     imageUrl: string;
   *   };
   * }[]
   * ```
   */
  getEntireCart: publicProcedure.query(async ({ ctx }) => {
    const cart_items = await ctx.em.find(
      Cart,
      {},
      {
        populate: ["product"],
      }
    );

    return cart_items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        name: item.product.name,
        description: item.product.description,
        price: item.product.price,
        imageUrl: item.product.imageUrl,
      },
    }));
  }),

  /**
   * Updates the quantity of a product in the shopping cart.
   * 
   * Handles all cart quantity operations including adding new items,
   * updating existing quantities, and removing items. The operation
   * is atomic and provides clear feedback about the action performed.
   * 
   * @input productId - ID of the product to update
   * @input quantity - New quantity (0 or negative removes the item)
   * 
   * @returns Success status and action performed ("added" | "updated" | "removed")
   * 
   * @example
   * ```typescript
   * // Add new item to cart
   * const result = await trpc.cart.updateQuantity.mutate({
   *   productId: 123,
   *   quantity: 2
   * });
   * // result: { success: true, action: "added" }
   * 
   * // Update existing item quantity
   * await trpc.cart.updateQuantity.mutate({
   *   productId: 123,
   *   quantity: 3
   * });
   * // result: { success: true, action: "updated" }
   * 
   * // Remove item from cart
   * await trpc.cart.updateQuantity.mutate({
   *   productId: 123,
   *   quantity: 0
   * });
   * // result: { success: true, action: "removed" }
   * ```
   * 
   * @throws Error if productId doesn't exist when adding new items
   * 
   * @behavior
   * - quantity <= 0: Removes item from cart
   * - Existing item: Updates quantity
   * - New item: Creates cart entry after validating product exists
   */
  updateQuantity: publicProcedure
    .input(
      z.object({
        productId: z.number(),
        quantity: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { productId, quantity } = input;

      // Remove item if quantity is zero or negative
      if (quantity <= 0) {
        await ctx.em.nativeDelete(Cart, { product: productId });
        return { success: true, action: "removed" };
      }

      // Check if item already exists in cart
      const existingCartItem = await ctx.em.findOne(Cart, {
        product: productId,
      });

      if (existingCartItem) {
        // Update existing item quantity
        existingCartItem.quantity = quantity;
        await ctx.em.persistAndFlush(existingCartItem);
        return { success: true, action: "updated" };
      } else {
        // Add new item to cart (validate product exists first)
        const product = await ctx.em.findOne(Product, { id: productId });
        if (!product) {
          throw new Error("[Cart/updateQuantity] Product not found");
        }

        const newCartItem = ctx.em.create(Cart, {
          product: ctx.em.getReference(Product, productId),
          quantity: quantity,
        });
        await ctx.em.persistAndFlush(newCartItem);
        return { success: true, action: "added" };
      }
    }),
});
