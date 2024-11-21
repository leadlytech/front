"use client";

import { ReactNode } from "react";

import { IUser } from "@/interfaces";
import { useUserStore } from "@/store";

import { PageLoading } from "@/components/custom";

export function Initializer({
    children,
    user,
}: {
    children: ReactNode;
    user: IUser;
}) {
    const { user: currentUserData, setUser } = useUserStore();

    if (!currentUserData) {
        setUser(user);

        return <PageLoading />;
    }

    return children;
}
