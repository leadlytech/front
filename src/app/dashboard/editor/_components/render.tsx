/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentItem } from "@/interfaces";
import {
    ButtonComponent,
    ImageComponent,
    PriceComponent,
    SpaceComponent,
    TextComponent,
    TextOptions,
    VideoComponent,
} from "./components";

type ComponentProps = {
    component: ComponentItem;
};

export function RenderComponent({ component }: ComponentProps) {
    switch (component.type) {
        case "button":
            return <ButtonComponent component={component} />;
        case "text":
            return <TextComponent component={component} />;
        case "price":
            return <PriceComponent component={component} />;
        case "image":
            return <ImageComponent component={component} />;
        case "video":
            return <VideoComponent component={component} />;
        case "space":
            return <SpaceComponent component={component} />;
        default:
            return undefined;
    }
}

type OptionProps = {
    component: ComponentItem;
    setter: (data: any) => void;
};

export function RenderOptions({ component, setter }: OptionProps) {
    switch (component.type) {
        case "text":
            return <TextOptions component={component} setter={setter} />;
        default:
            return undefined;
    }
}