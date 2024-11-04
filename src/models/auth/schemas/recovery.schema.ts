import { z } from "zod";

export const sendEmailSchema = z.object({
    email: z
        .string({
            required_error: "O E-Mail é obrigatório",
        })
        .email("E-Mail inválido"),
});

export const resetPassSchema = z
    .object({
        newPassword: z.string().min(6),
        confirmNewPassword: z.string().min(6),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Passwords do not match",
        path: ["confirmNewPassword"],
    });

export const recoverySchema = z.union([sendEmailSchema, resetPassSchema]);
