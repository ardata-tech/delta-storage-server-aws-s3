import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import BucketsRoute from "@/routes/buckets.ts";
import { authorization } from "@/middleware/authorization.ts";

const app = new Hono();

app.use(logger());
app.use(prettyJSON());

app.use(authorization);

app.route("/", BucketsRoute);

Deno.serve({ port: 1338 }, app.fetch);
