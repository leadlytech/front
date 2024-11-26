import React from "react";
import { ComponentItem } from "@/interfaces";
import { TComponent } from "./dto";

interface Props {
  component: ComponentItem;
  onEdit: (data: Partial<TComponent>) => void;
}

export function Options({ component, onEdit }: Props) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEdit({
      value: {
        url: e.target.value,
      },
    });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEdit({
      style: {
        ...component.style,
        bgColor: e.target.value,
      },
    });
  };

  const handleBorderRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEdit({
      style: {
        ...component.style,
        borderRadius: e.target.value + "px",
      },
    });
  };

  return (
    <div className="w-full p-2 bg-gray-100 text-gray-700 rounded-lg border border-gray-300 mb-2">
      <label className="block mb-2 text-gray-700" htmlFor="url">
        URL da Imagem
      </label>
      <input
        id="url"
        type="text"
        placeholder="Digite a URL da imagem"
        value={component.value?.url || ""}
        onChange={handleInputChange}
        autoFocus
        className="w-full p-2 border border-gray-300 rounded"
      />

      <label className="block mb-2 text-gray-700" htmlFor="bgColor">
        Cor de fundo
      </label>
      <input
        id="bgColor"
        type="color"
        onChange={handleColorChange}
        defaultValue={component.style?.bgColor || "#ffffff"}
        className="w-full p-2 border border-gray-300 rounded"
      />

      <label className="block mb-2 text-gray-700 mt-4" htmlFor="borderRadius">
        Arredondar bordas
      </label>
      <input
        id="borderRadius"
        type="range"
        min="0"
        max="150"
        defaultValue={parseInt(component.style?.borderRadius) || 0}
        onChange={handleBorderRadiusChange}
        className="w-full"
      />
    </div>
  );
}
