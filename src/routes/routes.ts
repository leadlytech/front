export const routes = {
    terms: "/terms",
    auth: {
        _: "/auth",
        login: "/auth/login",
        register: "/auth/register",
        recovery: "/auth/recovery",
        reset: "/auth/reset",
    },
    account: {
        _: "/account",
        security: "/account/security",
    },
    dashboard: {
        _: "/dashboard",
        organization: {
            overview: (organizationId: string) =>
                `/dashboard/${organizationId}`,
            funnels: {
                overview: (organizationId: string) =>
                    `/dashboard/${organizationId}/funnels`,
                get: (organizationId: string, id: string) =>
                    `/dashboard/${organizationId}/funnels/${id}`,
                view: (id: string) => `/f/${id}`,
            },
        },
    },
};
