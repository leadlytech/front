"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";
import { z } from "zod";

import { apiActions, makeApiRequest } from "@/actions";
import { IFunnel, IListOffset } from "@/models";
import { usePagination } from "@/hooks";
import { routes } from "@/routes";
import { removeDuplicates } from "@/utils";
import { cn } from "@/lib/utils";

import { GetIcon } from "@/components/custom";

import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "@/components/ui";


type Props = {
    params: { organizationId: string };
};

export default function Page({ params }: Props) {
    const [data, setData] = useState<Array<IFunnel> | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isLastPage, setIsLastPage] = useState<boolean>(true);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const pagination = usePagination();

    const action = apiActions.createFunnel;
    type TSchema = z.infer<typeof action.schema>;

    const form = useForm<TSchema>({
        resolver: zodResolver(action.schema),
    });

    function createFunnel(data: TSchema) {
        startTransition(async () => {
            const res = await makeApiRequest("createFunnel", {
                data,
                params: {
                    organizationId: params.organizationId,
                },
            });

            if (res.success) {
                router.push(
                    routes.dashboard.organization.funnels.get(
                        params.organizationId,
                        res.payload?.payload.id
                    )
                );

                toast.error("Funil criado com sucesso!");
                return;
            }

            toast.error(res.message);
        });
    }

    function removeFunnel(id: string) {
        startTransition(async () => {
            const res = await makeApiRequest("removeFunnel", {
                data,
                params: {
                    organizationId: params.organizationId,
                    id,
                },
            });

            if (res.success) {
                setCurrentPage(() => {
                    return 0;
                });
                fetchData();

                toast.error("Funil apagado com sucesso!");
                return;
            }

            toast.error(res.message);
        });
    }

    function fetchData() {
        startTransition(async () => {
            const res = await makeApiRequest<IListOffset<IFunnel>>(
                "listFunnels",
                {
                    params: {
                        organizationId: params.organizationId,
                    },
                    query: {
                        page: currentPage,
                        take: 50,
                    },
                }
            );

            if (res.success) {
                const payload = res.payload?.payload;

                if (payload) {
                    setData((prevData) =>
                        removeDuplicates([...(prevData || []), ...payload.data])
                    );
                    setIsLastPage(payload.currentPage === payload.lastPage);
                    pagination.updateCount(payload.count);
                }

                return;
            }

            toast.error(res.message);
        });
    }

    function handleLoadMore() {
        setCurrentPage((prevPage) => prevPage + 1);
    }

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    return (
        <div className="h-[calc(100vh-80px)] flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h1>Funis de vendas</h1>
                    <p className="text-muted-foreground">
                        Crie funis interativos para atrair o seu público
                    </p>
                </div>
                <Dialog>
                    <DialogTrigger>
                        <Button className="font-bold uppercase text-white bg-green-500">
                            Criar Funil
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Criar novo funil de vendas
                            </DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(createFunnel)}
                                className="flex flex-col justify-center items-center gap-4 py-2"
                            >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Nome</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Meu novo funil"
                                                    type="text"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    className="w-full font-bold uppercase text-white bg-green-500"
                                    disabled={isPending}
                                >
                                    <GetIcon
                                        icon="BiLoaderAlt"
                                        className={cn("animate-spin", {
                                            hidden: !isPending,
                                        })}
                                    />
                                    Criar
                                </Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
            {data === undefined ? (
                <div className="w-full h-full flex justify-center items-center gap-2">
                    <GetIcon
                        icon="BiLoaderAlt"
                        className={cn("animate-spin")}
                    />
                    <p>Carregando...</p>
                </div>
            ) : data.length ? (
                <>
                    <div className="flex flex-wrap gap-4">
                        {data.map((element) => {
                            const editHref =
                                routes.dashboard.organization.funnels.get(
                                    params.organizationId,
                                    element.id
                                );

                            const viewHref =
                                routes.dashboard.organization.funnels.view(
                                    element.id
                                );

                            return (
                                <div
                                    key={element.id}
                                    className="w-full md:w-1/3 relative border rounded-md cursor-pointer"
                                >
                                    <Link
                                        href={editHref}
                                        className="w-full p-4 flex flex-col"
                                    >
                                        <h1>{element.name}</h1>
                                        <h3 className="text-muted-foreground">
                                            Última atualização:{" "}
                                            {new Date(
                                                element.updatedAt
                                            ).toLocaleDateString()}
                                        </h3>
                                    </Link>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="p-2 absolute top-1 right-1 rounded-md hover:bg-muted focus:border-none">
                                            <GetIcon icon="VscKebabVertical" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel className="w-28 flex gap-2 justify-start items-center truncate">
                                                <GetIcon icon="IoIosFunnel" />
                                                {element.name}
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <Link href={editHref}>
                                                <DropdownMenuItem className="flex gap-2 items-center cursor-pointer">
                                                    <GetIcon icon="MdEdit" />
                                                    Editar
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link href={viewHref}>
                                                <DropdownMenuItem className="flex gap-2 items-center cursor-pointer">
                                                    <GetIcon icon="PiEyesFill" />
                                                    Visualizar
                                                </DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuItem className="flex gap-2 items-center cursor-pointer">
                                                <GetIcon icon="FaClone" />
                                                Duplicar
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="flex gap-2 items-center cursor-pointer"
                                                onClick={() =>
                                                    removeFunnel(element.id)
                                                }
                                            >
                                                <GetIcon icon="FaTrash" />
                                                Apagar
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            );
                        })}
                    </div>
                    {!isLastPage ? (
                        <Button
                            className="w-max mx-auto font-bold uppercase text-white bg-green-500"
                            onClick={handleLoadMore}
                        >
                            Carregar mais
                        </Button>
                    ) : undefined}
                </>
            ) : (
                <div className="w-full h-full flex flex-col justify-center items-center gap-4">
                    <Image
                        src="/assets/svgs/void.svg"
                        alt="empty"
                        width={200}
                        height={200}
                    />
                    <h1 className="uppercase font-bold">Nenhum funil</h1>
                </div>
            )}
        </div>
    );
}
