import { ComponentItem } from "@/interfaces";
import { ButtonComponent, PriceComponent, TextComponent } from "./components";

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
  }
}
