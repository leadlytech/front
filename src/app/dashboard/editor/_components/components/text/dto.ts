import { z } from "zod";

import { ComponentItem } from "@/interfaces";

export const schema = z.object({
    textColor: z.string().optional(),
    content: z.string().optional(),
});

export type TSchema = z.infer<typeof schema>;
export type TComponent = ComponentItem<TSchema>;

export const componentDefault: TComponent = {
    label: "Texto",
    type: "text",
    value: {
        textColor: "#000000",
        content: "Meu texto",
    },
};
