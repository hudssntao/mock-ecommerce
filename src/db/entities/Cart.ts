import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Product } from "./Product";

/**
 * Cart entity representing items added to the shopping cart.
 * 
 * This entity manages the relationship between products and their quantities
 * in a user's shopping cart. Each cart item represents a specific product
 * with its desired quantity for purchase.
 * 
 * @entity cart
 */
@Entity({ tableName: "cart" })
export class Cart {
  /**
   * Unique identifier for the cart item.
   * Auto-generated primary key used for cart item operations.
   */
  @PrimaryKey({ type: "number" })
  id!: number;

  /**
   * Reference to the product in this cart item.
   * Many-to-one relationship allowing multiple cart items to reference
   * the same product 
   * 
   * note: though this shouldn't happen in practice due to
   * quantity aggregation in the business logic
   * 
   * @relation ManyToOne with Product entity
   */
  @ManyToOne(() => Product)
  product!: Product;

  /**
   * Quantity of the product in the cart.
   * 
   * @minimum 1
   * @example 2 for "2 MacBook Pro items"
   */
  @Property({ type: "number" })
  quantity!: number;
}
