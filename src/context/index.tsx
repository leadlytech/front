"use client";

import MainProvider, { MainContext, useMain } from "./main.context";
import NodeProvider, { NodeContext, useNode } from "./node.context";

export { MainProvider, MainContext, useMain };
export { NodeProvider, NodeContext, useNode };
export function ContextProviders({ children }: { children: React.ReactNode }) {
    return (
        <MainProvider>
            <NodeProvider>{children}</NodeProvider>
        </MainProvider>
    );
}
