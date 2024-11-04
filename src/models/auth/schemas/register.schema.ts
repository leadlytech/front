import { z } from "zod";

export const registerSchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string(),
    phoneNumber: z.string(),
    password: z.string(),
    terms: z.boolean(),
});
