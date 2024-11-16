"use client";
import {RenderComponent} from "./_components"
import { GetIcon } from "@/components/custom";
import { ComponentItem } from "@/interfaces";
import React, { useState, useRef, useEffect } from "react";

// Interface para definir o tipo de componente que podemos armazenar

// Componente de item arrastável
function DraggableButton({ type, label }: ComponentItem) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = ref.current;

    const handleDragStart = (e: DragEvent) => {
      if (e.dataTransfer) {
        e.dataTransfer.setData(
          "application/json",
          JSON.stringify({ type, label })
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
  }, [type, label]);

  return (
    <button
      ref={ref}
      className="w-full p-2 bg-gray-200 text-gray-700 rounded-lg border border-gray-500 mb-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
      draggable
    >
      {label}
    </button>
  );
}

// Área de design onde os componentes são adicionados
function DesignArea({
  onSelectComponent,
  components,
  setComponents,
}: {
  onSelectComponent: (index: number) => void;
  components: ComponentItem[];
  setComponents: React.Dispatch<React.SetStateAction<ComponentItem[]>>;
}) {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

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
          newComponents.splice(previewIndex, 0, item);
          return newComponents;
        });
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
    <div
      ref={ref}
      className="h-full bg-white border border-gray-300 rounded shadow-md p-4 overflow-auto"
    >
      <div className="flex flex-col items-center space-y-4">
        {components.map((component, index) => (
          <React.Fragment key={index}>
            {previewIndex === index && (
              <div className="w-full max-w-sm p-4 bg-white border-2 border-purple-500 rounded transition duration-300">
                Pré-visualização aqui
              </div>
            )}
            <div
              className="w-full max-w-sm"
              onClick={() => onSelectComponent(index)}
            >
              {/* {component.type === "button" ? (
                <button
                  className="w-full p-2 bg-blue-500 text-white rounded-lg border border-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  style={component.style}
                >
                  {component.label}
                </button>
              ) : component.type === "text" ? (
                <input
                  type="text"
                  value={component.label}
                  readOnly
                  style={component.style}
                  className="w-full p-2 bg-gray-100 text-gray-700 rounded-lg border border-gray-300 mb-2"
                />
              ) : component.type === "price" ? (
                <div className="flex flex-col p-4 bg-gray-100 border border-gray-300 rounded text-center">
                  <span className="text-sm font-medium">{component.label}</span>
                  <span className="text-sm">{component.prefix}</span>
                  <span className="text-xl font-bold">
                    R$ {component.value?.toFixed(2)}
                  </span>
                  <span className="text-sm">{component.suffix}</span>
                </div>
              ) */} <RenderComponent component={component} />: ( 
                <div className="p-4 bg-gray-100 border border-gray-300 rounded">
                  {component.label}
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
        {previewIndex === components.length && (
          <div className="w-full max-w-sm p-4 bg-white border-2 border-purple-500 rounded transition duration-300">
            Pré-visualização aqui
          </div>
        )}
      </div>
    </div>
  );
}

function EditPanel({
  component,
  onEdit,
}: {
  component: ComponentItem | null;
  onEdit: (updates: Partial<ComponentItem>) => void;
}) {
  if (!component) return null;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEdit({ label: e.target.value });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEdit({
      style: {
        ...component.style,
        color: component.type === "text" ? e.target.value : undefined,
        backgroundColor:
          component.type === "button" ? e.target.value : undefined,
      },
    });
  };

  const handlePrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEdit({ prefix: e.target.value });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEdit({ value: parseFloat(e.target.value) });
  };

  const handleSuffixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEdit({ suffix: e.target.value });
  };

  return (
    <div className="p-4 bg-gray-100 shadow-md rounded border border-gray-300 space-y-4">
      {component.type === "button" && (
        <div>
          <label className="block mb-2 text-gray-700">Texto do Botão</label>
          <input
            type="text"
            onChange={handleTextChange}
            value={component.label}
            className="border p-2 w-full"
          />
          <label className="block mt-4 mb-2 text-gray-700">Cor do Botão</label>
          <input
            type="color"
            onChange={handleColorChange}
            defaultValue={component.style?.backgroundColor || "#000000"}
          />
        </div>
      )}
      {component.type === "text" && (
        <div>
          <label className="block mb-2 text-gray-700">Conteúdo do Texto</label>
          <input
            type="text"
            onChange={handleTextChange}
            value={component.label}
            className="border p-2 w-full"
          />
          <label className="block mt-4 mb-2 text-gray-700">Cor do Texto</label>
          <input
            type="color"
            onChange={handleColorChange}
            defaultValue={component.style?.color || "#000000"}
          />
        </div>
      )}
      {component.type === "price" && (
        <div>
          <label className="block mb-2 text-gray-700">Título</label>
          <input
            type="text"
            onChange={handleTextChange}
            value={component.label}
            className="border p-2 w-full"
          />
          <label className="block mt-4 mb-2 text-gray-700">Valor</label>
          <input
            type="number"
            onChange={handleValueChange}
            value={component.value || 0}
            className="border p-2 w-full"
          />
        </div>
      )}
    </div>
  );
}

export default function Board() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [components, setComponents] = useState<ComponentItem[]>([]);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

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
    <div className="flex h-screen w-screen overflow-hidden relative">
      {/* Sidebar */}
      <div
        className={`absolute top-0 left-0 h-full bg-gray-700 text-white transition-transform duration-300 z-20 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "250px" }}
      >
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">Sidebar</h1>
        </div>
      </div>

      {/* Lista de Componentes - Quadrado Azul */}
      <div
        className={`absolute top-0 left-[250px] h-full bg-blue-500 z-15 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-[250px]"
        }`}
        style={{ width: "120px" }}
      >
        <div className="space-y-2 p-4">
          <DraggableButton type="button" label="Botão" />
          <DraggableButton type="text" label="Texto" />
          <DraggableButton type="price" label="Preço" />
          <DraggableButton type="header" label="Cabeçalho" />
          <DraggableButton type="image" label="Imagem" />
          <DraggableButton type="form" label="Formulário" />
          <DraggableButton type="cta" label="Call-to-Action" />
        </div>
      </div>

      {/* Botão para abrir/fechar a Sidebar */}
      <button
        onClick={toggleSidebar}
        className={`
          absolute
          top-4
          left-[370px]
          bg-gray-700
          text-white
          p-2
          rounded-full
          hover:bg-gray-600
          focus:outline-none
          focus:ring-2
          focus:ring-gray-600
          transition-transform
          duration-300
          z-30
          ${isOpen ? "translate-x-0" : "-translate-x-[250px]"}
        `}
      >
        {/* <img
          src="/assets/images/direito.ico"
          alt="Toggle Sidebar"
          className={`
            w-8 h-8
            transition-transform
            duration-300
            ${isOpen ? "rotate-180" : "rotate-0"}
          `}
        /> */}
        <GetIcon
          icon="FaArrowRight"
          className={`
            w-8 h-8
            transition-transform
            duration-300
            ${isOpen ? "rotate-180" : "rotate-0"}
          `}
        />
      </button>

      {/* Quadrado Verde Esquerdo */}
      <div className="flex-none w-1/5 bg-green-500"></div>

      {/* Quadrado Vermelho Central */}
      <div className="flex-grow bg-red-500 flex items-center justify-center">
        <div className="w-3/4 h-3/4">
          <DesignArea
            onSelectComponent={handleSelectComponent}
            components={components}
            setComponents={setComponents}
          />
        </div>
      </div>

      {/* Quadrado Cinza Claro Direito - Painel de Edição */}
      <div className="flex-none w-1/5 bg-gray-200 p-4">
        <EditPanel
          component={selectedIndex !== null ? components[selectedIndex] : null}
          onEdit={handleEditComponent}
        />
      </div>
    </div>
  );
}
