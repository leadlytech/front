"use client";

import { useState } from "react";
import { ComponentItem } from "@/interfaces";

import { DesignArea, ComponentControl, EditorMenu } from "./parts";

import { GetIcon } from "@/components/custom";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    Button,
    Input,
} from "@/components/ui";

type Props = {
    currentComponents: ComponentItem[];
    saveComponents: (components: ComponentItem[]) => void;
    discardComponentsChanges: () => void;
};

export function Editor({
    currentComponents,
    saveComponents,
    discardComponentsChanges,
}: Props) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [components, setComponents] =
        useState<ComponentItem[]>(currentComponents);

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

    return (
        <Dialog open={true}>
            <DialogContent className="min-w-[95vw] h-[95vh] [&>button]:hidden">
                <DialogTitle className="hidden">Editor de Página</DialogTitle>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-2">
                        <Input defaultValue="Nome da página" />
                        <div className="flex justify-center items-center gap-2">
                            <Button
                                size="icon"
                                className="text-white bg-green-500"
                                onClick={() => saveComponents(components)}
                            >
                                <GetIcon icon="FaSave" />
                            </Button>
                            <Button
                                size="icon"
                                className="text-white bg-red-500"
                                onClick={() => discardComponentsChanges()}
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
                                    liveMode={false}
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
