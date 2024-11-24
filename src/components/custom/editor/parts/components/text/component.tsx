import DOMPurify from "dompurify";

import { TComponent } from "./dto";

type Props = {
    component: TComponent;
};

export function Component({ component }: Props) {
    const sanitizedHtml = DOMPurify.sanitize(component.value?.content || "");

    // Renderiza o conteúdo do texto usando DOMPurify para evitar ataques de Cross-Site Scripting (XSS)
    return (
        <div
            className="w-full p-2 text-foreground"
            style={{
                color: component.style?.textColor,
            }}
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
    );
}
