import { z } from "zod";

export const createOrgSchema = z.object({
    name: z.string().trim(),
});

export const updateOrgSchema = z.object({
    name: z.string().trim().optional(),
});
