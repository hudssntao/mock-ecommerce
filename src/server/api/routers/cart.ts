import { z } from "zod";
import { Cart } from "@/entities/Cart";
import { Product } from "@/entities/Product";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const cartRouter = createTRPCRouter({
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

  updateQuantity: publicProcedure
    .input(
      z.object({
        productId: z.number(),
        quantity: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { productId, quantity } = input;

      if (quantity <= 0) {
        // Remove item from cart if quantity is 0 or less
        await ctx.em.nativeDelete(Cart, { product: productId });
        return { success: true, action: "removed" };
      }

      // Find existing cart item
      const existingCartItem = await ctx.em.findOne(Cart, {
        product: productId,
      });

      if (existingCartItem) {
        // Update existing item
        existingCartItem.quantity = quantity;
        await ctx.em.persistAndFlush(existingCartItem);
        return { success: true, action: "updated" };
      } else {
        // Create new cart item
        const product = await ctx.em.findOne(Product, { id: productId });
        if (!product) {
          throw new Error("Product not found");
        }

        const newCartItem = ctx.em.create(Cart, {
          product: ctx.em.getReference(Product, productId),
          quantity: quantity,
        });
        await ctx.em.persistAndFlush(newCartItem);
        return { success: true, action: "added" };
      }
    }),

  clearCart: publicProcedure.mutation(async ({ ctx }) => {
    await ctx.em.nativeDelete(Cart, {});
    return { success: true };
  }),

  removeItem: publicProcedure
    .input(z.object({ productId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.em.nativeDelete(Cart, { product: input.productId });
      return { success: true };
    }),
});
