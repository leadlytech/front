import { TComponent } from "./dto";

type Props = {
    component: TComponent;
};

export function Component({ component }: Props) {
    return (
        <div
            className="w-full p-2 bg-gray-100 text-gray-700 rounded-lg border border-gray-300"
            style={{
                color: component.style?.textColor,
            }}
            dangerouslySetInnerHTML={{ __html: component.value?.content || "" }}
        />
    );
}
