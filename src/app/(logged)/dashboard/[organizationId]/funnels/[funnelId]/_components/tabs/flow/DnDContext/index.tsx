/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext, ReactNode, useContext, useState } from "react";

const DnDContext = createContext({
    type: null,
    setType: (v: any) => v,
});

export const DnDProvider = ({ children }: { children: ReactNode }) => {
    const [type, setType] = useState<any>(null);

    return (
        <DnDContext.Provider value={{ type, setType }}>
            {children}
        </DnDContext.Provider>
    );
};

export default DnDContext;

export const useDnD = () => {
    return useContext(DnDContext);
};
