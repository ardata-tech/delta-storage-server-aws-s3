import { Next } from "hono";
import { ContextType } from "@/types/hono.ts";

import { getApiKeyFromAuthorizationHeader } from "@/utils/getApiKeyFromAuthorizationHeader_1_1.ts";

export const authorization = async (
  c: ContextType,
  next: Next,
) => {
  const apiKey = getApiKeyFromAuthorizationHeader(
    c.req.header("Authorization"),
  );
  c.res.headers.set("Authorization", apiKey ?? "");
  await next();
};
