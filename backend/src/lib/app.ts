import { Bindings, Variables } from "@/types";
import { Hono as Base } from "hono";

export const Hono = Base<{ Variables: Variables; Bindings: Bindings }>;
