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
        className={`absolute top-0 left-0 h-full bg-[#18181B] text-white transition-transform duration-300 z-20 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "250px" }}
      >
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">Sidebar</h1>
          <EditorMenu />
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
        <GetIcon
          icon="FaArrowRight"
          className={`w-8 h-8 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Área principal */}
      <div className="flex flex-col flex-grow bg-[#0A0A0A]">
        {/* Header */}
        <div className="flex items-center justify-between bg-white px-6 py-4 border-b border-gray-300">
          <h1 className="text-lg font-semibold" />
          <div className="flex space-x-4">
            {/* Botões de Salvar e Publicar */}
            <button className="border bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
              Salvar
            </button>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700">
              Publicar
            </button>
          </div>
        </div>

        {/* Design Area */}
        <div className="flex-grow flex items-center justify-center">
          <div className="w-2/4 h-3/4">
            <DesignArea
              onSelectComponent={handleSelectComponent}
              components={components}
              setComponents={setComponents}
            />
          </div>
        </div>
      </div>

      {/* Painel de Edição */}
      <div className="flex-none w-1/5 bg-[#18181B] p-4">
        <ComponentControl
          component={selectedIndex !== null ? components[selectedIndex] : null}
          onEdit={handleEditComponent}
        />
      </div>
    </div>
  );
}
