import { z } from "zod";
import { ComponentItem } from "@/interfaces";

export const valueSchema = z.object({
    url: z.string().optional(),
});

export const styleSchema = z.object({
    bgColor: z.string().optional(),
    borderRadius: z.string().optional(),
});

export type TValueSchema = z.infer<typeof valueSchema>;
export type TStyleSchema = z.infer<typeof styleSchema>;
export type TComponent = ComponentItem<TStyleSchema, TValueSchema>;

export const componentDefault: TComponent = {
    label: "Vídeo",
    icon: "FaVideo",
    type: "video",
    style: {
        bgColor: "transparent",
        borderRadius: "0px",
    },
    value: {
        url: "",
    },
};