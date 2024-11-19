"use client";

import { createContext, useState, ReactNode, useContext } from "react";

import { CustomNodeProps, INodeContext } from "@/interfaces";

export const NodeContext = createContext<INodeContext>({
    node: undefined,
    setNode: () => {},
});

export const useNode = () => useContext(NodeContext);

export default function NodeProvider({ children }: { children: ReactNode }) {
    const [node, setNode] = useState<CustomNodeProps>();

    return (
        <NodeContext.Provider value={{ node, setNode }}>
            {children}
        </NodeContext.Provider>
    );
}
