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
    sync: async () => {},
});

export default function MainProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IUser>();
    const [loaded, setLoaded] = useState(false);

    const sync = useCallback(async () => {
        const res = await makeApiRequest("");

        if (res.success) {
            setUser(res.payload);
        }
    }, []);

    useEffect(() => {
        // DisableDevtool({
        //     md5: process.env.NEXT_PUBLIC_DDTK_MD5 || undefined,
        // });

        sync().then(() => setLoaded(true));
    }, [sync]);

    return (
        <MainContext.Provider value={{ user, sync }}>
            {children}
        </MainContext.Provider>
    );
}
