/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useRef, useState, DragEvent } from "react";
import {
    ReactFlow,
    Controls,
    Background,
    Panel,
    useNodesState,
    useEdgesState,
    addEdge,
    BackgroundVariant,
    useReactFlow,
    ColorMode,
    Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";

import { useDnDStore, useNodeStore } from "@/store";
import { ComponentItem, INodeOption, TNode, TEdge } from "@/interfaces";

import { defaultNodesData, nodeTypes } from "./nodes";

import Sidebar from "./sidebar";

import { Editor } from "@/components/custom";

import { SidebarProvider } from "@/components/ui";

export interface IFlowState {
    nodes: TNode[];
    edges: TEdge[];
}

export type FlowProps = {
    flowState: IFlowState;
    setFlowState(flowState: IFlowState): void;
    availableNodes: Array<INodeOption>;
    fetchData(): Promise<void>;
    handleSave(): Promise<void>;
};

export function DnDFlow({
    flowState,
    setFlowState,
    availableNodes,
    fetchData,
    handleSave,
}: FlowProps) {
    const { theme } = useTheme();
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState<TNode>(
        flowState.nodes
    );
    const [edges, setEdges, onEdgesChange] = useEdgesState<TEdge>(
        flowState.edges
    );
    const { screenToFlowPosition } = useReactFlow();
    const { type } = useDnDStore();
    const { node: selectedNode, setNode: setSelectedNode } = useNodeStore();

    const [save, setSave] = useState<boolean>(false);

    const onConnect = useCallback<any>(
        (params: TEdge) =>
            setEdges((prevEdges) =>
                addEdge({ ...params, animated: true }, prevEdges)
            ),
        []
    );

    const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event: DragEvent<HTMLDivElement>) => {
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

    function saveComponents(components: ComponentItem[]) {
        if (selectedNode) {
            setNodes((prevNodes) =>
                prevNodes.map((node) =>
                    node.id === selectedNode.id
                        ? {
                              ...node,
                              data: {
                                  ...node.data,
                                  components,
                              },
                          }
                        : node
                )
            );
            setSelectedNode(undefined);
            setSave(true);
        }
    }

    function discardComponentsChanges() {
        if (selectedNode) {
            setSelectedNode(undefined);
        }
    }

    const handleDeleteEdge = (edgeData: Edge) => {
        setEdges((eds) => eds.filter((edge) => edge.id !== edgeData.id));
    };

    useEffect(() => {
        setFlowState({
            nodes,
            edges,
        });
    }, [nodes, edges, setFlowState]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (save) {
            handleSave();
            setSave(false);
        }
    }, [save]);

    return (
        <div className="w-full h-full flex flex-col justify-center gap-2">
            {selectedNode ? (
                <Editor
                    currentComponents={selectedNode.data.components}
                    saveComponents={saveComponents}
                    discardComponentsChanges={discardComponentsChanges}
                />
            ) : undefined}
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
                    onEdgeDoubleClick={(_, edge) => handleDeleteEdge(edge)}
                    fitView
                    colorMode={theme as ColorMode}
                    className="w-full h-full border rounded-md [&_.react-flow__attribution]:!hidden"
                >
                    <Controls />
                    <Panel position="top-right">
                        <SidebarProvider defaultOpen={false}>
                            <Sidebar availableNodes={availableNodes} />
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
