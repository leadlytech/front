/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentItem } from "@/interfaces";
import { 
  ButtonComponent,
  ImageComponent,
  ImageOptions,
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
  onEdit: (data: any) => void;
};

export function RenderOptions({ component, onEdit }: OptionProps) {
  switch (component.type) {
    case "text":
      return <TextOptions component={component} onEdit={onEdit} />;
    case "image":
      return <ImageOptions component={component} onEdit={onEdit} />;
    default:
      return undefined;
  }
}
