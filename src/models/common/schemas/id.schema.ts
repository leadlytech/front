import { z } from "zod";

export const idSchema = z.union([z.string(), z.number()]);
