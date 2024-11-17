"use client";

import MainProvider, { MainContext, useMain } from "./main.context";

export { MainProvider, MainContext, useMain };
export function ContextProviders({ children }: { children: React.ReactNode }) {
    return <MainProvider>{children}</MainProvider>;
}
