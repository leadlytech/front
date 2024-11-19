import {
    changeUserPassSchema,
    createFunnelSchema,
    createOrgSchema,
    EHttpMethods,
    loginSchema,
    recoverySchema,
    registerSchema,
    updateFunnelSchema,
    updateOrgSchema,
    userSchema,
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

    // ========== ACCOUNT
    me: {
        path: "/v1/account",
        method: EHttpMethods.GET,
    },
    updateMe: {
        path: "/v1/account",
        method: EHttpMethods.PATCH,
        schema: userSchema,
    },
    updateMePass: {
        path: "/v1/account",
        method: EHttpMethods.PATCH,
        schema: changeUserPassSchema,
    },

    // ========== ORGANIZATION
    createOrganization: {
        path: "/v1/organization",
        method: EHttpMethods.POST,
        schema: createOrgSchema,
    },
    getOrganization: {
        path: "/v1/organization/{id}",
        method: EHttpMethods.GET,
    },
    updateOrganization: {
        path: "/v1/organization/{id}",
        method: EHttpMethods.PATCH,
        schema: updateOrgSchema,
    },
    deleteOrganization: {
        path: "/v1/organization/{id}",
        method: EHttpMethods.DELETE,
    },

    // ========== FUNNELS
    createFunnel: {
        path: "/v1/organizations/{organizationId}/funnels",
        method: EHttpMethods.POST,
        schema: createFunnelSchema,
    },
    listFunnels: {
        path: "/v1/organizations/{organizationId}/funnels",
        method: EHttpMethods.GET,
    },
    getFunnel: {
        path: "/v1/organizations/{organizationId}/funnels/{id}",
        method: EHttpMethods.GET,
    },
    getFunnelLive: {
        path: "/v1/funnels/{id}",
        method: EHttpMethods.GET,
        dispenseToken: true,
    },
    updateFunnel: {
        path: "/v1/organizations/{organizationId}/funnels/{id}",
        method: EHttpMethods.PATCH,
        schema: updateFunnelSchema,
    },
    removeFunnel: {
        path: "/v1/organizations/{organizationId}/funnels/{id}",
        method: EHttpMethods.DELETE,
    },
};

export type TApiActionsKeys = keyof typeof apiActions;
