import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { IContext } from "@/types";
import { Next } from "hono";

export const setupPrisma = (c: IContext, next: Next) => {
  const adapter = new PrismaD1(c.env.DB);
  const prisma = new PrismaClient({ adapter });

  c.set("prisma", prisma);

  return next();
};
