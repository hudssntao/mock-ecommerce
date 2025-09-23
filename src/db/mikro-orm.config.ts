import { defineConfig } from "@mikro-orm/postgresql";
import { env } from "../env";
import { Cart } from "./entities/Cart";
import { Product } from "./entities/Product";

export default defineConfig({
  entities: [Product, Cart],

  dbName: env.DATABASE_NAME,
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,

  migrations: {
    path: "./src/db/migrations",
  },

  debug: env.NODE_ENV === "development",
});
