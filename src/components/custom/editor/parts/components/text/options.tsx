"use client";

import { TComponent } from "./dto";

import { Quill } from "@/components/custom";

type Props = {
    component: TComponent;
    onEdit: (data: Partial<TComponent>) => void;
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

    return (
        <div>
            <label className="block mb-2 text-gray-700">
                Conteúdo do Texto
            </label>
            <Quill
                theme="snow"
                value={component.value?.content}
                onChange={handleTextChange}
                modules={{
                    toolbar: [
                        ["bold", "italic", "underline", "strike", "link"],
                        [{ color: [] }, { background: [] }],
                        ["clean"],
                    ],
                }}
            />
        </div>
    );
}
