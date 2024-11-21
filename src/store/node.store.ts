import { create } from "zustand";
import { CustomNodeProps } from "@/interfaces";

type Store = {
    node: CustomNodeProps | undefined;
    setNode: (node: CustomNodeProps | undefined) => void;
};

export const useNodeStore = create<Store>((set) => ({
    node: undefined,
    setNode: (node) => set({ node }),
}));
