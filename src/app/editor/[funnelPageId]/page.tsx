import React from "react";
import { redirect } from "next/navigation";

import EditorProvider, { FunnelPage } from "@/providers/editor/editor-provider";
import { FunnelEditorNavigation, FunnelEditorSidebar } from "./_components";

type Props = {
    params: {
        subaccountId: string;
        funnelId: string;
        funnelPageId: string;
    };
};

export default async function Page({ params }: Props) {
    const subaccountId = "123";
    const funnelPageDetails: FunnelPage = {
        id: "1",
        name: "Meu funil",
        pathName: "",
        updatedAt: new Date(),
    };

    if (!funnelPageDetails) {
        return redirect("/404");
    }

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden">
            <EditorProvider
                funnelId={params.funnelPageId}
                subaccountId={subaccountId}
                pageDetails={funnelPageDetails}
            >
                <FunnelEditorNavigation
                    funnelId={params.funnelPageId}
                    subaccountId={subaccountId}
                    funnelPageDetails={funnelPageDetails}
                />
                <FunnelEditorSidebar subaccountId={subaccountId} />
            </EditorProvider>
        </div>
    );
}
