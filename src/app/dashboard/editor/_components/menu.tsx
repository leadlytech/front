"use client";

import React, { useRef, useState, useEffect } from "react";
import { ComponentItem } from "@/interfaces";
import { textDefault } from "./components";

// Componentes disponíveis para arrastar
const availableComponents: Array<ComponentItem> = [
  { label: "Botão", type: "button" },
  { ...textDefault },
  { label: "Preço", type: "price" },
  { label: "Vídeo", type: "video" },
  { label: "Imagem", type: "image" },
  { label: "Espaço", type: "space" },
];

type Props = {
  component: ComponentItem;
};

// Componente de item arrastável
function DraggableButton({ component }: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = ref.current;

    const handleDragStart = (e: DragEvent) => {
      if (e.dataTransfer) {
        e.dataTransfer.setData(
          "application/json",
          JSON.stringify(component)
        );
        e.dataTransfer.effectAllowed = "move";
      }
      button?.classList.add("opacity-50");
    };

    const handleDragEnd = () => {
      button?.classList.remove("opacity-50");
    };

    button?.addEventListener("dragstart", handleDragStart);
    button?.addEventListener("dragend", handleDragEnd);

    return () => {
      button?.removeEventListener("dragstart", handleDragStart);
      button?.removeEventListener("dragend", handleDragEnd);
    };
  }, [component]);

  return (
    <button
      ref={ref}
      className="w-full p-2 bg-gray-200 text-gray-700 rounded-lg border border-gray-500 mb-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
      draggable
    >
      {component.label}
    </button>
  );
}

function DesignArea() {
  const [droppedComponents, setDroppedComponents] = useState<ComponentItem[]>([]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    const component = JSON.parse(data) as ComponentItem;

    setDroppedComponents((prev) => {
      const updatedComponents = [...prev];
      updatedComponents.splice(index, 0, component);
      return updatedComponents;
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 
  };

  return (
    <div className="bg-gray-100 h-full p-4 space-y-4">
      {/* Renderização de áreas de drop e componentes */}
      {droppedComponents.map((component, index) => (
        <React.Fragment key={`fragment-${index}`}>
          <div
            key={`dropzone-before-${index}`}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
            className="bg-purple-200 px-8 py-4 rounded-md border border-dashed border-gray-400 mb-2"
            style={{ minHeight: "30px" }}
          >
            Solte aqui
          </div>
          <div
            key={`component-${index}`}
            className="bg-white p-4 rounded-md border border-gray-400"
          >
            {component.label}
          </div>
        </React.Fragment>
      ))}
      {/* Área final para soltar no final da lista */}
      <div
        key={`dropzone-end`}
        onDrop={(e) => handleDrop(e, droppedComponents.length)}
        onDragOver={handleDragOver}
        className="bg-purple-200 px-8 py-4 rounded-md border border-dashed border-gray-400 mb-2"
        style={{ minHeight: "30px" }}
      >
        Solte aqui para adicionar ao final
      </div>
    </div>
  );
}

export function EditorMenu() {
  return (
    <div
      className="absolute top-0 left-[250px] h-full bg-gray-500 z-15 transition-transform duration-300 translate-x-0"
      style={{ width: "120px" }}
    >
      <div className="space-y-2 p-4">
        {availableComponents.map((component, index) => (
          <DraggableButton key={index} component={component} />
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="flex h-screen">
      <EditorMenu />
      <div className="flex-grow flex items-center justify-center bg-red-500 p-4">
        <DesignArea />
      </div>
    </div>
  );
}