import { MemoExoticComponent } from "react";

import {
    DefineNode,
    CustomNodeProps,
    TNodeTypes,
    ENodeType,
    TEdge,
} from "./baseNode";

import { PageNode, defaultNodeData as defaultPageData } from "./pageNode";
import { StartNode, defaultNodeData as defaultStartData } from "./startNode";

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
    PAGE: { ...defaultPageData },
    START: { ...defaultStartData },
};