import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { routes } from "@/routes";
import { fetchUser } from "@/store";
import { removeCookie } from "@/actions";

import { Initializer } from "@/components/custom";

export default async function LoggedLayout({
    children,
}: {
    children: ReactNode;
}) {
    const cookiesStore = cookies();

    if (!cookiesStore.has("auth")) {
        redirect(routes.auth.login);
    }

    const user = await fetchUser();

    if (!user) {
        await removeCookie("auth");
        redirect(routes.auth.login);
    }

    return <Initializer user={user}>{children}</Initializer>;
}
