import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Product } from "./Product";

@Entity()
export class Cart {
  @PrimaryKey({ type: "number" })
  id!: number;

  @ManyToOne(() => Product)
  product!: Product;

  @Property({ type: "number" })
  quantity!: number;
}
