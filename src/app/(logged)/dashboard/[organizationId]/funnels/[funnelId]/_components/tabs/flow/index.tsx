/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useRef } from "react";
import {
    ReactFlow,
    ReactFlowProvider,
    Controls,
    Background,
    Panel,
    useNodesState,
    useEdgesState,
    addEdge,
    BackgroundVariant,
    useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { defaultNodesData, DefineNode, nodeTypes } from "./nodes";

import Sidebar from "./sidebar";
import { DnDProvider, useDnD } from "./DnDContext";

import { SidebarProvider } from "@/components/ui";

type Props = {
    params: {
        organizationId: string;
        funnelId: string;
    };
};

// const initialNodes: Array<DefineNode> = [
//     {
//         id: "0",
//         type: "START",
//         position: { x: 0, y: 0 },
//         draggable: false,
//         data: {
//             title: "N2",
//             components: [
//                 {
//                     icon: "",
//                     title: "Componente 1",
//                 },
//             ],
//         },
//     },
//     {
//         id: "1",
//         type: "PAGE",
//         position: { x: 200, y: 0 },
//         data: {
//             title: "N1",
//             components: [
//                 {
//                     icon: "",
//                     title: "Componente 1",
//                     isConnectable: true,
//                 },
//                 {
//                     icon: "",
//                     title: "Componente 2",
//                     isConnectable: true,
//                 },
//                 {
//                     icon: "",
//                     title: "Componente 3",
//                     isConnectable: true,
//                 },
//             ],
//         },
//     },
//     {
//         id: "2",
//         type: "PAGE",
//         position: { x: 400, y: 0 },
//         data: {
//             title: "N2",
//             components: [
//                 {
//                     icon: "",
//                     title: "Componente 1",
//                 },
//             ],
//         },
//     },
// ];
// const initialEdges = [
//     { id: "e0-1", source: "0", target: "1", animated: true },
//     { id: "e1-2", source: "1", target: "2", animated: true },
// ];

function DnDFlow() {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([
        {
            id: String(new Date().getTime()),
            type: "START",
            position: { x: 0, y: 0 },
            draggable: false,
            data: {},
        },
    ]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { screenToFlowPosition } = useReactFlow();
    const [type] = useDnD();

    // Listeners para obter os eventos React Flow
    useEffect(() => {
        console.log("nodes");
        console.log(nodes);
        console.log("edges");
        console.log(edges);
    }, [nodes, edges]);

    const onConnect = useCallback(
        (params) =>
            setEdges((prevEdges) =>
                addEdge({ ...params, animated: true }, prevEdges)
            ),
        []
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            if (!type) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: String(new Date().getTime()),
                type,
                position,
                data: defaultNodesData[type],
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type]
    );

    return (
        <div className="w-full h-full">
            <div className="w-full h-full" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    fitView
                    colorMode="dark"
                    className="w-full h-full border rounded-md [&_.react-flow__attribution]:!hidden"
                >
                    <Controls />
                    <Panel position="top-right">
                        <SidebarProvider defaultOpen={false}>
                            <Sidebar />
                        </SidebarProvider>
                    </Panel>
                    <Background
                        className="!bg-background"
                        variant={BackgroundVariant.Dots}
                        gap={12}
                        size={1}
                    />
                </ReactFlow>
            </div>
        </div>
    );
}

export function FlowTab(props: Props) {
    return (
        <ReactFlowProvider>
            <DnDProvider>
                <DnDFlow />
            </DnDProvider>
        </ReactFlowProvider>
    );
}
