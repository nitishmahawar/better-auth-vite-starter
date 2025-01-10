import { Hono } from "@/lib/app";
import { cors } from "hono/cors";
import { setupPrisma } from "@/lib/prisma";
import { setupAuth } from "./lib/auth";
import { HTTPException } from "hono/http-exception";
import { setCookie } from "hono/cookie";

const app = new Hono();

app.use(
  "*", // or replace with "*" to enable cors for all routes
  cors({
    origin: [
      "http://localhost:5173",
      "https://better-auth-vite-starter.vercel.app",
    ], // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
  setupPrisma
);

app.on(["POST", "GET"], "/api/auth/**", (c) => {
  return setupAuth(c).handler(c.req.raw);
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/set-cookie", async (c) => {
  setCookie(c, "cookie", "test-cookie", {
    maxAge: 3600,
    sameSite: "none",
    secure: true,
    path: "/",
    httpOnly: true,
  });
});

app.notFound((c) => {
  return c.json(
    { success: false, error: "Requested resource not found!" },
    404
  );
});

app.onError((error, c) => {
  if (error instanceof HTTPException) {
    return c.json({ success: false, error: error.message }, error.status);
  }
  return c.json({ success: false, error: "Internal Server Error!" });
});

export default app;
