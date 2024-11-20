/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */

import { createContext, ReactNode, useContext, useState } from "react";

const DnDContext = createContext({
    type: null,
    setType: (_: any) => {},
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
