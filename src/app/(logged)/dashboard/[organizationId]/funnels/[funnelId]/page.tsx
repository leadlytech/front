import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { FlowTab } from "./_components";

type Props = {
    params: {
        organizationId: string;
        funnelId: string;
    };
};

export default function Page(props: Props) {
    return (
        <Tabs defaultValue="flow" className="w-full h-[calc(100vh-120px)]">
            <TabsList>
                <TabsTrigger value="flow">Fluxo</TabsTrigger>
                <TabsTrigger value="responses" disabled>
                    Respostas
                </TabsTrigger>
            </TabsList>
            <TabsContent value="flow" className="w-full h-full">
                <FlowTab params={props.params} />
            </TabsContent>
        </Tabs>
    );
}
