import {
    EHttpMethods,
    loginSchema,
    recoverySchema,
    registerSchema,
} from "@/models";

export const apiActions = {
    // ========== AUTH
    register: {
        path: "/auth/register",
        method: EHttpMethods.POST,
        schema: registerSchema,
        dispenseToken: true,
    },
    login: {
        path: "/auth/login",
        method: EHttpMethods.POST,
        schema: loginSchema,
        dispenseToken: true,
    },
    recovery: {
        path: "/auth/recovery",
        method: EHttpMethods.POST,
        schema: recoverySchema,
        dispenseToken: true,
    },
    fetchLogin: {
        path: "/auth/validate/token",
        method: EHttpMethods.GET,
    },
};

export type TApiActionsKeys = keyof typeof apiActions;
