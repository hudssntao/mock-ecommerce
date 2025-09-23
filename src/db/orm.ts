import { type EntityManager, MikroORM } from "@mikro-orm/core";
import config from "./mikro-orm.config";

/**
 * Global declaration for MikroORM singleton instance.
 * Prevents multiple ORM instances in development hot reload scenarios.
 */
declare global {
  var __mikroOrm: MikroORM | undefined;
}

/**
 * Gets or creates a singleton MikroORM instance.
 * 
 * Implements the singleton pattern to ensure only one ORM instance exists
 * across the application lifecycle. This is especially important in Next.js
 * development mode where hot reloads can create multiple instances.
 * 
 * @returns Promise resolving to the MikroORM instance
 * 
 * @example
 * ```typescript
 * const orm = await getORM();
 * ```
 * 
 * @singleton This function ensures only one ORM instance exists globally
 * 
 * @warning Should not be used directly, should only be used via the getEM function
 */
const getORM = async (): Promise<MikroORM> => {
  if (!global.__mikroOrm) {
    global.__mikroOrm = await MikroORM.init(config);
  }
  return global.__mikroOrm;
};

/**
 * Creates a forked EntityManager for database operations.
 * 
 * Returns a new EntityManager instance that's isolated from other operations.
 * Each fork has its own identity map and change tracking, making it safe
 * for concurrent operations and preventing entity state conflicts.
 * 
 * @returns Promise resolving to a forked EntityManager
 * 
 * @example
 * ```typescript
 * // In a tRPC procedure or API route
 * const em = await getEM();
 * const products = await em.find(Product, {});
 * 
 * // Create new product
 * const product = em.create(Product, { name: "New Product", price: 99.99 });
 * await em.persistAndFlush(product);
 * ```
 * 
 * @example
 * ```typescript
 * // In database seeding
 * const em = await getEM();
 * const products = sampleProducts.map(data => em.create(Product, data));
 * await em.persistAndFlush(products);
 * ```
 * 
 * @performance Each fork creates a new identity map, so avoid creating
 * unnecessary forks in hot code paths.
 * 
 * @concurrency Safe for concurrent operations as each fork is isolated
 */
const getEM = async (): Promise<EntityManager> => {
  const orm = await getORM();
  return orm.em.fork();
};

export { getORM, getEM };
