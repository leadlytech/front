import { MemoExoticComponent } from "react";

import { CustomNodeProps, TNodeTypes } from "@/interfaces";

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
    START: StartNode,
    PAGE: PageNode,
    WEBHOOK: PageNode,
    REDIRECT: PageNode,
};

export const defaultNodesData = {
    [startTypeKey]: { ...defaultStartData },
    [pageTypeKey]: { ...defaultPageData },
    ["WEBHOOK"]: { ...defaultPageData },
    ["REDIRECT"]: { ...defaultPageData },
};
