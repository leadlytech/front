import {
    EHttpMethods,
    loginSchema,
    recoverySchema,
    registerSchema,
} from "@/models";

export const apiActions = {
    // ========== AUTH
    register: {
        path: "/v1/auth/register",
        method: EHttpMethods.POST,
        schema: registerSchema,
        dispenseToken: true,
    },
    login: {
        path: "/v1/auth/login",
        method: EHttpMethods.POST,
        schema: loginSchema,
        dispenseToken: true,
    },
    recovery: {
        path: "/v1/auth/verify",
        method: EHttpMethods.POST,
        schema: recoverySchema,
        dispenseToken: true,
    },
    fetchLogin: {
        path: "/v1/account",
        method: EHttpMethods.GET,
    },
};

export type TApiActionsKeys = keyof typeof apiActions;
