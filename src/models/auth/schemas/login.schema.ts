import { z } from "zod";

export const password = z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/,
        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um símbolo"
    );

export const loginSchema = z.object({
    email: z.string().email(),
    password,
    remember: z.boolean().optional(),
});
