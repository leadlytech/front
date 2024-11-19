/* eslint-disable @typescript-eslint/no-explicit-any */
type ComponentType = "button" | "text" | "price" | "image" | "video" | "space";

export interface ComponentItem<S = any, V = any> {
    id?: string;
    label: string;
    icon: string;
    type: ComponentType;
    style?: S; // Usando quando precisa alterar alguma característica visual do componente
    value?: V; // Usando para definir valores e comportamentos para o componente
}
