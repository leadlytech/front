import { ReactNode } from "react";
import Image from "next/image";
import { cookies } from "next/headers";

import { redirect } from "@/i18n/routing";
import { routes } from "@/routes";

export default function AuthLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: { locale: string };
}) {
    const cookiesStore = cookies();

    if (cookiesStore.has("auth")) {
        redirect({
            href: routes.dashboard._,
            locale: params.locale,
        });
    }

    return (
        <div className="min-h-screen p-6 flex flex-col items-center justify-center gap-6 overflow-y-auto">
            <Image
                src="/assets/images/logo.png"
                alt="logo"
                width={120}
                height={120}
            />
            <div className="w-full max-w-md p-4 bg-background rounded-lg shadow-md">
                {children}
            </div>
        </div>
    );
}
