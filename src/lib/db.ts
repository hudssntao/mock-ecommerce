import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import config from '../mikro-orm.config';

let orm: MikroORM<PostgreSqlDriver> | null = null;

export async function getORM(): Promise<MikroORM<PostgreSqlDriver>> {
  if (!orm) {
    orm = await MikroORM.init<PostgreSqlDriver>(config);
  }
  return orm;
}

export async function closeORM(): Promise<void> {
  if (orm) {
    await orm.close();
    orm = null;
  }
}
