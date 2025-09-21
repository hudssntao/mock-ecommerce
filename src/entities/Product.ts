import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Product {
  @PrimaryKey({ type: "number" })
  id!: number;

  @Property({ type: "string" })
  name!: string;

  @Property({ type: "text" })
  description!: string;

  @Property({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Property({ type: "string" })
  imageUrl!: string;
}
