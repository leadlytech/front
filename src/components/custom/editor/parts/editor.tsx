"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";

import { ComponentItem } from "@/interfaces";
import { cn } from "@/lib/utils";

import { RenderComponent } from "./render";

import { GetIcon } from "@/components/custom";

import { Button, ScrollArea } from "@/components/ui";

export function DesignArea({
    selectedIndex,
    onSelectComponent,
    components,
    setComponents,
    liveMode,
}: {
    selectedIndex?: number;
    onSelectComponent: (index: number | null) => void;
    components: ComponentItem[];
    setComponents: React.Dispatch<React.SetStateAction<ComponentItem[]>>;
    liveMode: boolean;
}) {
    const [elementHoverIndex, setElementHoverIndex] = useState<
        number | undefined
    >();
    const [previewIndex, setPreviewIndex] = useState<number | null>(null);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragEnabled, setDragEnabled] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const moveElementAtIndex = (fromIndex: number, toIndex: number) => {
        setComponents((prevComponents) => {
            if (
                fromIndex < 0 ||
                fromIndex >= prevComponents.length ||
                toIndex < 0 ||
                toIndex >= prevComponents.length ||
                fromIndex === toIndex
            ) {
                return prevComponents;
            }

            const updatedComponents = [...prevComponents];
            const [movedElement] = updatedComponents.splice(fromIndex, 1); // Remove o elemento do índice atual
            updatedComponents.splice(toIndex, 0, movedElement); // Insere o elemento no novo índice

            return updatedComponents;
        });
    };

    const removeElementAtIndex = (index: number) => {
        setComponents((prevComponents) => {
            if (index < 0 || index >= prevComponents.length) {
                return prevComponents;
            }

            return prevComponents.filter((_, i) => i !== index);
        });
    };

    const duplicateElementAtIndex = (index: number) => {
        setComponents((prevComponents) => {
            if (index < 0 || index >= prevComponents.length) {
                return prevComponents;
            }

            const newComponents = [...prevComponents];
            newComponents.splice(index + 1, 0, prevComponents[index]);

            return newComponents;
        });
    };

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
                setComponents((prev) => {
                    const newComponents = [...prev];
                    newComponents.splice(previewIndex, 0, {
                        ...item,
                        id: `e-${Date.now().toString()}`,
                    });
                    return newComponents;
                });
                onSelectComponent(null);
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
        <ScrollArea ref={ref} className="w-full h-full p-4">
            <div className="w-full h-full flex flex-col justify-start items-center space-y-2">
                {components.length === 0 &&
                previewIndex !== components.length ? (
                    <div className="h-full flex flex-col justify-center items-center gap-4">
                        <Image
                            src="/assets/svg/drag.svg"
                            alt="drag"
                            width={200}
                            height={200}
                        />
                        <h1 className="text-muted-foreground">
                            Arraste os componentes para cá!
                        </h1>
                    </div>
                ) : undefined}
                {components.map((component: ComponentItem, index) => {
                    const isHovered = liveMode
                        ? false
                        : index === elementHoverIndex;
                    return (
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
                                draggable={liveMode ? false : dragEnabled}
                                onDragStart={() => {
                                    if (!dragEnabled) return;
                                    setDraggedIndex(index);
                                }}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setPreviewIndex(index);
                                }}
                                onDrop={() => {
                                    if (draggedIndex !== null) {
                                        moveElementAtIndex(draggedIndex, index);
                                        setDraggedIndex(null);
                                    }
                                    setPreviewIndex(null);
                                }}
                                onDragEnd={() => {
                                    setDraggedIndex(null);
                                    setPreviewIndex(null);
                                }}
                                onDragLeave={() => setPreviewIndex(null)}
                                onClick={() => onSelectComponent(index)}
                                onMouseEnter={() => setElementHoverIndex(index)}
                                onMouseLeave={() =>
                                    setElementHoverIndex(undefined)
                                }
                                className={cn(
                                    "w-full max-w-lg min-h-1 border-2 border-transparent",
                                    {
                                        "cursor-pointer": !liveMode,
                                        "relative border-blue-500 rounded-md":
                                            isHovered,
                                        "border-blue-500 rounded-md":
                                            !liveMode &&
                                            selectedIndex !== undefined
                                                ? selectedIndex === index
                                                : false,
                                    }
                                )}
                            >
                                <RenderComponent component={component} />
                                {isHovered ? (
                                    <div className="absolute top-1 left-0 z-50 flex gap-0 justify-start text-sm text-white bg-blue-400 shadow-lg rounded-md overflow-hidden">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="w-8 h-8 cursor-move hover:bg-blue-700 rounded-none"
                                            onMouseDown={() =>
                                                setDragEnabled(true)
                                            }
                                            onMouseUp={() =>
                                                setDragEnabled(false)
                                            }
                                            onMouseLeave={() =>
                                                setDragEnabled(false)
                                            }
                                        >
                                            <GetIcon icon="IoMoveSharp" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="w-8 h-8 cursor-pointer hover:bg-blue-700 rounded-none"
                                            onClick={() =>
                                                onSelectComponent(index)
                                            }
                                        >
                                            <GetIcon icon="MdEdit" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="w-8 h-8 cursor-pointer hover:bg-blue-700 rounded-none"
                                            onClick={() =>
                                                duplicateElementAtIndex(index)
                                            }
                                        >
                                            <GetIcon icon="FaClone" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="w-8 h-8 cursor-pointer hover:bg-blue-700 rounded-none"
                                            onClick={() =>
                                                removeElementAtIndex(index)
                                            }
                                        >
                                            <GetIcon icon="FaTrash" />
                                        </Button>
                                    </div>
                                ) : undefined}
                            </div>
                        </React.Fragment>
                    );
                })}
                {previewIndex === components.length && (
                    <div className="w-full max-w-sm p-4 text-muted-foreground bg-transparent border rounded transition">
                        <div className="flex justify-center items-center gap-2 animate-bounce">
                            <GetIcon icon="IoIosArrowDropdown" />
                            Solte aqui
                        </div>
                    </div>
                )}
            </div>
        </ScrollArea>
    );
}
