"use client";

import { useContext, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { MainContext } from "@/context";
import { apiActions, makeApiRequest } from "@/actions";

import { UserBar } from "@/components/custom";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Button,
    PasswordInput,
    Avatar,
    AvatarFallback,
    AvatarImage,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui";

export default function Page() {
    const [isPending, startTransition] = useTransition();
    const { user } = useContext(MainContext);

    const action = apiActions.updateMePass;
    type TSchema = z.infer<typeof action.schema>;

    const form = useForm<TSchema>({
        resolver: zodResolver(action.schema),
    });

    function onSubmit(data: TSchema) {
        startTransition(async () => {
            const res = await makeApiRequest("updateMePass", { data });

            if (res.success) {
                toast.success(`Cadastro realizado com sucesso!`);
                return;
            }

            toast.error(res.message || "system.notification.unknownError");
        });
    }

    return (
        <>
            <UserBar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                    </div>
                </header>
                <div className="p-4 flex flex-col gap-4">
                    <div className="flex justify-start items-center gap-4">
                        <Avatar className="h-16 w-16 bg-muted rounded-lg">
                            <AvatarImage
                                src={""}
                                alt={`${user?.firstName} ${user?.lastName}`.trim()}
                                className="bg-background"
                            />
                            <AvatarFallback className="p-2 text-2xl rounded-lg">
                                {`${user?.firstName} ${user?.lastName}`
                                    .trim()
                                    .split(" ")
                                    .map((w) => w.charAt(0))
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <h1>
                                {`${user?.firstName} ${user?.lastName}`.trim()}{" "}
                                ({user?.status})
                            </h1>
                            <h2 className="text-gray-500 font-bold">
                                {user?.email}
                            </h2>
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="w-full p-4 rounded-lg border flex flex-col justify-center items-center gap-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Senha atual</FormLabel>
                                            <FormControl>
                                                <PasswordInput
                                                    placeholder="***********************"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Nova senha</FormLabel>
                                            <FormControl>
                                                <PasswordInput
                                                    placeholder="***********************"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmNewPassword"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>
                                                Confirmar nova senha
                                            </FormLabel>
                                            <FormControl>
                                                <PasswordInput
                                                    placeholder="***********************"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isPending}
                                >
                                    Salvar
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </SidebarInset>
        </>
    );
}
