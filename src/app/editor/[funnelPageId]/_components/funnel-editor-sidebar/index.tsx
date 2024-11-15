"use client";

import React from "react";

import { useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";

import { SettingsTab, TabList } from "./tabs";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    Tabs,
    TabsContent,
} from "@/components/ui";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
    subaccountId: string;
};

export function FunnelEditorSidebar({ subaccountId }: Props) {
    const { state, dispatch } = useEditor();

    return (
        <Sheet open={true} modal={false}>
            <Tabs className="w-full" defaultValue="Settings">
                <SheetContent
                    side="right"
                    className={clsx(
                        "mt-[97px] w-16 z-[80] shadow-none p-0 focus:border-none transition-all overflow-hidden [&>button]:hidden",
                        { hidden: state.editor.previewMode }
                    )}
                >
                    <TabList />
                </SheetContent>
                <SheetContent
                    side="right"
                    className={clsx(
                        "mt-[97px] w-80 z-[40] shadow-none p-0 mr-16 bg-background focus:border-none h-full transition-all overflow-hidden [&>button]:hidden",
                        { hidden: state.editor.previewMode }
                    )}
                >
                    <ScrollArea className="h-full">
                        <div className="grid gap-4 h-full pb-36">
                            <TabsContent value="Settings">
                                <SheetHeader className="text-left p-6">
                                    <SheetTitle>Styles</SheetTitle>
                                    <SheetDescription>
                                        Show your creativity! You can customize
                                        every component as you like
                                    </SheetDescription>
                                </SheetHeader>
                                <SettingsTab />
                            </TabsContent>
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Tabs>
        </Sheet>
    );
}
