"use client";

import { useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import * as z from "zod";
import { toast } from "sonner";

import { apiActions, makeApiRequest } from "@/actions";
import { routes } from "@/routes";

import { useRouter } from "@/i18n/routing";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    PasswordInput,
} from "@/components/ui";
import { Input, Button } from "@/components/ui";

export default function Page({ params }: { params: { locale: string } }) {
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const t = useTranslations();
    const router = useRouter();

    const token = searchParams.get("token");

    const action = apiActions.recovery;
    type TSchema = z.infer<typeof action.schema>;

    const form = useForm<TSchema>({
        resolver: zodResolver(action.schema),
    });

    function onSubmit(data: TSchema) {
        startTransition(async () => {
            const res = await makeApiRequest(action, { data });

            if (res.success) {
                toast.success(t(res.message));
                return;
            }

            router.push(routes.auth.login, {
                locale: params.locale,
            });

            toast.error(t(res.message || "system.notification.unknownError"));
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
                                    <FormLabel>{t("Nova senha")}</FormLabel>
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
                                        {t("Confirmar nova senha")}
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
                )}
                <Button type="submit" className="w-full" disabled={isPending}>
                    {token
                        ? t("Trocar Senha")
                        : t("Enviar E-Mail de recuperação")}
                </Button>
            </form>
        </Form>
    );
}
