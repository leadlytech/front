import React from "react";
import { TComponent } from "./dto";

interface Props {
    component: TComponent;
}

export function Component({ component }: Props) {
    return (
        <img
            src={component.value?.url || "https://via.placeholder.com/150"}
            alt="Imagem"
            className="w-full h-auto"
            style={{
                backgroundColor: component.style?.bgColor,
                borderRadius: component.style?.borderRadius || "0px",
            }}
        />
    );
}
