import { load } from "@std/dotenv";

const env = await load();

export const DELTA_SERVER_URL = env.DELTA_SERVER_URL ??
  Deno.env.get("DELTA_SERVER_URL");
