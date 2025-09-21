import { Migration } from '@mikro-orm/migrations';

export class Migration20250921204307 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "product" drop column "created_at", drop column "updated_at";`);

    this.addSql(`alter table "cart" drop column "created_at", drop column "updated_at";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "product" add column "created_at" timestamptz not null, add column "updated_at" timestamptz not null;`);

    this.addSql(`alter table "cart" add column "created_at" timestamptz not null, add column "updated_at" timestamptz not null;`);
  }

}
