/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { IListOffset } from "@/models";

import { GetIcon } from "@/components/custom";

import {
    Input,
    Button,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui";

export interface IDataTableProps<T = any> {
    filter?: {
        getter: ColumnFiltersState;
        setter: Dispatch<SetStateAction<ColumnFiltersState>>;
        column: string;
        placeholder?: string;
    };
    columnsControl?: boolean;
    columns: ColumnDef<any>[];
    pagination: IListOffset<T>;
    setPage: Dispatch<SetStateAction<number>> | ((page: number) => void);
    setPageSize?: (pageSize: number) => void;
    data: any[] | undefined;
}

export function DataTable<T = any>(props: IDataTableProps<T>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data: props.data || [],
        columns: props.columns,
        manualPagination: true,
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: props.filter?.setter,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters: props.filter?.getter,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full">
            {/* Controles */}
            {props.filter || props.columnsControl ? (
                <div className="flex items-center gap-2 py-4">
                    {props.filter ? (
                        <Input
                            placeholder={props.filter?.placeholder}
                            value={
                                (table
                                    .getColumn(props.filter?.column)
                                    ?.getFilterValue() as string) ?? ""
                            }
                            onChange={(event) =>
                                table
                                    .getColumn(props.filter?.column || "")
                                    ?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />
                    ) : null}
                    {props.columnsControl ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    Colunas{" "}
                                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(
                                                        !!value
                                                    )
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        );
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : null}
                </div>
            ) : null}

            {/* Conteúdo da tabela */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => {
                                return (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={props.columns.length}
                                    className="h-24 text-center"
                                >
                                    {props.data === undefined ? (
                                        <div className="flex gap-2 justify-center items-center">
                                            <GetIcon
                                                icon="VscLoading"
                                                className="animate-spin"
                                            />
                                            <h3>Carregando...</h3>
                                        </div>
                                    ) : (
                                        "Sem resultados"
                                    )}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Paginação */}
            <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-2 py-4">
                <div>
                    <h3 className="text-sm text-muted-foreground">
                        Resultados{" "}
                        {props.pagination.count === 0
                            ? 0
                            : props.pagination.currentPage *
                                  props.pagination.take +
                              1}{" "}
                        à{" "}
                        {(props.pagination.currentPage + 1) *
                            props.pagination.take >
                        props.pagination.count
                            ? props.pagination.count
                            : (props.pagination.currentPage + 1) *
                              props.pagination.take}{" "}
                        de {props.pagination.count} (Página{" "}
                        {props.pagination.currentPage + 1})
                    </h3>
                </div>
                <div className="flex space-x-2 items-center">
                    {props.setPageSize ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    Exibir: {props.pagination.take}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {[5, 10, 20, 25, 50].map((take) => (
                                    <DropdownMenuCheckboxItem
                                        key={take}
                                        className="cursor-pointer"
                                        checked={props.pagination.take === take}
                                        onCheckedChange={() =>
                                            // @ts-expect-error: Erro estranho
                                            props.setPageSize(take)
                                        }
                                    >
                                        {take} resultados
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : undefined}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => props.setPage(0)}
                        disabled={props.pagination.currentPage === 0}
                    >
                        <GetIcon icon="MdFirstPage" className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            props.setPage(props.pagination.currentPage - 1)
                        }
                        disabled={props.pagination.currentPage <= 0}
                    >
                        <GetIcon
                            icon="MdKeyboardArrowLeft"
                            className="w-4 h-4"
                        />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            props.setPage(props.pagination.currentPage + 1)
                        }
                        disabled={
                            props.pagination.currentPage >=
                            props.pagination.lastPage
                        }
                    >
                        <GetIcon
                            icon="MdKeyboardArrowRight"
                            className="w-4 h-4"
                        />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => props.setPage(props.pagination.lastPage)}
                        disabled={
                            props.pagination.currentPage >=
                            props.pagination.lastPage
                        }
                    >
                        <GetIcon icon="MdLastPage" className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
