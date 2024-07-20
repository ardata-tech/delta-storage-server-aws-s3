import { BlankEnv } from "hono/types";
import { Context } from "hono";

export type ContextType = Context<
  BlankEnv,
  never,
  Record<string | number | symbol | never, string | number | symbol | never>
>;
