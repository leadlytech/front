"use client";

import MainProvider, { MainContext } from "./main.context";

export { MainProvider, MainContext };
export function ContextProviders({ children }: { children: React.ReactNode }) {
    return <MainProvider>{children}</MainProvider>;
}
