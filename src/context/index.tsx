"use client";

import MainProvider from "./main.context";

export function ContextProviders({ children }: { children: React.ReactNode }) {
    return <MainProvider>{children}</MainProvider>;
}
