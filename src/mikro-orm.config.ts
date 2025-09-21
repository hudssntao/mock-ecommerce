import { defineConfig } from "@mikro-orm/postgresql";
import { Cart } from "./entities/Cart";
import { Product } from "./entities/Product";
import { env } from "./env";

export default defineConfig({
  entities: [Product, Cart],

  dbName: env.DATABASE_NAME,
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,

  debug: env.NODE_ENV === "development",
});
