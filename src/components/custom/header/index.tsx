"use client";

import { removeCookie } from "@/actions";
import { SideBarOptions } from "../sidebar";

import { GetIcon } from "@/components/custom";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui";

export function Header() {
    const login = { user: { name: "John Doe", level: "Nível Prata" } };

    return (
        <header className="w-full h-[69px] p-4 px-6 flex justify-center items-center gap-4 border-b bg-white dark:bg-[#171923]">
            <div className="w-full flex justify-between items-center gap-4">
                <div>
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0"
                                >
                                    <GetIcon
                                        icon="IoMenu"
                                        className="h-5 w-5"
                                    />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="h-full w-full flex bg-white dark:bg-[#171923]"
                            >
                                <SideBarOptions />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-2">
                    {/* Usuário */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="hidden md:flex gap-4 justify-center items-center overflow-hidden rounded-none hover:bg-transparent active:border-none"
                            >
                                <div className="flex flex-col justify-center items-end">
                                    <h1>Seja bem vindo,</h1>
                                    <h2 className="font-bold">
                                        {String(login?.user.name).split(" ")[0]}
                                    </h2>
                                </div>
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback className="uppercase">
                                        {String(login?.user.name)
                                            .split(" ")
                                            .slice(0, 2)
                                            .map((word) => word[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-60 dark:bg-[#171923]"
                        >
                            <div className="flex gap-2">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback className="uppercase">
                                        {String(login?.user.name)
                                            .split(" ")
                                            .slice(0, 2)
                                            .map((word) => word[0])
                                            .join("")
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h1 className="text-[#1726D9] capitalize">
                                        {login?.user.name}
                                    </h1>
                                    <p className="font-bold text-[10px]">
                                        {login?.user.level}
                                    </p>
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => removeCookie("auth")}
                                className="cursor-pointer"
                            >
                                Sair
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Saldo */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex gap-4 justify-center items-center overflow-hidden rounded-none hover:bg-transparent active:border-none"
                            >
                                <div className="flex flex-col justify-center items-start">
                                    <h1 className="text-muted-foreground">
                                        Saldo demo
                                    </h1>
                                    <h2 className="font-bold">R$ 10,000.00</h2>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-60 dark:bg-[#171923]"
                        >
                            <DropdownMenuItem className="cursor-pointer">
                                <div className="flex flex-col justify-center items-start">
                                    <h1 className="text-muted-foreground">
                                        Saldo real
                                    </h1>
                                    <h2 className="font-bold">R$ 10,000.00</h2>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                                <div className="flex flex-col justify-center items-start">
                                    <h1 className="text-muted-foreground">
                                        Saldo demo
                                    </h1>
                                    <h2 className="font-bold">R$ 10,000.00</h2>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Depósito */}
                    <Button
                        variant="default"
                        className="flex justify-center items-center gap-2 bg-green-500 text-white uppercase"
                    >
                        <GetIcon icon="BsCoin" />
                        <p className="h-fit">Depositar</p>
                    </Button>
                </div>
            </div>
        </header>
    );
}
