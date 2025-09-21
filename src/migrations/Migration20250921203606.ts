import { Migration } from '@mikro-orm/migrations';

export class Migration20250921203606 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "product" ("id" serial primary key, "name" varchar(255) not null, "description" text not null, "price" numeric(10,2) not null, "image_url" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`create table "cart" ("id" serial primary key, "product_id" int not null, "quantity" int not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`alter table "cart" add constraint "cart_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "cart" drop constraint "cart_product_id_foreign";`);

    this.addSql(`drop table if exists "product" cascade;`);

    this.addSql(`drop table if exists "cart" cascade;`);
  }

}
