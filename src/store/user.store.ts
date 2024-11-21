import { create } from "zustand";

import { makeApiRequest } from "@/actions";
import { IUser, IUserMember } from "@/interfaces";

type Store = {
    user: IUser | undefined;
    userOrgs: IUserMember[] | undefined;
    activeOrg: IUserMember | undefined;
    setActiveOrg: (orgId: string) => boolean;
    setUser: (user: IUser) => void;
    loadUser: () => Promise<boolean>;
};

export async function fetchUser(): Promise<IUser | undefined> {
    try {
        const res = await makeApiRequest<IUser>("me");
        if (res.success) {
            return res.payload?.payload;
        }
    } catch (error) {
        console.error("Error fetching user:", error);
    }
    return undefined;
}

export const useUserStore = create<Store>((set) => ({
    user: undefined,
    userOrgs: undefined,
    activeOrg: undefined,
    setActiveOrg: (orgId: string) => {
        let isSuccess = false;
        set((state) => {
            const newActiveOrg = state.userOrgs?.find(
                (org) => org.organization.id === orgId
            );
            isSuccess = !!newActiveOrg;
            return { activeOrg: newActiveOrg };
        });
        return isSuccess;
    },
    setUser: (user) => {
        set({ user, userOrgs: user?.members });
    },
    loadUser: async () => {
        const userData = await fetchUser();
        set({ user: userData, userOrgs: userData?.members });
        return userData !== undefined;
    },
}));
