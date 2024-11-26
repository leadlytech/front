import { z } from "zod";

import { ComponentItem } from "@/interfaces";

export const styleSchema = z.object({
    bgColor: z.string().optional(),
    borderRadius: z.string().optional(),
});

export const valueSchema = z.object({
    url: z.string().optional(),
});

export type TStyleSchema = z.infer<typeof styleSchema>;
export type TValueSchema = z.infer<typeof valueSchema>;
export type TComponent = ComponentItem<TStyleSchema, TValueSchema>;

export const componentDefault: TComponent = {
    label: "Imagem",
    icon: "FaImage",
    type: "image",
    style: {
        bgColor: "transparent",
    },
    value: {
        url: "",
    },
};
