"use client";

import { useState, useEffect } from "react";
import { ComponentItem } from "@/interfaces";

import { DesignArea, ComponentControl, EditorMenu } from "./parts";

import { GetIcon } from "@/components/custom";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    Button,
    Input,
} from "@/components/ui";

export function Editor() {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [components, setComponents] = useState<ComponentItem[]>([]);

    const handleSelectComponent = (index: number) => {
        setSelectedIndex(index);
    };

    const handleEditComponent = (updates: Partial<ComponentItem>) => {
        if (selectedIndex !== null) {
            setComponents((prev) => {
                const updatedComponents = [...prev];
                updatedComponents[selectedIndex] = {
                    ...updatedComponents[selectedIndex],
                    ...updates,
                };
                return updatedComponents;
            });
        }
    };

    useEffect(() => {
        console.log("components");
        console.log(components);
    }, [components]);

    return (
        <Dialog defaultOpen={true}>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent className="min-w-[95vw] h-[95vh] [&>button]:hidden">
                <DialogTitle className="hidden">Editor de Página</DialogTitle>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-2">
                        <Input defaultValue="Nome da página" />
                        <div className="flex justify-center items-center gap-2">
                            <Button
                                size="icon"
                                className="text-white bg-green-500"
                            >
                                <GetIcon icon="FaSave" />
                            </Button>
                            <Button
                                size="icon"
                                className="text-white bg-red-500"
                            >
                                <GetIcon icon="IoClose" />
                            </Button>
                        </div>
                    </div>
                    <div className="h-full flex gap-1 overflow-hidden relative">
                        <EditorMenu />
                        <div className="w-full h-full flex-grow flex items-center justify-center">
                            <div className="w-full h-full">
                                <DesignArea
                                    onSelectComponent={handleSelectComponent}
                                    components={components}
                                    setComponents={setComponents}
                                />
                            </div>
                        </div>
                        <div className="w-2/5 h-full p-2 rounded-md border">
                            <ComponentControl
                                component={
                                    selectedIndex !== null
                                        ? components[selectedIndex]
                                        : null
                                }
                                onEdit={handleEditComponent}
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}