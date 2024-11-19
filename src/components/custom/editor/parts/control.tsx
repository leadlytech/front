"use client";

import { RenderOptions } from "./render";
import { ComponentItem } from "@/interfaces";

export function ComponentControl({
    component,
    onEdit,
}: {
    component: ComponentItem | null;
    onEdit: (updates: Partial<ComponentItem>) => void;
}) {
    return (
        <div className="w-full h-full">
            {component ? (
                <RenderOptions component={component} onEdit={onEdit} />
            ) : (
                <div className="w-full h-full flex justify-center items-center">
                    <h1>Selecione um componente</h1>
                </div>
            )}
        </div>
    );
}
