import { z } from "zod";

import { ComponentItem } from "@/interfaces";

export const styleSchema = z.object({
    backgroundColor: z.string().optional(),
});

export const valueSchema = z.object({
    text: z.string().optional(),
});

export type TStyleSchema = z.infer<typeof styleSchema>;
export type TValueSchema = z.infer<typeof valueSchema>;
export type TComponent = ComponentItem<TStyleSchema, TValueSchema>;

export const componentDefault: TComponent = {
    label: "Botão",
    icon: "IoMdRadioButtonOn",
    type: "button",
    isConnectable: true,
    style: {
        backgroundColor: "#000000",
    },
    value: {
        text: "Meu texto",
    },
};
