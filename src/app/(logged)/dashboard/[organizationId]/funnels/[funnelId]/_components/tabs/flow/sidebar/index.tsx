"use client";

import { DragEvent } from "react";

import { cn } from "@/lib/utils";
import { useDnD } from "../DnDContext";

import { GetIcon } from "@/components/custom";

import {
    Button,
    useSidebar,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    Separator,
} from "@/components/ui";

interface INode {
    name: string;
    icon: string;
    type: string;
    disabled?: boolean;
}

const availableNodes: INode[] = [
    {
        name: "Página",
        icon: "RiPagesFill",
        type: "PAGE",
    },
    {
        name: "Webhook",
        icon: "MdWebhook",
        type: "WEBHOOK",
        disabled: true,
    },
    {
        name: "Link",
        icon: "FaLink",
        type: "REDIRECT",
        disabled: true,
    },
];

export default function SidebarComponent() {
    const { setType } = useDnD();
    const { toggleSidebar, open } = useSidebar();

    const onDragStart = (
        event: DragEvent<HTMLDivElement>,
        nodeType: string
    ) => {
        if (setType) {
            setType(nodeType);
            event.dataTransfer.effectAllowed = "move";
        }
    };

    return (
        <>
            <Button
                size="icon"
                variant="outline"
                onClick={toggleSidebar}
                className="absolute -top-2 -right-2 z-50 text-foreground"
            >
                <GetIcon icon="FaPlus" />
            </Button>
            <Sidebar
                side="right"
                variant="sidebar"
                className={cn(
                    "absolute translate-x-[16px] !-top-4 ml-4 transition-all rounded-sm bg-muted",
                    {
                        "!hidden": !open,
                    }
                )}
            >
                <>
                    <SidebarHeader>
                        <div className="h-10 flex justify-start items-center gap-4">
                            <h1 className="font-bold uppercase">E agora?</h1>
                        </div>
                        <Separator />
                    </SidebarHeader>
                    <SidebarContent>
                        <h1 className="p-2 text-muted-foreground">
                            Arraste e solte os nós abaixo para montar seu funil
                        </h1>
                        <div className="mt-4 flex flex-col gap-2">
                            {availableNodes.map((node) => (
                                <div
                                    key={node.type}
                                    className={cn(
                                        "p-2 flex justify-start items-center gap-2 cursor-pointer border-l-2 border-transparent hover:border-green-500",
                                        {
                                            "text-muted-foreground":
                                                node.disabled,
                                            "cursor-not-allowed": node.disabled,
                                            "hover:border-none": node.disabled,
                                        }
                                    )}
                                    onDragStart={(event) =>
                                        node.disabled
                                            ? undefined
                                            : onDragStart(event, node.type)
                                    }
                                    draggable
                                >
                                    <GetIcon icon={node.icon} />
                                    {node.name}
                                </div>
                            ))}
                        </div>
                    </SidebarContent>
                    <SidebarFooter />
                </>
            </Sidebar>
        </>
    );
}
