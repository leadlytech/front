"use client";

import { useState, useEffect } from "react";

import { makeApiRequest } from "@/actions";
import { IFunnel } from "@/models";
import { TNode, ENodeType, TEdge } from "@/interfaces";
import { getRandomInteger } from "@/utils";

import { DesignArea } from "@/components/custom/editor/parts";

type Props = {
    params: {
        funnelId: string;
    };
};

export default function Page(props: Props) {
    const [loading, setLoading] = useState(true);
    const [nodes, setNodes] = useState<TNode[]>([]);
    const [currentNodeIndex, setCurrentNodeIndex] = useState<number>(-1);
    const [edges, setEdges] = useState<TEdge[]>([]);

    async function fetchData() {
        console.log("props");
        console.log(props);
        const res = await makeApiRequest<IFunnel>("getFunnelLive", {
            params: {
                id: props.params.funnelId,
            },
        });

        console.log(res);

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

                if (newEdges.length) {
                    setEdges(newEdges);
                }

                if (newNodes.length) {
                    setNodes(newNodes);

                    let startNodeIndex = -1;

                    for (const nodeIndex in newNodes) {
                        const node = newNodes[nodeIndex];
                        if (node.type === ENodeType.START) {
                            startNodeIndex = nodeIndex as unknown as number;
                            break;
                        }
                    }

                    if (startNodeIndex !== -1) {
                        const startNodeEdges = newEdges.filter(
                            (edge) =>
                                edge.source === newNodes[startNodeIndex].id
                        );

                        if (startNodeEdges.length) {
                            let nextNodeIndex = -1;

                            for (const nodeIndex in newNodes) {
                                const node = newNodes[nodeIndex];
                                if (node.id === startNodeEdges[0].target) {
                                    nextNodeIndex =
                                        nodeIndex as unknown as number;
                                    break;
                                }
                            }

                            setCurrentNodeIndex(nextNodeIndex);
                            setLoading(false);
                        }
                    }
                }
            }
            return;
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    function handleComponentSelected(index: number | null) {
        if (!index) return;
        const currentNode = nodes[currentNodeIndex];

        console.log("currentNode");
        console.log(currentNode);
        console.log(edges);

        if (currentNode.data?.components) {
            const components = currentNode.data.components;
            const componentClicked = components[index];

            console.log("componentClicked");
            console.log(componentClicked);

            if (componentClicked.isConnectable) {
                const possibleEdges = edges.filter((edge) =>
                    edge.id.includes(componentClicked.id)
                );

                console.log("possibleEdges");
                console.log(possibleEdges);

                if (possibleEdges.length) {
                    const nextEdgeIndex =
                        possibleEdges.length === 1
                            ? 0
                            : getRandomInteger(0, possibleEdges.length - 1);

                    console.log("nextEdgeIndex");
                    console.log(nextEdgeIndex);

                    const nextNodeId = possibleEdges[nextEdgeIndex].target;

                    console.log("nextNodeId");
                    console.log(nextNodeId);

                    for (const nodeIndex in nodes) {
                        const node = nodes[nodeIndex];
                        if (node.id === nextNodeId) {
                            console.log("nodeIndex");
                            console.log(nodeIndex);
                            setCurrentNodeIndex(nodeIndex as unknown as number);
                            break;
                        }
                    }
                }
            }
        }
    }

    return (
        <div className="w-screen h-screen">
            {loading ? (
                <div className="w-screen h-screen flex justify-center items-center">
                    Carregando...
                </div>
            ) : (
                <div className="w-screen h-screen">
                    {currentNodeIndex !== -1 &&
                    nodes[currentNodeIndex].data &&
                    nodes[currentNodeIndex].data.components &&
                    nodes[currentNodeIndex].data.components.length ? (
                        <DesignArea
                            components={
                                nodes[currentNodeIndex].data?.components || []
                            }
                            setComponents={() => {}}
                            onSelectComponent={handleComponentSelected}
                            liveMode={true}
                        />
                    ) : undefined}
                </div>
            )}
        </div>
    );
}
