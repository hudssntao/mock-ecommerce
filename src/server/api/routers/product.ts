import { z } from "zod";
import { Product } from "@/db/entities/Product";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

/**
 * tRPC router for product-related API endpoints.
 * 
 * Provides public procedures for fetching product data including:
 * - Infinite scroll pagination for product feeds
 * - Individual product retrieval by ID
 * - Featured product selection with daily rotation
 * - Sitemap generation support
 * 
 * All procedures are public
 */
export const productRouter = createTRPCRouter({
  /**
   * Retrieves products with infinite scroll pagination support.
   * 
   * Implements cursor-based pagination using product IDs for efficient
   * scrolling through large product catalogs. Supports excluding specific
   * products (useful for "related products" sections).
   * 
   * @input limit - Number of products to fetch (1-100, default: 10)
   * @input cursor - Product ID to start fetching from (for pagination)
   * @input excludeId - Product ID to exclude from results (optional)
   * 
   * @returns Object with items array and nextCursor for pagination
   * 
   * @example
   * ```typescript
   * // Initial load
   * const result = await trpc.product.getInfinite.query({ limit: 20 });
   * 
   * // Load next page
   * const nextPage = await trpc.product.getInfinite.query({
   *   limit: 20,
   *   cursor: result.nextCursor
   * });
   * 
   * // Exclude specific product (e.g., current product in related section)
   * const related = await trpc.product.getInfinite.query({
   *   limit: 4,
   *   excludeId: currentProductId
   * });
   * ```
   */
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

      const whereClause: Record<string, unknown> = {};
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

  /**
   * Retrieves a single product by its unique ID.
   * 
   * Used for product detail pages and anywhere specific product
   * information is needed. Returns null if product is not found.
   * 
   * @input id - The unique product identifier
   * @returns Product entity or null if not found
   * 
   * @example
   * ```typescript
   * const product = await trpc.product.getById.query({ id: 123 });
   * if (product) {
   *   console.log(`Found: ${product.name} - ${product.price}`);
   * }
   * ```
   */
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const product = await ctx.em.findOne(Product, { id: input.id });
      return product;
    }),

  /**
   * Retrieves the daily featured product using deterministic selection.
   * 
   * Implements a seeded random selection that changes daily but remains
   * consistent throughout the day. This ensures the featured product
   * rotates automatically without requiring manual curation.
   * 
   * The seed is based on the current date (YYYYMMDD format), ensuring:
   * - Same product is featured throughout the entire day
   * - Different product is featured each day
   * - Selection is deterministic and reproducible
   * 
   * @returns Featured Product entity or null if no products exist
   * 
   * @example
   * ```typescript
   * const featured = await trpc.product.getFeatured.query();
   * if (featured) {
   *   // Display as hero product on homepage
   *   console.log(`Today's featured: ${featured.name}`);
   * }
   * ```
   * 
   * @algorithm
   * 1. Generate date-based seed (YYYYMMDD)
   * 2. Use seeded pseudo-random function (sin-based)
   * 3. Select product at calculated index
   */
  getFeatured: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.em.find(Product, {});
    if (products.length === 0) {
      return null;
    }
    
    // Generate deterministic seed based on current date
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    // Seeded pseudo-random function for consistent daily selection
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    
    const randomIndex = Math.floor(seededRandom(seed) * products.length);
    return products[randomIndex];
  }),

  /**
   * Retrieves all products for sitemap generation.
   * 
   * Fetches the complete product catalog for XML sitemap generation,
   * enabling search engines to discover all product pages. Products
   * are ordered by ID for consistent sitemap structure.
   * 
   * @returns Array of all Product entities ordered by ID
   * 
   * @example
   * ```typescript
   * // In sitemap.ts
   * const products = await trpc.product.getAllForSitemap.query();
   * const productUrls = products.map(product => ({
   *   url: `/products/${product.id}`,
   *   lastModified: new Date(),
   * }));
   * ```
   * 
   * @performance
   * For larger product catalogs (10k+ products), consider implementing
   * pagination to avoid memory issues and improve performance.
   * 
   * @seo This endpoint is specifically designed for sitemap generation
   * and should not be used for user-facing product listings.
   */
  getAllForSitemap: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.em.find(Product, {}, {
      orderBy: { id: "ASC" },
    });
    return products;
  }),
});
