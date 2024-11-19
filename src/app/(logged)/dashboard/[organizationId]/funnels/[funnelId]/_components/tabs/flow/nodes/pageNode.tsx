/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, memo } from "react";
import { Handle, Position } from "@xyflow/react";

import { BaseNode, CustomNodeProps } from "./baseNode";

import { GetIcon } from "@/components/custom";

export type NodeData = {
    name: string;
    components?: Array<{
        icon: string;
        title: string;
        isConnectable?: boolean;
    }>;
};

export const defaultNodeData: NodeData = {
    name: "Minha página",
    components: [],
};

export const PageNode = memo((props: CustomNodeProps<NodeData>) => {
    const data = props.data;

    return (
        <BaseNode node={props}>
            <>
                <div className="flex flex-col items-center gap-2">
                    <h1>{data.name}</h1>
                    {data.components && data.components.length ? (
                        <div className="flex flex-col gap-2">
                            {data.components.map((component, index: number) => (
                                <div
                                    key={index}
                                    className="p-2 flex gap-2 justify-start items-center border rounded-sm"
                                >
                                    <GetIcon icon={component.icon} />
                                    <h1>{component.title}</h1>
                                    {component.isConnectable ? (
                                        <Handle
                                            id={`${props.id}-${index}`}
                                            type="source"
                                            position={Position.Right}
                                            isConnectable={props.isConnectable}
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
                <Handle
                    type="target"
                    position={Position.Left}
                    isConnectable={props.isConnectable}
                />
            </>
        </BaseNode>
    );
});
