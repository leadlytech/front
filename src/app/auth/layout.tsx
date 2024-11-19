import { ReactNode } from "react";
import Image from "next/image";
import { cookies } from "next/headers";

import { routes } from "@/routes";
import { redirect } from "next/navigation";

export default function AuthLayout({ children }: { children: ReactNode }) {
    const cookiesStore = cookies();

    if (cookiesStore.has("auth")) {
        redirect(routes.dashboard._);
    }

    return (
        <div className="w-screen min-h-screen p-6 flex flex-col items-center justify-center gap-6 overflow-y-auto">
            <Image
                src="/assets/svgs/logo.svg"
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
