"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { apiActions, makeApiRequest } from "@/actions";
import { routes } from "@/routes";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    PasswordInput,
    Input,
    Button,
} from "@/components/ui";

export default function Page() {
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const router = useRouter();

    const token = searchParams.get("token");

    const action = apiActions.recovery;
    type TSchema = z.infer<typeof action.schema>;

    const form = useForm<TSchema>({
        resolver: zodResolver(action.schema),
    });

    function onSubmit(data: TSchema) {
        startTransition(async () => {
            const res = await makeApiRequest("recovery", { data });

            if (res.success) {
                toast.success(res.message);
                return;
            }

            router.push(routes.auth.login);

            toast.error(res.message || "system.notification.unknownError");
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-between gap-8"
            >
                {token ? (
                    <>
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>{"Nova senha"}</FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="****************"
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
                                        {"Confirmar nova senha"}
                                    </FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="****************"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                ) : (
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>{"E-Mail"}</FormLabel>
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
                )}
                <Button type="submit" className="w-full" disabled={isPending}>
                    {token ? "Trocar Senha" : "Enviar E-Mail de recuperação"}
                </Button>
            </form>
        </Form>
    );
}
