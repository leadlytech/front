import { z } from "zod";
import { password } from "./login.schema";

export const sendEmailSchema = z.object({
    email: z
        .string({
            required_error: "O E-Mail é obrigatório",
        })
        .email("E-Mail inválido"),
});

export const resetPassSchema = z
    .object({
        newPassword: password,
        confirmNewPassword: password,
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Senhas não coincidem",
        path: ["confirmNewPassword"],
    });

export const recoverySchema = z.union([sendEmailSchema, resetPassSchema]);
