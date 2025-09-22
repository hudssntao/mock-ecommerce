import { type EntityManager, MikroORM } from "@mikro-orm/core";
import config from "./mikro-orm.config";

declare global {
  var __mikroOrm: MikroORM | undefined;
}

const getORM = async (): Promise<MikroORM> => {
  if (!global.__mikroOrm) {
    global.__mikroOrm = await MikroORM.init(config);
  }
  return global.__mikroOrm;
};

const getEM = async (): Promise<EntityManager> => {
  const orm = await getORM();
  return orm.em.fork();
};

export { getORM, getEM };
