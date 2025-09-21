import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getORM } from "@/lib/orm";
import { Cart } from "@/entities/Cart";
import { Product } from "@/entities/Product";

export const cartRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const orm = await getORM();
    const cartItems = await orm.em.find(Cart, {}, { populate: ['product'] });
    return cartItems;
  }),

  addItem: publicProcedure
    .input(z.object({
      productId: z.number(),
      quantity: z.number().positive(),
    }))
    .mutation(async ({ input }) => {
      const orm = await getORM();
      
      // Check if product exists
      const product = await orm.em.findOne(Product, { id: input.productId });
      if (!product) {
        throw new Error('Product not found');
      }

      // Check if item already exists in cart
      const existingCartItem = await orm.em.findOne(Cart, { product: input.productId });
      
      if (existingCartItem) {
        // Update quantity
        existingCartItem.quantity += input.quantity;
        await orm.em.persistAndFlush(existingCartItem);
        return existingCartItem;
      } else {
        // Create new cart item
        const cartItem = orm.em.create(Cart, {
          product,
          quantity: input.quantity,
        });
        await orm.em.persistAndFlush(cartItem);
        return cartItem;
      }
    }),

  updateQuantity: publicProcedure
    .input(z.object({
      id: z.number(),
      quantity: z.number().positive(),
    }))
    .mutation(async ({ input }) => {
      const orm = await getORM();
      const cartItem = await orm.em.findOne(Cart, { id: input.id });
      
      if (!cartItem) {
        throw new Error('Cart item not found');
      }

      cartItem.quantity = input.quantity;
      await orm.em.persistAndFlush(cartItem);
      return cartItem;
    }),

  removeItem: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const orm = await getORM();
      const cartItem = await orm.em.findOne(Cart, { id: input.id });
      
      if (!cartItem) {
        throw new Error('Cart item not found');
      }

      await orm.em.removeAndFlush(cartItem);
      return { success: true };
    }),
});
