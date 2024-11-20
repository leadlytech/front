import { MemoExoticComponent } from "react";

import {
    DefineNode,
    CustomNodeProps,
    TNodeTypes,
    ENodeType,
    TEdge,
} from "@/interfaces";

import {
    PageNode,
    defaultNodeData as defaultPageData,
    nodeTypeKey as pageTypeKey,
} from "./pageNode";
import {
    StartNode,
    defaultNodeData as defaultStartData,
    nodeTypeKey as startTypeKey,
} from "./startNode";

export const nodeTypes: Record<
    TNodeTypes,
    MemoExoticComponent<(props: CustomNodeProps) => JSX.Element>
> = {
    PAGE: PageNode,
    START: StartNode,
};

export { ENodeType };
export type { DefineNode, CustomNodeProps, TNodeTypes, TEdge };

export const defaultNodesData = {
    [startTypeKey]: { ...defaultStartData },
    [pageTypeKey]: { ...defaultPageData },
};
