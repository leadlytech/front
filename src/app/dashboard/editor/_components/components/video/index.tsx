import { ComponentItem } from "@/interfaces";

type Props = {
  component: ComponentItem;
};

export function VideoComponent({ component }: Props) {
  return (
    <button
      className="w-full p-2 bg-blue-500 text-white rounded-lg border border-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      style={component.style}
    >
      {component.label}
    </button>
  );
}
