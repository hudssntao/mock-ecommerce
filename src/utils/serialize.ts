/**
 * Serializes ORM entities to plain JavaScript objects for safe transfer between server and client.
 * 
 * This utility is essential when passing MikroORM entities from Server Components to Client Components
 * in Next.js, as ORM entities contain methods and circular references that cannot be serialized
 * directly. The function performs a deep clone while removing all non-serializable properties.
 * 
 * @template T - The type of the entity to serialize, must extend object
 * @param entity - The ORM entity or object to serialize
 * @returns A plain JavaScript object with the same structure but no methods or circular references
 * 
 * @example
 * ```typescript
 * // Server Component
 * const product = await em.findOne(Product, { id: 1 });
 * const serializedProduct = serialize(product);
 * 
 * // Pass to Client Component
 * return <ProductCard product={serializedProduct} />;
 * ```
 * 
 * @example
 * ```typescript
 * // Serializing arrays of entities
 * const products = await em.find(Product, {});
 * const serializedProducts = serialize(products);
 * ```
 * 
 * @warning This function performs a deep clone via JSON serialization, which means:
 * - Date objects become strings
 * - Functions and methods are removed
 * - undefined values become null
 * - Circular references will cause errors
 */
export function serialize<T extends object>(entity: T): T {
  return JSON.parse(JSON.stringify(entity));
}
