import { ComponentItem } from "@/interfaces";
import { ButtonComponent, ImageComponent, PriceComponent, SpaceComponent, TextComponent, VideoComponent } from "./components";

type Props = {
  component: ComponentItem;
};

export function RenderComponent({ component }: Props) {
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
