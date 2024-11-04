"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { apiActions, createCookie, makeApiRequest } from "@/actions";

import { Link, useRouter } from "@/i18n/routing";

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

export default function Page() {
    const [isPending, startTransition] = useTransition();
    const t = useTranslations();
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
            const res = await makeApiRequest(action, { data });

            if (res.success) {
                await createCookie(
                    "auth",
                    JSON.stringify({
                        token: res.payload.data.token,
                    }),
                    {
                        maxAge: 86400,
                    }
                );

                if (res.message) {
                    toast.success(t(res.message));
                }

                router.refresh();

                return;
            }

            toast.error(t(res.message || "system.notification.unknownError"));
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
                            <FormLabel>{t("E-Mail")}</FormLabel>
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
                            <FormLabel>{t("Senha")}</FormLabel>
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
                        {t("Esqueci a senha")}
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
                                <FormLabel>{t("Lembrar senha")}</FormLabel>
                                <FormDescription>
                                    {t(
                                        "Você não precisará inserir suas credenciais por 7 dias"
                                    )}
                                </FormDescription>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                    {t("Entrar")}
                </Button>
                <p className="text-sm">
                    {t("Não possui uma conta?")}{" "}
                    <Link
                        href={routes.auth.register}
                        className="text-blue-700 hover:underline"
                    >
                        {t("Então cadastre-se!")}
                    </Link>
                </p>
            </form>
        </Form>
    );
}
