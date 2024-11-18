"use client";

import { DesignArea, ComponentControl, EditorMenu } from "./_components";
import { GetIcon } from "@/components/custom";
import { ComponentItem } from "@/interfaces";
import React, { useState } from "react";

export default function Page() {
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
    console.log("selectedIndex");
    console.log(selectedIndex);
    console.log(updates);
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
          <EditorMenu />
        </div>
      </div>

      {/* Lista de Componentes - Quadrado Azul */}
      <div className="flex-none w-[120px] bg-blue-500 p-4 space-y-2">
        {/* Botões dos Componentes */}
        <button className="w-full p-2 bg-gray-200 text-gray-700 rounded-lg border border-gray-500 mb-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
          Botão
        </button>
        <button className="w-full p-2 bg-gray-200 text-gray-700 rounded-lg border border-gray-500 mb-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
          Texto
        </button>
        {/* Adicione mais botões conforme necessário */}
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
      <div className="flex-none w-1/5 bg-gray-500"></div>

      {/* Quadrado Vermelho Central */}
      <div className="flex-grow bg-gray-500 flex items-center justify-center">
        <div className="w-3/4 h-3/4">
          <DesignArea
            onSelectComponent={handleSelectComponent}
            components={components}
            setComponents={setComponents}
          />
        </div>
      </div>

      {/* Quadrado Cinza Claro Direito - Painel de Edição */}
      <div className="flex-none w-1/5 bg-gray-500 p-4">
        <ComponentControl
          component={selectedIndex !== null ? components[selectedIndex] : null}
          onEdit={handleEditComponent}
        />
      </div>
    </div>
  );
}
