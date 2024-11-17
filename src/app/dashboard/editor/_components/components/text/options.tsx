"use client";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { z } from "zod";

import { ComponentItem } from "@/interfaces";

const schema = z.object({
    textColor: z.string(),
    content: z.string(),
});

type Props = {
    component: ComponentItem<z.infer<typeof schema>>;
    setter: (data: z.infer<typeof schema>) => void;
};

export function Options({ component, setter }: Props) {
    const handleTextChange = (content: string) => {
        console.log("handleTextChange");
        console.log(content);
        setter((prevValue: any) => {
            return {
                ...prevValue,
                content,
            };
        });
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setter((prevValue: any) => {
            return {
                ...prevValue,
                textColor: e.target.value,
            };
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
