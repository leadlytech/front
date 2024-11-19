import { ComponentItem } from "@/interfaces";
import { Component } from "./component";
import { Options } from "./options";
import { componentDefault } from "./dto";

type Props = {
  component: ComponentItem;
};

export { Options as PriceOptions, componentDefault as PriceDefault };

export function PriceComponent({ component }: Props) {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg p-4">
      <div className="flex-grow"></div>
      <div className="bg-gray-100 p-2 rounded-lg text-right">
        <p className="text-sm text-gray-500">10% off</p>
        <p className="text-2xl font-bold text-black">R$ 89,90</p>
        <p className="text-sm text-gray-500">à vista</p>
      </div>
    </div>
  );
}
