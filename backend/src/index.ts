import { Hono } from "@/lib/app";
import { cors } from "hono/cors";
import { setupPrisma } from "@/lib/prisma";
import { setupAuth } from "./lib/auth";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

app.use("*", setupPrisma);

app.use(
  "/api/auth/**", // or replace with "*" to enable cors for all routes
  cors({
    origin: ["http://localhost:5173"], // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.on(["POST", "GET"], "/api/auth/**", (c) => {
  return setupAuth(c).handler(c.req.raw);
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
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
