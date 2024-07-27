import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import { authorization } from "@/middleware/authorization.ts";

import BucketsRoute from "@/routes/buckets.ts";
import ObjectsRoute from "@/routes/objects.ts";
import { DELTA_SERVER_URL } from "@/utils/constants.ts";

const app = new Hono();

app.use(logger());
app.use(prettyJSON());

app.get(
  "/",
  (c) =>
    c.html(
      `Delta S3 Gateway is up and running. Visit <a href="https://docs.delta.storage">https://docs.delta.storage</a> for more info`,
    ),
);

app.get(
  "/health-checker",
  (c) => c.json({ date: new Date(), DELTA_SERVER_URL }),
);

app.use(authorization);

app.route("/", BucketsRoute);
app.route("/", ObjectsRoute);

Deno.serve({ port: 1338 }, app.fetch);
