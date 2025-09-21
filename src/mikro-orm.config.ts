import { defineConfig } from '@mikro-orm/postgresql';
import { env } from './env';
import { Product } from './entities/Product';
import { Cart } from './entities/Cart';

export default defineConfig({ 
  entities: [Product, Cart],
  
  dbName: env.DATABASE_NAME,
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  
  debug: env.NODE_ENV === 'development',
});