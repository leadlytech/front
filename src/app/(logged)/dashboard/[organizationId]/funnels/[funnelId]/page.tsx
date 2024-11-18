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
        <Tabs defaultValue="flow" className="w-full h-full">
            <TabsList>
                <TabsTrigger value="flow">Fluxo</TabsTrigger>
                <TabsTrigger value="responses" disabled>
                    Respostas
                </TabsTrigger>
            </TabsList>
            <TabsContent value="flow">
                <FlowTab params={props.params} />
            </TabsContent>
        </Tabs>
    );
}
