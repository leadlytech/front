import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { routes } from "@/routes";

export default function LoggedLayout({ children }: { children: ReactNode }) {
    const cookiesStore = cookies();

    if (!cookiesStore.has("auth")) {
        redirect(routes.auth.login);
    }

    return children;
}