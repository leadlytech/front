import { ReactNode } from "react";
import { cookies } from "next/headers";

import { routes } from "@/routes";
import { redirect } from "next/navigation";

export default function AuthLayout({ children }: { children: ReactNode }) {
    const cookiesStore = cookies();

    if (!cookiesStore.has("auth")) {
        redirect(routes.auth.login);
    }

    return <div>{children}</div>;
}
