import { memo } from "react";
import { Position } from "@xyflow/react";

import { ComponentItem, CustomNodeProps } from "@/interfaces";

import { DefaultHandle } from "../handles";

import { BaseNode } from "./baseNode";

import { GetIcon } from "@/components/custom";

export type NodeData = {
    name: string;
    components?: ComponentItem[];
};

export const defaultNodeData: NodeData = {
    name: "Minha página",
    components: [],
};

export const nodeTypeKey = "PAGE";

export const PageNode = memo((props: CustomNodeProps<NodeData>) => {
    const data = props.data;

    return (
        <BaseNode node={props}>
            <>
                <div className="w-full flex flex-col items-center gap-2">
                    <h1>{data.name}</h1>
                    {data.components && data.components.length ? (
                        <div className="w-full flex flex-col gap-2">
                            {data.components.map((component, index: number) => (
                                <div
                                    key={index}
                                    className="w-full p-2 flex gap-2 justify-start items-center border rounded-sm"
                                >
                                    <GetIcon icon={component.icon} />
                                    <h1>{component.label}</h1>
                                    {component.isConnectable ? (
                                        <DefaultHandle
                                            id={`${nodeTypeKey}-${props.id}-${component.id}-SOURCE`}
                                            type="source"
                                            position={Position.Right}
                                            style={{
                                                top: `${62 + 49 * index}px`,
                                                right: "10px",
                                            }}
                                        />
                                    ) : undefined}
                                </div>
                            ))}
                        </div>
                    ) : undefined}
                </div>
                <DefaultHandle
                    id={`${nodeTypeKey}-${props.id}-TARGET`}
                    type="target"
                    position={Position.Left}
                />
            </>
        </BaseNode>
    );
});

PageNode.displayName = nodeTypeKey;
