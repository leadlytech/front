"use client";

import { useState, useEffect } from "react";

import { makeApiRequest } from "@/actions";
import { IFunnel } from "@/models";
import { DefineNode, ENodeType } from "@/interfaces";

import { DesignArea } from "@/components/custom/editor/parts";

type Props = {
    params: {
        funnelId: string;
    };
};

export default function Page(props: Props) {
    const [loading, setLoading] = useState(true);
    const [nodes, setNodes] = useState<DefineNode[]>([]);
    const [currentNodeIndex, setCurrentNodeIndex] = useState<number>(-1);
    // const [edges, setEdges] = useState<TEdge[]>([]);

    async function fetchData() {
        const res = await makeApiRequest<IFunnel>("getFunnelLive", {
            params: {
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

                // if (newEdges.length) {
                //     setEdges(newEdges);
                // }

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
                        }

                        // setCurrentNodeIndex(startNodeIndex);
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

    // function goToNextNode() {
    //     console.log("nodes");
    //     console.log(nodes);
    //     console.log("edges");
    //     console.log(edges);

    //     const currentNodeEdges = edges.filter(
    //         (edge) => edge.source === nodes[currentNodeIndex].id
    //     );

    //     console.log(currentNodeEdges);

    //     if (currentNodeEdges.length) {
    //         const nextNodeIndex = nodes.findIndex((node) => {
    //             node.id === currentNodeEdges[0].target;
    //         });

    //         console.log(nextNodeIndex);

    //         setCurrentNodeIndex(nextNodeIndex);
    //     }
    // }

    // useEffect(() => {
    //     if (currentNodeIndex !== -1) {
    //         const currentNode = nodes[currentNodeIndex];
    //         if (currentNode.type === ENodeType.START) {
    //             goToNextNode();
    //         }
    //     }
    // }, [currentNodeIndex]);

    return (
        <div className="w-full h-screen">
            {loading ? (
                <div className="w-full h-screen flex justify-center items-center">
                    Loading...
                </div>
            ) : (
                <div>
                    {currentNodeIndex !== -1 &&
                    nodes[currentNodeIndex].data &&
                    nodes[currentNodeIndex].data.components &&
                    nodes[currentNodeIndex].data.components.length ? (
                        <DesignArea
                            components={
                                nodes[currentNodeIndex].data?.components || []
                            }
                            setComponents={() => {}}
                            onSelectComponent={() => {}}
                            liveMode={true}
                        />
                    ) : undefined}
                </div>
            )}
        </div>
    );
}
