import { z } from "zod";
import { Product } from "@/db/entities/Product";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const productRouter = createTRPCRouter({
  getInfinite: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.number().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { em } = ctx;

      const { limit, cursor } = input;

      const products = await em.find(
        Product,
        cursor ? { id: { $gt: cursor } } : {},
        {
          orderBy: { id: "ASC" },
          limit: limit + 1,
        }
      );

      let nextCursor: number | undefined;
      if (products.length > limit) {
        const nextItem = products.pop();
        nextCursor = nextItem?.id;
      }

      return {
        items: products,
        nextCursor,
      };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const product = await ctx.em.findOne(Product, { id: input.id });
      return product;
    }),

  getRandom: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.em.find(Product, {});
    if (products.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * products.length);
    return products[randomIndex];
  }),
});
