import { TComponent } from "./dto";

type Props = {
  component: TComponent;
};

export function Component({ component }: Props) {
  return (
    <div
      style={{
        width: component.style?.width || "100px",
        height: component.style?.height || "100px",
        display: "block",
      }}
    />
  );
}