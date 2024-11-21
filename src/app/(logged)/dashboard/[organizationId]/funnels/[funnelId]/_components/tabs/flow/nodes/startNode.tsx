/* eslint-disable @typescript-eslint/no-explicit-any */

import { memo } from "react";
import { Position } from "@xyflow/react";

import { CustomNodeProps } from "@/interfaces";

import { DefaultHandle } from "../handles";

import { BaseNode } from "./baseNode";

type NodeData = object;

export const defaultNodeData: NodeData = {};

export const nodeTypeKey = "START";

export const StartNode = memo((props: CustomNodeProps<NodeData>) => {
    return (
        <BaseNode hideOptions={true} node={props}>
            <>
                <div>
                    <h1>🍀 Começo do funil</h1>
                </div>
                <DefaultHandle type="source" position={Position.Right} />
            </>
        </BaseNode>
    );
});

StartNode.displayName = nodeTypeKey;
