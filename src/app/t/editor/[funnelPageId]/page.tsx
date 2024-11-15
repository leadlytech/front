import EditorProvider, { FunnelPage } from "@/providers/editor/editor-provider";
import { redirect } from "next/navigation";
import React from "react";
import FunnelEditorNavigation from "./_components/funnel-editor-navigation";
import FunnelEditorSidebar from "./_components/funnel-editor-sidebar";
import FunnelEditor from "./_components/funnel-editor";

type Props = {
    params: {
        funnelPageId: string;
    };
};

const Page = async ({ params }: Props) => {
    const funnelId = "1";
    const subaccountId = "123";
    const funnelPageDetails: FunnelPage = {
        id: "1",
        funnelId: "1",
        name: "Meu funil",
        pathName: "",
        visits: 0,
        content: "{}",
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    if (!funnelPageDetails) {
        return redirect(`/subaccount/${subaccountId}/funnels/${funnelId}`);
    }

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden">
            <EditorProvider
                subaccountId={subaccountId}
                funnelId={funnelId}
                pageDetails={funnelPageDetails}
            >
                <FunnelEditorNavigation
                    funnelId={funnelId}
                    funnelPageDetails={funnelPageDetails}
                    subaccountId={subaccountId}
                />
                <div className="h-full flex justify-center">
                    <FunnelEditor funnelPageId={params.funnelPageId} />
                </div>

                <FunnelEditorSidebar subaccountId={subaccountId} />
            </EditorProvider>
        </div>
    );
};

export default Page;
