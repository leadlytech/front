"use client";

import { createContext, useEffect, ReactNode } from "react";
import DisableDevtool from "disable-devtool";

export const MainContext = createContext(undefined);

export default function MainProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        if (process.env.NODE_ENV === "production") {
            DisableDevtool({
                md5: process.env.NEXT_PUBLIC_DDTK_MD5 || undefined,
            });
        }
    }, []);

    return (
        <MainContext.Provider value={undefined}>
            {children}
        </MainContext.Provider>
    );
}
