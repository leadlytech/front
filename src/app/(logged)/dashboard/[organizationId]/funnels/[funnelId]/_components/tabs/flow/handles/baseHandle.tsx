import { memo, CSSProperties } from "react";
import {
    Handle,
    useHandleConnections,
    HandleType,
    Position,
} from "@xyflow/react";

type Props = Partial<Handle> & {
    position: Position;
    type: HandleType;
    connectionCountLimit?: number;
    style?: CSSProperties | undefined;
};

const handleTypeKey = "DEFAULT";

export const DefaultHandle = memo((props: Props) => {
    const connections = useHandleConnections({
        type: props.type,
    });

    const connectionCountLimit = props.connectionCountLimit || 1;

    return (
        <Handle
            {...props}
            id={props.id || undefined}
            isConnectable={connections.length < connectionCountLimit}
        />
    );
});

DefaultHandle.displayName = handleTypeKey;
