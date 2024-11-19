"use client";

import { ReactNode, useState } from "react";
import { useReactFlow } from "@xyflow/react";

import { useNode } from "@/context";

import { CustomNodeProps } from "@/interfaces";

import { GetIcon } from "@/components/custom";

import { Button } from "@/components/ui";

type Props = {
    node: CustomNodeProps;
    hideOptions?: boolean;
    children: ReactNode;
};

export const BaseNode = (props: Props) => {
    const flow = useReactFlow();
    const [isHovered, setIsHovered] = useState(false);
    const { setNode } = useNode();

    function handleRemoveNode() {
        const nodeId = props.node.id;

        // Remove o nó em si
        flow.deleteElements({
            nodes: [{ id: nodeId }],
        });

        // Remove os edges relacionados ao nó
        flow.setEdges((prevEdges) =>
            prevEdges.filter(
                (edge) => edge.source !== nodeId && edge.target !== nodeId
            )
        );
    }

    function handleDuplicateNode() {
        const newNode = {
            id: String(new Date().getTime()),
            type: props.node.type,
            position: {
                x: props.node.positionAbsoluteX + 50,
                y: props.node.positionAbsoluteY - 50,
            },
            data: props.node.data,
        };
        flow.addNodes(newNode);
    }

    return (
        <div
            className="p-2 text-[#f8f8f8] bg-[#1E1E1E] border border-[#e5e7eb42] focus:border-[#e5e7eb] active:shadow-[0_0_0_0.5px_rgba(153,153,153,1)] hover:shadow-[0_1px_4px_1px_rgba(255,255,255,0.08)] rounded-sm"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {props.children}
            {isHovered && !props.hideOptions && (
                <div className="absolute -top-10 right-0 flex gap-2 justify-end text-white bg-transparent text-sm rounded shadow-lg p-2 z-50">
                    <Button
                        size="icon"
                        className="w-6 h-6 text-white bg-blue-400 hover:bg-blue-400"
                        onClick={() => setNode(props.node)}
                    >
                        <GetIcon icon="MdEdit" />
                    </Button>
                    <Button
                        size="icon"
                        className="w-6 h-6 text-white bg-blue-400 hover:bg-blue-400"
                        onClick={handleDuplicateNode}
                    >
                        <GetIcon icon="FaClone" />
                    </Button>
                    <Button
                        size="icon"
                        className="w-6 h-6 text-white bg-blue-400 hover:bg-blue-400"
                        onClick={handleRemoveNode}
                    >
                        <GetIcon icon="FaTrash" />
                    </Button>
                </div>
            )}
        </div>
    );
};
