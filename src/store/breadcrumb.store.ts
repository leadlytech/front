import { create } from "zustand";

type Store = {
    breadcrumbs: string[];
    setBreadcrumbs: (breadcrumbs: string[]) => void;
};

export const useBreadcrumbStore = create<Store>((set) => ({
    breadcrumbs: [],
    setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
}));
