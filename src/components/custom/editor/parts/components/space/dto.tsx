import { z } from "zod";

import { ComponentItem } from "@/interfaces";

export const styleSchema = z.object({
    width: z.string().optional(),
    height: z.string().optional(),
});

export const valueSchema = z.object({});

export type TStyleSchema = z.infer<typeof styleSchema>;
export type TValueSchema = z.infer<typeof valueSchema>;
export type TComponent = ComponentItem<TStyleSchema, TValueSchema>;

export const componentDefault: TComponent = {
    label: "Espaço",
    icon: "AiOutlineArrowsAlt",
    type: "space",
    style: {
        width: "100px",
        height: "100px",
    },
    value: {},
};
