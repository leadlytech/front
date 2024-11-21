"use client";

import Image from "next/image";

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
                <div className="w-full h-full flex flex-col justify-center items-center gap-4">
                    <Image
                        src="/assets/svg/settings.svg"
                        alt="drag"
                        width={200}
                        height={200}
                    />
                    <h1 className="text-muted-foreground">
                        Selecione um componente
                    </h1>
                </div>
            )}
        </div>
    );
}
