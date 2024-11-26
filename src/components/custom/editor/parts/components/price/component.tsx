import { TComponent } from "./dto";

type Props = {
    component: TComponent;
};

export function Component({ component }: Props) {
    return (
        <div className="flex items-center border border-gray-300 rounded-lg p-4">
            <div className="flex-grow">{component.value?.content}</div>
            <div className="bg-gray-100 p-2 rounded-lg text-right">
                <p className="text-sm text-gray-500">10% off</p>
                <p className="text-2xl font-bold text-black">R$ 89,90</p>
                <p className="text-sm text-gray-500">à vista</p>
            </div>
        </div>
    );
}
