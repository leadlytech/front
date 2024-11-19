"use client";

import React, { useContext } from "react";
import Link from "next/link";

import { MainContext } from "@/context";
import { IUserMember } from "@/interfaces";
import { routes } from "@/routes";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui";
import { UserBar } from "@/components/custom";
import { cn } from "@/lib/utils";

export default function Page() {
  const { user } = useContext(MainContext);

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
            Seja bem-vindo(a) <strong>{user?.firstName}</strong>! &#x1F44B;
          </h1>
          <p>Selecione uma das opções abaixo para acessar a organização</p>
          <div className="flex">
            {user?.members?.map((member: IUserMember, index: number) => {
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
                  className="w-full px-4 p-2 flex justify-start items-center gap-8 uppercase bg-muted rounded-md"
                  href={routes.dashboard.organization.overview(
                    member.organization.id
                  )}
                >
                  <div className="flex justify-start items-center gap-4">
                    <Avatar className="h-8 w-8 bg-background rounded-lg">
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
                  </div>
                  <div className="w-full max-w-40 flex flex-col gap-1">
                    <p className="text-[10px] text-foreground uppercase">
                      Organização
                    </p>
                    <Badge>{name}</Badge>
                  </div>
                  <div className="w-full max-w-40 flex flex-col gap-1">
                    <p className="text-[10px] text-foreground uppercase">
                      Acesso
                    </p>
                    <Badge className="truncate">
                      {member.owner ? "Proprietário" : "Membro"}
                    </Badge>
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
                        member.status === "DISABLED" ? "bg-red-500" : undefined
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
                      {new Date(member.createdAt).toLocaleDateString()}
                    </Badge>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
