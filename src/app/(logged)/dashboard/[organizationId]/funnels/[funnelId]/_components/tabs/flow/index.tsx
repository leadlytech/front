/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
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
import { toast } from "sonner";

import {
    defaultNodesData,
    DefineNode,
    ENodeType,
    nodeTypes,
    TEdge,
} from "./nodes";
import { makeApiRequest } from "@/actions";

import Sidebar from "./sidebar";
import { DnDProvider, useDnD } from "./DnDContext";

import { GetIcon, Editor } from "@/components/custom";

import { Button, SidebarProvider } from "@/components/ui";
import { IFunnel } from "@/models";

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

function DnDFlow(props: Props) {
    const reactFlowWrapper = useRef(null);
    const [isPending, startTransition] = useTransition();
    const [nodes, setNodes, onNodesChange] = useNodesState<DefineNode>([
        {
            id: String(new Date().getTime()),
            type: "START",
            position: { x: 0, y: 0 },
            draggable: false,
            data: {},
        },
    ]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<TEdge>([]);
    const { screenToFlowPosition } = useReactFlow();
    const [type] = useDnD();

    const [historyIndex, setHistoryIndex] = useState<number>(0);
    const [history, setHistory] = useState<
        Array<{ nodes: any[]; edges: any[] }>
    >([]);

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

    async function fetchData() {
        startTransition(async () => {
            const res = await makeApiRequest<IFunnel>("getFunnel", {
                params: {
                    organizationId: props.params.organizationId,
                    id: props.params.funnelId,
                },
            });

            if (res.success) {
                const payload = res.payload?.payload;
                if (payload) {
                    const newNodes = payload.Step?.map((step) => {
                        return {
                            id: step.id,
                            type: step.type,
                            draggable: step.type !== ENodeType.START,
                            position: step.config.position,
                            data: step.data,
                        };
                    });
                    const newEdges = payload.Edge?.map((edge) => {
                        return {
                            id: edge.id,
                            source: edge.destinyId,
                            target: edge.originId,
                        };
                    });

                    if (newNodes.length) {
                        setNodes(newNodes);
                    }

                    if (newEdges.length) {
                        setEdges(newEdges);
                    }
                    setHistoryIndex(0);
                }
                return;
            }

            toast.error(res.message);
        });
    }

    function handleSaveFunnel() {
        startTransition(async () => {
            const res = await makeApiRequest("updateFunnel", {
                params: {
                    organizationId: props.params.organizationId,
                    id: props.params.funnelId,
                },
                data: {
                    steps: nodes.map((node) => ({
                        id: node.id,
                        type: node.type,
                        name: node.data?.title || node.type,
                        config: {
                            position: node.position,
                        },
                        data: node.data,
                    })),
                    edges: edges.map((edge) => ({
                        id: edge.id,
                        destinyId: edge.source,
                        originId: edge.target,
                    })),
                },
            });

            if (res.success) {
                toast.success("Funil salvo com sucesso!");
                return;
            }

            toast.error("Falha ao salvar o funil");
        });
    }

    // Listeners para obter os eventos React Flow
    // useEffect(() => {
    //     setHistory((prevHistory) => {
    //         return [
    //             ...prevHistory,
    //             {
    //                 nodes,
    //                 edges,
    //             },
    //         ];
    //     });
    // }, [nodes, edges]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full h-full flex flex-col justify-center gap-2">
            <div className="flex gap-8 justify-end items-center">
                <Editor />
                <div className="hidden gap-2 justify-center items-center">
                    <Button
                        size="icon"
                        variant="outline"
                        disabled={historyIndex === 0}
                    >
                        <GetIcon icon="IoIosUndo" />
                    </Button>
                    <Button
                        size="icon"
                        variant="outline"
                        disabled={historyIndex >= history.length - 1}
                    >
                        <GetIcon icon="IoIosRedo" />
                    </Button>
                </div>
                <Button
                    size="icon"
                    className="text-white bg-green-500"
                    onClick={handleSaveFunnel}
                >
                    <GetIcon icon="FaSave" />
                </Button>
            </div>
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
                <DnDFlow {...props} />
            </DnDProvider>
        </ReactFlowProvider>
    );
}
