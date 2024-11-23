/* eslint-disable @typescript-eslint/no-explicit-any */

import { NodeProps } from "@xyflow/react";

export type TNodeTypes = "START" | "PAGE" | "WEBHOOK" | "REDIRECT";

export enum ENodeType {
    START = "START",
    PAGE = "PAGE",
    WEBHOOK = "WEBHOOK",
    REDIRECT = "REDIRECT",
}

export interface INodeOption {
    name: string;
    icon: string;
    type: TNodeTypes;
    disabled?: boolean;
}

export type TNode<T = any> = {
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
