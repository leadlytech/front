import { ReactFlowProvider } from "@xyflow/react";

import { DnDFlow } from "./flow";

type Props = {
    params: {
        organizationId: string;
        funnelId: string;
    };
};

export function FlowTab(props: Props) {
    return (
        <ReactFlowProvider>
            <DnDFlow {...props} />
        </ReactFlowProvider>
    );
}
