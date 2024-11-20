/* eslint-disable @typescript-eslint/no-explicit-any */

import { NodeProps } from "@xyflow/react";

export type TNodeTypes = "START" | "PAGE";

export enum ENodeType {
    START = "START",
    PAGE = "PAGE",
}

export type DefineNode<T = any> = {
    id: string;
    type?: TNodeTypes;
    draggable?: boolean;
    position: {
        x: number;
        y: number;
    };
    data: T;
};

export type TEdge = {
    id: string;
    source: string;
    target: string;
    animated?: boolean;
};

export type CustomNodeProps<T = any> = Omit<NodeProps, "data"> & {
    data: T;
};
