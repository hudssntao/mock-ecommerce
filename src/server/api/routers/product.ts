import { z } from "zod";
import { Product } from "@/db/entities/Product";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const productRouter = createTRPCRouter({
  getInfinite: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.number().optional(),
        excludeId: z.number().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { em } = ctx;

      const { limit, cursor, excludeId } = input;

      const whereClause: any = {};
      if (cursor) {
        whereClause.id = { $gt: cursor };
      }
      if (excludeId) {
        whereClause.id = whereClause.id 
          ? { ...whereClause.id, $ne: excludeId }
          : { $ne: excludeId };
      }

      const products = await em.find(
        Product,
        whereClause,
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

  getFeatured: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.em.find(Product, {});
    if (products.length === 0) {
      return null;
    }
    
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    
    const randomIndex = Math.floor(seededRandom(seed) * products.length);
    return products[randomIndex];
  }),
});
