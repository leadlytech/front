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
        },
    },
};
