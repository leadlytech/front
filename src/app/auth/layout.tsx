import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { routes } from "@/routes";

import { Structure } from "./structure";

export default function AuthLayout({ children }: { children: ReactNode }) {
    const cookiesStore = cookies();

    if (cookiesStore.has("auth")) {
        redirect(routes.dashboard._);
    }

    return <Structure>{children}</Structure>;
}
