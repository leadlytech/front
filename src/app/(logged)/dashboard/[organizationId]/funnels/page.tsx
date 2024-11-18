"use client";

import { useEffect, useState, useTransition } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

import { makeApiRequest } from "@/actions";
import { IFunnel, IListOffset } from "@/models";
import { usePagination } from "@/hooks";

import { CopyButton, DataTable } from "@/components/custom";

type Props = {
    params: { organizationId: string };
};

export default function Page({ params }: Props) {
    const [data, setData] = useState<Partial<IFunnel>[] | undefined>(undefined);
    const [isPending, startTransition] = useTransition();

    const pagination = usePagination();

    function fetchData() {
        startTransition(async () => {
            const res = await makeApiRequest<IListOffset<IFunnel>>(
                "listFunnels",
                {
                    params: {
                        organizationId: params.organizationId,
                    },
                }
            );
            console.log(res);

            if (res.success) {
                const payload = res.payload?.payload;

                if (payload) {
                    setData(payload.data);
                    pagination.updateCount(payload.count);
                }

                return;
            }

            toast.error(res.message || "Falha ao realizar login");
        });
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination.update]);

    const columns: ColumnDef<IFunnel>[] = [
        {
            id: "ID",
            accessorKey: "id",
            header: ({ column }) => {
                return <h1>{column.id}</h1>;
            },
            cell: ({ row, column }) => {
                return (
                    <div className="w-12">
                        <CopyButton
                            className="bg-green-500"
                            content={row.getValue(column.id)}
                        />
                    </div>
                );
            },
        },
        {
            id: "Nome",
            accessorKey: "name",
            header: ({ column }) => {
                return <h1>{column.id}</h1>;
            },
            cell: ({ row, column }) => {
                return (
                    <div className="min-w-max text-left">
                        {row.getValue(column.id)}
                    </div>
                );
            },
        },
        {
            id: "Criado Em",
            accessorKey: "createdAt",
            header: ({ column }) => {
                return <h1 className="min-w-max">{column.id}</h1>;
            },
            cell: ({ row, column }) => {
                return (
                    <div className="min-w-max text-left">
                        {new Date(row.getValue(column.id)).toLocaleString()}
                    </div>
                );
            },
        },
    ];

    return (
        <div className="flex">
            <DataTable
                columnsControl={false}
                columns={columns}
                pagination={{
                    count: pagination.count,
                    currentPage: pagination.page,
                    lastPage: pagination.lastPage,
                    take: pagination.take,
                    current: pagination.current,
                }}
                setPage={pagination.goToPage}
                setPageSize={pagination.setTake}
                data={data}
            />
        </div>
    );
}
