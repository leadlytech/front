"use client";

import { memo, useState } from "react";
import { Position, useReactFlow } from "@xyflow/react";
import { toast } from "sonner";

import { ComponentItem, CustomNodeProps } from "@/interfaces";

import { DefaultHandle } from "../handles";

import { BaseNode } from "./baseNode";

import { GetIcon, Editor } from "@/components/custom";

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
    const { setNodes } = useReactFlow();
    const data = props.data;

    const [isSelected, setIsSelected] = useState(false);

    function saveData(data: NodeData) {
        setNodes((prevNodes) =>
            prevNodes.map((node) =>
                node.id === props.id
                    ? {
                          ...node,
                          data,
                      }
                    : node
            )
        );
        setIsSelected(false);
        toast.info("Não se esqueça de salvar as alterações");
    }

    return (
        <BaseNode node={props} setIsSelected={setIsSelected}>
            <>
                {isSelected ? (
                    <Editor
                        currentData={props.data}
                        saveData={saveData}
                        discardComponentsChanges={() => setIsSelected(false)}
                    />
                ) : undefined}
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
