import { ComponentItem } from "@/interfaces";

type Props = {
  component: ComponentItem;
};

export function SpaceComponent({ component }: Props) {
  return (
    <input
      type="space"
      value={component.label}
      readOnly
      style={component.style}
      className="w-full p-2 bg-gray-100 text-gray-700 rounded-lg border border-gray-300 mb-2"
    />
  );
}
