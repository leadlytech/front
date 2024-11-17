"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";

import { useMain } from "@/context";
import { IUserMember } from "@/interfaces";
import { routes } from "@/routes";
import { cn } from "@/lib/utils";

import { UserBar } from "@/components/custom";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Badge,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui";

export default function Page() {
    const { user } = useMain();

    useEffect(() => {
        if (user?.members.length === 1) {
            const member = user.members[0];
            redirect(
                routes.dashboard.organization.overview(member.organization.id),
                RedirectType.push
            );
        }
    }, [user]);

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
                    <h1 className="text-2xl">
                        Seja bem-vindo(a) <strong>{user?.firstName}</strong>!
                        &#x1F44B;
                    </h1>
                    <p>
                        Selecione uma das opções abaixo para acessar a
                        organização
                    </p>
                    <div className="flex">
                        {user?.members?.map(
                            (member: IUserMember, index: number) => {
                                const name = member.organization.name;
                                let memberStatus = member.status;
                                switch (memberStatus) {
                                    case "ACTIVE":
                                        memberStatus = "Usuário ativo";
                                        break;
                                    case "INVITED":
                                        memberStatus = "Convite pendente";
                                        break;
                                    case "DISABLED":
                                        memberStatus = "Usuário suspenso";
                                        break;
                                }
                                return (
                                    <Link
                                        key={index}
                                        className="w-full max-w-44 p-4 flex flex-col justify-start items-center gap-4 uppercase bg-muted rounded-md"
                                        href={routes.dashboard.organization.overview(
                                            member.organization.id
                                        )}
                                    >
                                        <div className="flex justify-start items-center gap-4">
                                            <Avatar className="w-12 h-12 bg-background rounded-lg">
                                                <AvatarImage
                                                    src={""}
                                                    alt={`${user?.firstName} ${user?.lastName}`.trim()}
                                                    className="bg-background"
                                                />
                                                <AvatarFallback className="p-2 bg-background rounded-lg">
                                                    {name
                                                        .split(" ")
                                                        .map((w) => w.charAt(0))
                                                        .join("")
                                                        .slice(0, 2)
                                                        .toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="w-full max-w-40 flex flex-col gap-1 text-[10px] text-foreground uppercase">
                                                <p className="max-w-20 truncate font-bold">
                                                    {name}
                                                </p>
                                                <p
                                                    className={cn(
                                                        "text-blue-500",
                                                        {
                                                            "text-yellow-500":
                                                                member.owner,
                                                        }
                                                    )}
                                                >
                                                    {member.owner
                                                        ? "Proprietário"
                                                        : "Membro"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-full max-w-40 flex flex-col gap-1">
                                            <p className="text-[10px] text-foreground uppercase">
                                                Situação
                                            </p>
                                            <Badge
                                                className={cn(
                                                    "text-white bg-green-500 hover:bg-green-500",
                                                    member.status === "INVITED"
                                                        ? "bg-yellow-500"
                                                        : undefined,
                                                    member.status === "DISABLED"
                                                        ? "bg-red-500"
                                                        : undefined
                                                )}
                                            >
                                                <p>{memberStatus}</p>
                                            </Badge>
                                        </div>
                                        <div className="w-full max-w-40 flex flex-col gap-1">
                                            <p className="text-[10px] text-foreground uppercase">
                                                Membro desde
                                            </p>
                                            <Badge className="truncate">
                                                {new Date(
                                                    member.createdAt
                                                ).toLocaleDateString()}
                                            </Badge>
                                        </div>
                                    </Link>
                                );
                            }
                        )}
                    </div>
                </div>
            </SidebarInset>
        </>
    );
}
