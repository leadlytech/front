import { z } from "zod";
import { password } from "./login.schema";

export const userSchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string(),
    phoneNumber: z.string(),
    password: z.string(),
});

export const registerSchema = userSchema.extend({
    password: z.string(),
    terms: z.boolean(),
});

export const changeUserPassSchema = z
    .object({
        password: password,
        newPassword: password,
        confirmNewPassword: password,
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Senhas não coincidem",
        path: ["confirmNewPassword"],
    });
