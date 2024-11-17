"use client";

import {
    createContext,
    useEffect,
    useState,
    useCallback,
    ReactNode,
    useContext,
} from "react";
import DisableDevtool from "disable-devtool";

import { IMainContext, IUser, IUserMember } from "@/interfaces";
import { makeApiRequest } from "@/actions";

// import { PageLoading } from "@/components/custom";

export const MainContext = createContext<IMainContext>({
    user: undefined,
    myOrgs: undefined,
    currentOrg: undefined,
    setCurrentOrg: () => {},
});

export const useMain = () => useContext(MainContext);

export default function MainProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IUser>();
    const [myOrgs, setMyOrgs] = useState<IUserMember[] | undefined>();
    const [currentOrg, setCurrentOrg] = useState<IUserMember | undefined>();
    const [loaded, setLoaded] = useState(false);

    const sync = useCallback(async () => {
        try {
            const res = await makeApiRequest<IUser>("me");
            if (res.success) {
                const userData = res.payload?.payload;
                setUser(userData);
                setMyOrgs(userData?.members);
            }
        } finally {
            setLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (process.env.NODE_ENV === "production") {
            DisableDevtool({
                md5: process.env.NEXT_PUBLIC_DDTK_MD5 || undefined,
            });
        }
        if (!loaded) sync(); // Evita repetir o sync se já estiver carregado
    }, [loaded, sync]);

    return (
        <MainContext.Provider
            value={{ user, myOrgs, currentOrg, setCurrentOrg }}
        >
            {/* {loaded ? children : <PageLoading />} */}
            {children}
        </MainContext.Provider>
    );
}
