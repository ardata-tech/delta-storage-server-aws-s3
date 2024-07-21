import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import { authorization } from "@/middleware/authorization.ts";

import BucketsRoute from "@/routes/buckets.ts";
import ObjectsRoute from "@/routes/objects.ts";

const app = new Hono();

app.use(logger());
app.use(prettyJSON());

app.use(authorization);

app.route("/", BucketsRoute);
app.route("/", ObjectsRoute);

Deno.serve({ port: 1338 }, app.fetch);
