"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { useUserStore } from "@/store";
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
    Input,
    Avatar,
    AvatarFallback,
    AvatarImage,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui";

export default function Page() {
    const [isPending, startTransition] = useTransition();
    const { user, loadUser } = useUserStore();

    const action = apiActions.updateMe;
    type TSchema = z.infer<typeof action.schema>;

    const form = useForm<TSchema>({
        resolver: zodResolver(action.schema),
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
        },
    });

    function onSubmit(data: TSchema) {
        startTransition(async () => {
            const res = await makeApiRequest("updateMe", { data });

            if (res.success) {
                await loadUser();
                toast.success(`Dados atualizados com sucesso!`);
                return;
            }

            toast.error(res.message || "system.notification.unknownError");
        });
    }

    useEffect(() => {
        if (user) {
            form.setValue("firstName", user?.firstName);
            form.setValue("lastName", user?.lastName);
            form.setValue("email", user?.email);
            form.setValue("phoneNumber", user?.phoneNumber);
        }
    }, [form, user]);

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
                                {`${user?.firstName} ${user?.lastName}`.trim()}
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
                                className="w-full p-4 rounded-lg border flex flex-col justify-start items-center gap-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Nome</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="John"
                                                    type="text"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Sobrenome</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Doe"
                                                    type="text"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    disabled
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>E-Mail</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="johndoe@example.com"
                                                    type="email"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    disabled
                                    render={({ field }) => (
                                        <FormItem className="w-full flex flex-col items-start">
                                            <FormLabel>Telefone</FormLabel>
                                            <FormControl className="w-full">
                                                <Input
                                                    placeholder="+55 11 91234-5678"
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
