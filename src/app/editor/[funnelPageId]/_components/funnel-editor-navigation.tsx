/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { FocusEventHandler, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeftCircle,
    EyeIcon,
    Laptop,
    Redo2,
    Smartphone,
    Tablet,
    Undo2,
} from "lucide-react";
import { toast } from "sonner";

import {
    DeviceTypes,
    FunnelPage,
    useEditor,
} from "@/providers/editor/editor-provider";
import { cn } from "@/lib/utils";

import {
    Button,
    Input,
    Switch,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui";

type Props = {
    funnelId: string;
    subaccountId: string;
    funnelPageDetails: FunnelPage;
};

export function FunnelEditorNavigation({
    funnelId,
    subsubaccountId,
    funnelPageDetails,
}: Props) {
    const router = useRouter();
    const { state, dispatch } = useEditor();

    useEffect(() => {
        dispatch({
            type: "SET_FUNNELPAGE_ID",
            payload: {
                funnelPageId: funnelPageDetails.id,
            },
        });
    }, [funnelPageDetails]);

    const handleOnBlurTitleChange: FocusEventHandler<HTMLInputElement> = (
        event
    ) => {
        if (event.target.value === funnelPageDetails.name) return;
        if (event.target.value) {
            // TODO: Implementar efetivação de troca do título
            toast.success("Sucesso!", {
                description: "Título do funil atualizado",
            });
            router.refresh();
        } else {
            toast.warning("Opa!", {
                description: "Você deve definir um título!",
            });
            event.target.value = funnelPageDetails.name;
        }
    };

    function handlePreviewClick() {
        dispatch({
            type: "TOGGLE_PREVIEW_MODE",
        });
        dispatch({
            type: "TOGGLE_LIVE_MODE",
        });
    }

    function handleUndo() {
        dispatch({
            type: "UNDO",
        });
    }

    function handleRedo() {
        dispatch({
            type: "REDO",
        });
    }

    async function handleOnSave() {
        const content = JSON.stringify(state.editor.elements);
        console.log(content);
        try {
            // TODO: Implementar salvamento
            toast.success("Sucesso!", {
                description: "Página salva com sucesso!",
            });
        } catch (err: any) {
            toast.error("Erro ao salvar", {
                description: err?.message,
            });
        }
    }

    return (
        <TooltipProvider>
            <nav
                className={cn(
                    "border-b-[1px] flex items-center justify-between p-6 gap-2 transition-all",
                    state.editor.previewMode
                        ? "!h-0 !p-0 !overflow-hidden"
                        : undefined
                )}
            >
                <aside className="flex items-center gap-4 max-w-[260px] w-[300px]">
                    <Link href={`#`}>
                        <ArrowLeftCircle />
                    </Link>
                    <div className="flex flex-col w-full">
                        <Input
                            defaultValue={funnelPageDetails.name}
                            className="border-none h-5 m-0 p-0 text-lg"
                            onBlur={handleOnBlurTitleChange}
                        />
                        <span className="text-sm text-muted-foreground">
                            Path: /{funnelPageDetails.pathName}
                        </span>
                    </div>
                </aside>
                <aside>
                    <Tabs
                        defaultValue="Desktop"
                        className="w-fit"
                        value={state.editor.device}
                        onValueChange={(value) => {
                            dispatch({
                                type: "CHANGE_DEVICE",
                                payload: {
                                    device: value as DeviceTypes,
                                },
                            });
                        }}
                    >
                        <TabsList className="h-fit flex justify-center items-center bg-transparent ">
                            <Tooltip>
                                <TooltipTrigger>
                                    <TabsTrigger
                                        value="Desktop"
                                        className="data-[state=active]:bg-muted w-10 h-10 p-0"
                                    >
                                        <Laptop />
                                    </TabsTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Desktop</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <TabsTrigger
                                        value="Tablet"
                                        className="data-[state=active]:bg-muted w-10 h-10 p-0"
                                    >
                                        <Tablet />
                                    </TabsTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Tablet</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <TabsTrigger
                                        value="Mobile"
                                        className="data-[state=active]:bg-muted w-10 h-10 p-0"
                                    >
                                        <Smartphone />
                                    </TabsTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Mobile</p>
                                </TooltipContent>
                            </Tooltip>
                        </TabsList>
                        {/* <TabsContent value="Desktop">
                        <p>Desktop</p>
                    </TabsContent>
                    <TabsContent value="Tablet">
                        <p>Tablet</p>
                    </TabsContent> */}
                    </Tabs>
                </aside>
                <aside className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-slate-800"
                        onClick={handlePreviewClick}
                    >
                        <EyeIcon />
                    </Button>
                    <Button
                        disabled={!(state.history.currentIndex > 0)}
                        variant="ghost"
                        size="icon"
                        className="hover:bg-slate-800"
                        onClick={handleUndo}
                    >
                        <Undo2 />
                    </Button>
                    <Button
                        disabled={
                            !(
                                state.history.currentIndex <
                                state.history.history.length - 1
                            )
                        }
                        variant="ghost"
                        size="icon"
                        className="hover:bg-slate-800"
                        onClick={handleRedo}
                    >
                        <Redo2 />
                    </Button>
                    <div className="flex flex-col items-center mr-4">
                        <div className="flex flex-row items-center gap-4">
                            Draft
                            <Switch disabled defaultChecked={true} />
                            Publish
                        </div>
                        <span className="text-muted-foreground text-sm">
                            Last updated{" "}
                            {funnelPageDetails.updatedAt.toLocaleDateString()}
                        </span>
                    </div>
                    <Button onClick={handleOnSave}>Save</Button>
                </aside>
            </nav>
        </TooltipProvider>
    );
}
