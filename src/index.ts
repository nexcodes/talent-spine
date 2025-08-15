import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { auth } from "./config/auth.js";
import { trpcHonoHandler } from "./trpc/trpc-hono-adapter.js";
import { appRouter } from "./trpc/index.js";
import { cors } from "hono/cors";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello! The api is working!");
});

app.use(
  "*", // or replace with "*" to enable cors for all routes
  cors({
    origin: "http://localhost:3000", // replace with your origin
    credentials: true,
  })
);

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

app.all(
  "/trpc/*",
  trpcHonoHandler({
    router: appRouter,
    endpoint: "/trpc",
  })
);

serve(
  {
    fetch: app.fetch,
    port: Number(process.env.PORT) || 8000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
