"use client";

import React, { useState, useRef, useEffect } from "react";

import { ComponentItem } from "@/interfaces";

import { RenderComponent } from "./render";

import { GetIcon } from "@/components/custom";

// Área de design onde os componentes são adicionados
export function DesignArea({
    onSelectComponent,
    components,
    setComponents,
}: {
    onSelectComponent: (index: number) => void;
    components: ComponentItem[];
    setComponents: React.Dispatch<React.SetStateAction<ComponentItem[]>>;
}) {
    const [previewIndex, setPreviewIndex] = useState<number | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const designArea = ref.current;

        const handleDragOver = (e: DragEvent) => {
            e.preventDefault();
            if (!designArea) return;

            const boundingRect = designArea.getBoundingClientRect();
            const offsetY = e.clientY - boundingRect.top;
            const newIndex = getInsertIndex(offsetY);
            setPreviewIndex(newIndex);
        };

        const handleDrop = (e: DragEvent) => {
            e.preventDefault();
            const data = e.dataTransfer?.getData("application/json");
            if (data && previewIndex !== null) {
                const item = JSON.parse(data);
                console.log("Soltou");
                console.log(item);
                setComponents((prev) => {
                    const newComponents = [...prev];
                    newComponents.splice(previewIndex, 0, item);
                    return newComponents;
                });
            }
            setPreviewIndex(null); // Remove a pré-visualização após soltar
        };

        const handleDragLeave = () => {
            setPreviewIndex(null); // Remove a pré-visualização quando o arraste sai da área
        };

        designArea?.addEventListener("dragover", handleDragOver);
        designArea?.addEventListener("drop", handleDrop);
        designArea?.addEventListener("dragleave", handleDragLeave);

        return () => {
            designArea?.removeEventListener("dragover", handleDragOver);
            designArea?.removeEventListener("drop", handleDrop);
            designArea?.removeEventListener("dragleave", handleDragLeave);
        };
    }, [previewIndex]);

    const getInsertIndex = (y: number) => {
        const elements = Array.from(
            ref.current?.children || []
        ) as HTMLDivElement[];

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const rect = element.getBoundingClientRect();
            const elementMiddle = rect.top + rect.height / 2;
            if (y < elementMiddle) {
                return i;
            }
        }
        return elements.length;
    };

    return (
        <div ref={ref} className="h-full p-4 border rounded-md overflow-auto">
            <div className="flex flex-col items-center space-y-4">
                {components.map((component, index) => (
                    <React.Fragment key={index}>
                        {previewIndex === index && (
                            <div className="w-full max-w-sm p-4 text-muted-foreground bg-transparent border rounded transition">
                                <div className="flex justify-center items-center gap-2 animate-bounce">
                                    <GetIcon icon="IoIosArrowDropdown" />
                                    Solte aqui
                                </div>
                            </div>
                        )}
                        <div
                            className="w-full max-w-sm"
                            onClick={() => onSelectComponent(index)}
                        >
                            <RenderComponent component={component} />
                        </div>
                    </React.Fragment>
                ))}
                {previewIndex === components.length && (
                    <div className="w-full max-w-sm p-4 text-muted-foreground bg-transparent border rounded transition">
                        <div className="flex justify-center items-center gap-2 animate-bounce">
                            <GetIcon icon="IoIosArrowDropdown" />
                            Solte aqui
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
