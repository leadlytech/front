/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

import { TNodeTypes } from "@/interfaces";

type Store = {
    type: TNodeTypes | null;
    setType: (type: TNodeTypes | null) => void;
};

export const useDnDStore = create<Store>((set) => ({
    type: null,
    setType: (type) => set({ type }),
}));
