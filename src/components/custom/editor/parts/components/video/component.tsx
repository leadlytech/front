import React from "react";
import { TComponent } from "./dto";

interface Props {
  component: TComponent;
}

export function Component({ component }: Props) {
  const videoURL = component.value?.url || ""; // Usa uma string vazia como fallback

  return (
    <div>
      {videoURL ? (
        <video
          src={videoURL}
          controls
          className="w-full h-auto"
          style={{
            backgroundColor: component.style?.bgColor,
            borderRadius: component.style?.borderRadius,
          }}
        >
          Seu navegador não suporta o elemento de vídeo.
        </video>
      ) : (
        <p>Por favor, forneça uma URL de vídeo válida.</p>
      )}
    </div>
  );
}
