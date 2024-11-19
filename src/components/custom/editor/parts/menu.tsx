"use client";

import React, { useRef, useEffect } from "react";
import { ComponentItem } from "@/interfaces";

import {
    textDefault,
    buttonDefault,
    priceDefault,
    videoDefault,
    imageDefault,
    spaceDefault,
} from "./components";

import { GetIcon } from "@/components/custom";

import { Button, ScrollArea } from "@/components/ui";

// Componentes disponíveis para arrastar
const availableComponents: Array<ComponentItem> = [
    { ...textDefault },
    { ...buttonDefault },
    { ...priceDefault },
    { ...videoDefault },
    { ...imageDefault },
    { ...spaceDefault },
];

type Props = {
    component: ComponentItem;
};

// Componente de item arrastável
function DraggableButton({ component }: Props) {
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const button = ref.current;

        const handleDragStart = (e: DragEvent) => {
            if (e.dataTransfer) {
                e.dataTransfer.setData(
                    "application/json",
                    JSON.stringify(component)
                );
                e.dataTransfer.effectAllowed = "move";
            }
            button?.classList.add("opacity-50");
        };

        const handleDragEnd = () => {
            button?.classList.remove("opacity-50");
        };

        button?.addEventListener("dragstart", handleDragStart);
        button?.addEventListener("dragend", handleDragEnd);

        return () => {
            button?.removeEventListener("dragstart", handleDragStart);
            button?.removeEventListener("dragend", handleDragEnd);
        };
    }, [component]);

    return (
        <Button
            ref={ref}
            className="w-full mb-2 flex justify-start items-center gap-2"
            variant="outline"
            draggable
        >
            <GetIcon icon={component.icon} className="w-6 h-6" />
            {component.label}
        </Button>
    );
}

export function EditorMenu() {
    return (
        <div className="w-48 h-full">
            <ScrollArea className="h-full flex flex-col gap-2">
                {availableComponents.map((component, index) => (
                    <DraggableButton key={index} component={component} />
                ))}
            </ScrollArea>
        </div>
    );
}
