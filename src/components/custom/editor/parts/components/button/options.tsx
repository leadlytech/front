"use client";

import { TComponent } from "./dto";

type Props = {
    component: TComponent;
    onEdit: (data: Partial<TComponent>) => void;
};

export function Options({ component, onEdit }: Props) {
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onEdit({
            value: {
                ...component.value,
                text: e.target.value,
            },
        });
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onEdit({
            style: {
                ...component.style,
                backgroundColor: e.target.value,
            },
        });
    };

    return (
        <div>
            <label className="block mb-2 text-gray-700" htmlFor="text">
                Texto do Botão
            </label>
            <input
                id="text"
                type="text"
                onChange={handleTextChange}
                value={component.value?.text || ""}
                className="border p-2 w-full"
            />
            <label className="block mt-4 mb-2 text-gray-700" htmlFor="bgColor">
                Cor do Botão
            </label>
            <input
                id="bgColor"
                type="color"
                onChange={handleColorChange}
                value={component.style?.backgroundColor || "#000000"}
            />
        </div>
    );
}
