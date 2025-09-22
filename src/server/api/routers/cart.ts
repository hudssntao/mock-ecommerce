import { z } from "zod";
import { Cart } from "@/db/entities/Cart";
import { Product } from "@/db/entities/Product";
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
        await ctx.em.nativeDelete(Cart, { product: productId });
        return { success: true, action: "removed" };
      }

      const existingCartItem = await ctx.em.findOne(Cart, {
        product: productId,
      });

      if (existingCartItem) {
        existingCartItem.quantity = quantity;
        await ctx.em.persistAndFlush(existingCartItem);
        return { success: true, action: "updated" };
      } else {
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
