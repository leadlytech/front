"use client";

import { TComponent } from "./dto";

type Props = {
    component: TComponent;
    onEdit: (data: Partial<TComponent>) => void;
};

export function Options({ component, onEdit }: Props) {
    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newWidth = `${parseInt(e.target.value, 10)}px`;
        if (component.style?.width !== newWidth) {
            onEdit({
                style: {
                    ...component.style,
                    width: newWidth,
                },
            });
        }
    };

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newHeight = `${parseInt(e.target.value, 10)}px`;
        if (component.style?.height !== newHeight) {
            onEdit({
                style: {
                    ...component.style,
                    height: newHeight,
                },
            });
        }
    };

    return (
        <div style={{ maxWidth: "200px", margin: "0 auto" }}>
            <label className="block mb-2 text-gray-700">
                Tamanho do espaço (px)
            </label>
            <input
                type="number"
                value={parseInt(component.style?.height || "100", 10)}
                onChange={handleHeightChange}
                className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
        </div>
    );
}
