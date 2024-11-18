import React from "react";
import { TComponent } from "./dto";

interface Props {
  component: TComponent;
}

export function Component({ component }: Props) {
  return (
    <img
      src={component.value?.url}
      alt="Imagem"
      className="w-full h-auto"
      style={{
        backgroundColor: component.style?.bgColor,
      }}
    />
  );
}
