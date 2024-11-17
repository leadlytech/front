/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties } from "react";

type ComponentType = "button" | "text" | "price" | "image" | "video" | "space";

export interface ComponentItem<T = any> {
    id?: string;
    label: string;
    type: ComponentType;
    style?: CSSProperties;
    config?: any;
    value?: T;
}
