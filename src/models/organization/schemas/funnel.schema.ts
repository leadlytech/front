import { z } from "zod";

export const createFunnelSchema = z.object({
    name: z
        .string({
            required_error: "Você deve fornecer um nome para o seu funil",
        })
        .trim(),
    description: z.string().trim().optional(),
});

export const updateFunnelSchema = z.object({
    name: z.string().trim().optional(),
    description: z.string().trim().optional(),
});
