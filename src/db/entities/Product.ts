import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

/**
 * Product entity representing items available for purchase in the e-commerce store.
 * 
 * This entity stores the core product information including pricing, descriptions,
 * and media references. Products are referenced by cart items and used throughout
 * the application for display and purchasing functionality.
 * 
 * @entity product
 */
@Entity({ tableName: "product" })
export class Product {
  /**
   * Unique identifier for the product.
   * Auto-generated primary key used for all product references.
   */
  @PrimaryKey({ type: "number" })
  id!: number;

  /**
   * Display name of the product.
   * Used in product listings, search results, and product detail pages.
   * 
   * @example "MacBook Pro 16\"" or "iPhone 15 Pro"
   */
  @Property({ type: "string" })
  name!: string;

  /**
   * Detailed description of the product.
   * Rich text content describing features, specifications, and benefits.
   * Displayed on product detail pages and used for SEO purposes.
   * 
   * @example "Apple MacBook Pro 16-inch with M2 Pro chip, 16GB RAM, and 512GB SSD..."
   */
  @Property({ type: "text" })
  description!: string;

  /**
   * Product price in USD.
   * Stored as decimal with 2 decimal places for precise currency calculations.
   * Always represents the current selling price.
   * 
   * @example 2499.99 for $2,499.99
   */
  @Property({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  /**
   * URL to the product's main image.
   * External URL (typically Unsplash) used for product thumbnails and detail views.
   * Should be a valid HTTP/HTTPS URL pointing to an accessible image.
   * 
   * @example "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1028&h=408&fit=crop"
   */
  @Property({ type: "string" })
  imageUrl!: string;
}
