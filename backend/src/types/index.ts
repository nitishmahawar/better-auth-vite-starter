import { PrismaClient } from "@prisma/client";
import { Session, User } from "better-auth";
import { Context } from "hono";

export interface Variables {
  prisma: PrismaClient;
  user: User | null;
  session: Session | null;
}

export interface Bindings {
  DB: D1Database;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  TRUSTED_ORIGINS: string;
}

export type IContext = Context<{ Variables: Variables; Bindings: Bindings }>;
