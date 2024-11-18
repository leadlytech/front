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

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEdit({ value: parseFloat(e.target.value) });
  };

  return (
    <div className="p-4 bg-gray-100 shadow-md rounded border border-gray-300 space-y-4">
      <RenderOptions component={component} onEdit={onEdit} />
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
