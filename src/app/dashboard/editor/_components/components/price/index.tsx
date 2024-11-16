import { ComponentItem } from "@/interfaces";

type Props = {
  component: ComponentItem;
};

export function PriceComponent({ component }: Props) {
  return (
    <div className="flex flex-col p-4 bg-gray-100 border border-gray-300 rounded text-center">
      <span className="text-sm font-medium">{component.label}</span>
      <span className="text-sm">{component.prefix}</span>
      <span className="text-xl font-bold">
        R$ {component.value?.toFixed(2)}
      </span>
      <span className="text-sm">{component.suffix}</span>
    </div>
  );
}
