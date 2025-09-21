import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getORM } from "@/lib/orm";
import { Product } from "@/entities/Product";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const orm = await getORM();
    const products = await orm.em.find(Product, {});
    return products;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const orm = await getORM();
      const product = await orm.em.findOne(Product, { id: input.id });
      return product;
    }),

  create: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      price: z.number().positive(),
      imageUrl: z.string().url(),
    }))
    .mutation(async ({ input }) => {
      const orm = await getORM();
      const product = orm.em.create(Product, input);
      await orm.em.persistAndFlush(product);
      return product;
    }),
});
