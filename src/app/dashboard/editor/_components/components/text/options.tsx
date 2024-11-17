"use client";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { TComponent, TSchema } from "./dto";

type Props = {
    component: TComponent;
    onEdit: (data: Partial<TSchema>) => void;
};

export function Options({ component, onEdit }: Props) {
    const handleTextChange = (content: string) => {
        if (component.value?.content !== content) {
            onEdit({
                value: {
                    ...component.value,
                    content,
                },
            });
        }
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onEdit({
            value: {
                ...component.value,
                textColor: e.target.value,
            },
        });
    };

    return (
        <div>
            <label className="block mb-2 text-gray-700">
                Conteúdo do Texto
            </label>
            <ReactQuill
                theme="snow"
                value={component.value?.content}
                onChange={handleTextChange}
            />
            <label className="block mt-4 mb-2 text-gray-700">
                Cor do Texto
            </label>
            <input
                type="color"
                onChange={handleColorChange}
                defaultValue={component.value?.textColor || "#000000"}
            />
        </div>
    );
}
