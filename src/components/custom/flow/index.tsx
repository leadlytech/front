import { ReactFlowProvider } from "@xyflow/react";

// import { INodeOption, TNode, TEdge } from "@/interfaces";

import { DnDFlow, FlowProps } from "./flow";

export function Flow(props: FlowProps) {
    return (
        <ReactFlowProvider>
            <DnDFlow {...props} />
        </ReactFlowProvider>
    );
}
