"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { apiActions, createCookie, makeApiRequest } from "@/actions";
import { routes } from "@/routes";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Button,
    Input,
    PasswordInput,
    Checkbox,
} from "@/components/ui";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const action = apiActions.register;
    type TSchema = z.infer<typeof action.schema>;

    const form = useForm<TSchema>({
        resolver: zodResolver(action.schema),
        defaultValues: {
            terms: false,
        },
    });

    function onSubmit(data: TSchema) {
        startTransition(async () => {
            const res = await makeApiRequest("register", { data });

            if (res.success) {
                toast.success(`Cadastro realizado com sucesso!`);
                setTimeout(async () => {
                    const logged = await makeApiRequest("login", {
                        data: {
                            email: data.email,
                            password: data.password,
                        },
                    });

                    if (logged.success) {
                        await createCookie(
                            "auth",
                            JSON.stringify({
                                token: logged.payload?.payload?.token,
                            }),
                            {
                                maxAge: 86400 * 7,
                            }
                        );

                        toast.success(`Seja bem vindo(a) ${data.firstName}!`);
                        router.refresh();
                        return;
                    }
                    router.push(routes.auth.login);
                }, 1_000);
                return;
            }

            toast.error(res.message || "system.notification.unknownError");
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-center items-center gap-4 max-w-3xl mx-auto py-2"
            >
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
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
                    </div>
                    <div className="col-span-6">
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
                    </div>
                </div>
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
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem className="w-full flex flex-col items-start">
                            <FormLabel>Telefone</FormLabel>
                            <FormControl className="w-full">
                                <Input
                                    placeholder="+55 11 91234-5678"
                                    {...field}
                                    // defaultCountry="TR"
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
                    name="terms"
                    render={({ field }) => (
                        <FormItem className="w-full flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Termos de Uso</FormLabel>
                                <FormDescription>
                                    Eu aceito os{" "}
                                    <Link
                                        href={routes.terms}
                                        className="text-blue-700 hover:underline"
                                    >
                                        termos de uso
                                    </Link>
                                </FormDescription>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                    Cadastrar
                </Button>
                <p className="text-sm">
                    Já está cadastrado?{" "}
                    <Link
                        href={routes.auth.login}
                        className="text-blue-700 hover:underline"
                    >
                        Então faça login!
                    </Link>
                </p>
            </form>
        </Form>
    );
}
