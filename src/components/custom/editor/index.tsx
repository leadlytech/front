"use client";

import { useState } from "react";
import { ComponentItem } from "@/interfaces";

import { DesignArea, ComponentControl, EditorMenu } from "./parts";

import { NodeData } from "../flow/nodes/pageNode";

import { GetIcon } from "@/components/custom";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    Button,
    Input,
} from "@/components/ui";

type Props = {
    currentData: NodeData;
    saveData: (data: NodeData) => void;
    discardComponentsChanges: () => void;
};

export function Editor({
    currentData,
    saveData,
    discardComponentsChanges,
}: Props) {
    const [name, setName] = useState<string>(currentData.name);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [components, setComponents] = useState<ComponentItem[]>(
        currentData.components || []
    );

    const handleSelectComponent = (index: number | null) => {
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
                <div className="h-[80vh] flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-2">
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className="flex justify-center items-center gap-2">
                            <Button
                                size="icon"
                                className="text-white bg-green-500"
                                onClick={() =>
                                    saveData({
                                        name,
                                        components,
                                    })
                                }
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
                    <div className="h-full flex gap-1 relative">
                        <EditorMenu />
                        <div className="w-full h-full border rounded-md">
                            <DesignArea
                                selectedIndex={selectedIndex ?? undefined}
                                onSelectComponent={handleSelectComponent}
                                components={components}
                                setComponents={setComponents}
                                liveMode={false}
                            />
                        </div>
                        <div className="w-2/5 h-full p-2 flex flex-grow overflow-y-auto rounded-md border">
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
