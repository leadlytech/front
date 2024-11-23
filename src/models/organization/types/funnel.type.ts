import { ENodeType } from "@/interfaces";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IFunnel {
    id: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    Step: Array<IStep>;
    Edge: Array<IEdge>;
}

export interface IStep {
    id: string;
    name: string;
    type: ENodeType;
    config: Record<string, any>;
    data: Record<string, any>;
}

export interface IEdge {
    id: string;
    originId: string;
    destinyId: string;
}
