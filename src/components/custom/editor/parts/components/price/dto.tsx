import { z } from "zod";

import { ComponentItem } from "@/interfaces";

export const styleSchema = z.object({
    textColor: z.string().optional(),
});

export const valueSchema = z.object({
    content: z.string().optional(),
});

export type TStyleSchema = z.infer<typeof styleSchema>;
export type TValueSchema = z.infer<typeof valueSchema>;
export type TComponent = ComponentItem<TStyleSchema, TValueSchema>;

export const componentDefault: TComponent = {
    label: "Preço",
    icon: "PiCoinVerticalFill",
    type: "price",
    style: {
        textColor: "#000000",
    },
    value: {
        content: "Meu texto",
    },
};
