"use client";

import { ReactNode } from "react";
import { ReactFlowProvider } from "@xyflow/react";

export function FlowProvider({ children }: { children: ReactNode }) {
    return <ReactFlowProvider>{children}</ReactFlowProvider>;
}
