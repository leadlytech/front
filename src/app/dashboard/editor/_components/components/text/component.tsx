import { TComponent } from "./dto";

type Props = {
    component: TComponent;
};

export function Component({ component }: Props) {
    return (
        <div
            className="w-full p-2 bg-gray-100 text-gray-700 rounded-lg border border-gray-300 mb-2"
            style={{
                color: component.value?.textColor,
            }}
            dangerouslySetInnerHTML={{ __html: component.value?.content || "" }}
        />
    );
}
