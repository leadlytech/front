"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { INodeOption, ENodeType, TNode, TEdge } from "@/interfaces";
import { makeApiRequest } from "@/actions";
import { IFunnel } from "@/models";

import { Flow, GetIcon } from "@/components/custom";

import { Button } from "@/components/ui";

type Props = {
    params: {
        organizationId: string;
        funnelId: string;
    };
};

const availableNodes: INodeOption[] = [
    {
        name: "Página",
        icon: "RiPagesFill",
        type: ENodeType.PAGE,
    },
    {
        name: "Webhook",
        icon: "MdWebhook",
        type: ENodeType.WEBHOOK,
        disabled: true,
    },
    {
        name: "Link",
        icon: "FaLink",
        type: ENodeType.REDIRECT,
        disabled: true,
    },
];

const defaultFlowState = () => {
    return {
        nodes: [
            {
                id: String(new Date().getTime()),
                type: ENodeType.START,
                position: { x: 0, y: 0 },
                draggable: false,
                data: {},
            },
        ],
        edges: [],
    };
};

export function FlowTab(props: Props) {
    const [flowState, setFlowState] = useState<
        | {
              nodes: TNode[];
              edges: TEdge[];
          }
        | undefined
    >();

    async function fetchData() {
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
                        animated: true,
                    };
                });

                setFlowState(() => {
                    return {
                        nodes: newNodes.length
                            ? newNodes
                            : defaultFlowState().nodes,
                        edges: newEdges.length
                            ? newEdges
                            : defaultFlowState().edges,
                    };
                });
            }
            return;
        }

        toast.error(res.message);
    }

    async function handleSave() {
        const res = await makeApiRequest("updateFunnel", {
            params: {
                organizationId: props.params.organizationId,
                id: props.params.funnelId,
            },
            data: {
                steps: flowState?.nodes.map((node) => ({
                    id: node.id,
                    type: node.type,
                    name: node.data?.title || node.type,
                    config: {
                        position: node.position,
                    },
                    data: node.data,
                })),
                edges: flowState?.edges.map((edge) => ({
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
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full h-full flex flex-col justify-center gap-2">
            <div className="flex gap-8 justify-end items-center">
                <Button
                    size="icon"
                    className="text-white bg-green-500"
                    onClick={() => handleSave()}
                >
                    <GetIcon icon="FaSave" />
                </Button>
            </div>
            {flowState ? (
                <Flow
                    flowState={flowState}
                    setFlowState={setFlowState}
                    availableNodes={availableNodes}
                    fetchData={fetchData}
                    handleSave={handleSave}
                />
            ) : undefined}
        </div>
    );
}
