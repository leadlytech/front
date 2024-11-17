"use client";

import { ComponentItem } from "@/interfaces";
import React, { useRef, useEffect } from "react";

const availableComponents: Array<ComponentItem> = [
    {
        label: "Botão",
        type: "button",
    },
    {
        label: "Texto",
        type: "text",
        value: {
            content: "Meu texto",
        },
    },
    {
        label: "Preço",
        type: "price",
    },
    {
        label: "Vídeo",
        type: "video",
    },
    {
        label: "Imagem",
        type: "image",
    },
    {
        label: "Espaço",
        type: "space",
    },
];

type Props = {
    component: ComponentItem;
};

// Componente de item arrastável
function DraggableButton(props: Props) {
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const button = ref.current;

        const handleDragStart = (e: DragEvent) => {
            if (e.dataTransfer) {
                e.dataTransfer.setData(
                    "application/json",
                    JSON.stringify(props.component)
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
    }, []);

    return (
        <button
            ref={ref}
            className="w-full p-2 bg-gray-200 text-gray-700 rounded-lg border border-gray-500 mb-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            draggable
        >
            {props.component.label}
        </button>
    );
}

export function EditorMenu() {
    return (
        <div
            className={`absolute top-0 left-[250px] h-full bg-blue-500 z-15 transition-transform duration-300 translate-x-0`}
            style={{ width: "120px" }}
        >
            <div className="space-y-2 p-4">
                {availableComponents.map(
                    (component: ComponentItem, index: number) => (
                        <DraggableButton key={index} component={component} />
                    )
                )}
            </div>
        </div>
    );
}
