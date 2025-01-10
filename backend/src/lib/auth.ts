import { IContext } from "@/types";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI } from "better-auth/plugins";

export const setupAuth = (c: IContext) => {
  const prisma = c.get("prisma");

  return betterAuth({
    appName: "better-auth-vite-starter",
    database: prismaAdapter(prisma, { provider: "sqlite" }),
    emailAndPassword: { enabled: true },
    socialProviders: {
      google: {
        clientId: c.env.GOOGLE_CLIENT_ID,
        clientSecret: c.env.GOOGLE_CLIENT_SECRET,
      },
      github: {
        clientId: c.env.GITHUB_CLIENT_ID,
        clientSecret: c.env.GOOGLE_CLIENT_SECRET,
      },
    },
    secret: c.env.BETTER_AUTH_SECRET,
    baseURL: c.env.BETTER_AUTH_URL,
    trustedOrigins: c.env.TRUSTED_ORIGINS.split(","),
    advanced: {
      generateId: false,
      defaultCookieAttributes: {
        sameSite: "none",
        secure: true,
      },
    },
    plugins: [openAPI()],
  });
};
