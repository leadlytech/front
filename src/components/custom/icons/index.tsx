import { CSSProperties, ReactNode } from "react";
import { IconType as RIIconType } from "react-icons/lib";

import { icons, IconTypeKey } from "./icons";

export type { IconTypeKey };
export function GetIcon({
    icon,
    style,
    className,
}: {
    icon: string | undefined;
    style?: CSSProperties;
    className?: string;
}): ReactNode {
    let Icon: RIIconType = icons["ImBlocked"];
    if (icon && Object.keys(icons).includes(icon)) {
        const iconKey: keyof typeof icons = icon as IconTypeKey;
        Icon = icons[iconKey] as RIIconType;
    }
    return <Icon className={className} style={style} />;
}
