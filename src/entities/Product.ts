import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Cart } from './Cart';

@Entity()
export class Product {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Property()
  imageUrl!: string;
}
