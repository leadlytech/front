"use client";

import React from "react";

import { useBreadcrumbStore } from "@/store";

import { FlowTab } from "./_components";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";

type Props = {
    params: {
        organizationId: string;
        funnelId: string;
    };
};

export default function Page(props: Props) {
    const setBreadcrumbs = useBreadcrumbStore((state) => state.setBreadcrumbs);
    setBreadcrumbs(["FUNIS"]);

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
