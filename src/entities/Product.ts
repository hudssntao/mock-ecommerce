import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Cart } from './Cart';

@Entity()
export class Product {
  @PrimaryKey({ type: 'number' })
  id!: number;

  @Property({ type: 'string' })
  name!: string;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Property({ type: 'string' })
  imageUrl!: string;
}
