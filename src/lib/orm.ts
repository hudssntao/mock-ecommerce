import { type EntityManager, MikroORM } from "@mikro-orm/core";
import config from "../mikro-orm.config";

let ormInstance: MikroORM | undefined;

const getORM = async (): Promise<MikroORM> => {
  if (!ormInstance) {
    ormInstance = await MikroORM.init(config);
  }
  return ormInstance;
};

const getEM = async (): Promise<EntityManager> => {
  const orm = await getORM();
  return orm.em.fork();
};

export { getORM, getEM };
