"use client";

import {
    createContext,
    useEffect,
    useState,
    useCallback,
    ReactNode,
} from "react";
import DisableDevtool from "disable-devtool";

import { IMainContext, IUser } from "@/interfaces";
import { makeApiRequest } from "@/actions";

import { PageLoading } from "@/components/custom";

export const MainContext = createContext<IMainContext>({
    user: undefined,
});

export default function MainProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IUser>();
    const [loaded, setLoaded] = useState(false);

    const sync = useCallback(async () => {
        try {
            const res = await makeApiRequest("me");
            if (res.success) {
                setUser(res.payload.payload);
            }
        } finally {
            setLoaded(true);
        }
    }, []);

    useEffect(() => {
        // DisableDevtool({
        //     md5: process.env.NEXT_PUBLIC_DDTK_MD5 || undefined,
        // });
        if (!loaded) sync(); // Evita repetir o sync se já estiver carregado
    }, [loaded, sync]);

    return (
        <MainContext.Provider value={{ user }}>
            {/* {loaded ? children : <PageLoading />} */}
            {children}
        </MainContext.Provider>
    );
}
