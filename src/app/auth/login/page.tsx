"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { apiActions, createCookie, makeApiRequest } from "@/actions";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    PasswordInput,
    Checkbox,
    Button,
} from "@/components/ui";
import { routes } from "@/routes";
import Link from "next/link";

export default function Page() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const action = apiActions.login;
    type TSchema = z.infer<typeof action.schema>;

    const form = useForm<TSchema>({
        resolver: zodResolver(action.schema),
        defaultValues: {
            remember: false,
        },
    });

    function onSubmit(data: TSchema) {
        startTransition(async () => {
            const res = await makeApiRequest("login", { data });

            if (res.success) {
                await createCookie(
                    "auth",
                    JSON.stringify({
                        token: res.payload?.payload?.token,
                    }),
                    {
                        maxAge: data.remember ? 86400 * 7 : undefined,
                    }
                );

                toast.success(`Seja bem vindo(a) de volta!`);
                router.refresh();

                return;
            }

            toast.error(res.message || "Falha ao realizar login");
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-center items-center gap-4 max-w-3xl mx-auto py-2"
            >
                <FormField
                    control={form.control}
                    name="email"
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
                    name="password"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Senha</FormLabel>
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
                <div className="w-full flex justify-end">
                    <Link
                        href="/auth/recovery"
                        className="text-sm text-blue-700 hover:underline"
                    >
                        Esqueci a senha
                    </Link>
                </div>
                <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                        <FormItem className="w-full flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Lembrar senha</FormLabel>
                                <FormDescription>
                                    Você não precisará inserir suas credenciais
                                    por 7 dias
                                </FormDescription>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                    Entrar
                </Button>
                <p className="text-sm">
                    Não possui uma conta?{" "}
                    <Link
                        href={routes.auth.register}
                        className="text-blue-700 hover:underline"
                    >
                        Então cadastre-se!
                    </Link>
                </p>
            </form>
        </Form>
    );
}
