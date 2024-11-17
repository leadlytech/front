"use client";

import * as React from "react";

import { NavUser } from "./navUser";
import { OrganizationSwitcher } from "./orgSwitcher";
import {
    ScrollArea,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui";

import Link from "next/link";
import { GetIcon } from "../../icons";

// This is sample data.
const data = {
    teams: [
        {
            name: "Acme Inc",
            role: "PROPRIETÁRIO",
        },
        {
            name: "Acme Corp.",
            role: "MEMBRO",
        },
        {
            name: "Evil Corp.",
            role: "MEMBRO",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            items: [
                {
                    title: "Visão Geral",
                    icon: "TbView360",
                    url: "#",
                },
                {
                    title: "Relatórios",
                    icon: "HiDocumentReport",
                    url: "#",
                },
            ],
        },
        {
            title: "CRM",
            items: [
                {
                    title: "Leads",
                    icon: "HiUsers",
                    url: "#",
                },
                {
                    title: "Segmentações",
                    icon: "BsFillSignpostSplitFill",
                    url: "#",
                },
            ],
        },
        {
            title: "Serviços",
            items: [
                {
                    title: "Links",
                    icon: "FaLink",
                    url: "#",
                },
                {
                    title: "Funis de vendas",
                    icon: "AiFillFunnelPlot",
                    url: "#",
                },
            ],
        },
        {
            title: "Integrações",
            items: [
                {
                    title: "API",
                    icon: "AiFillApi",
                    url: "#",
                },
            ],
        },
        {
            title: "Organização",
            items: [
                {
                    title: "Equipe",
                    icon: "FaUsers",
                    url: "#",
                },
                {
                    title: "Assinaturas",
                    icon: "MdPaid",
                    url: "#",
                },
                {
                    title: "Configurações",
                    icon: "IoMdSettings",
                    url: "#",
                },
            ],
        },
        {
            title: "Plataforma",
            items: [
                {
                    title: "Suporte",
                    icon: "MdContactSupport",
                    url: "#",
                },
                {
                    title: "Termos de uso",
                    icon: "GoLaw",
                    url: "#",
                },
            ],
        },
    ],
};

export function DashBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <OrganizationSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <ScrollArea>
                    {data.navMain.map((item) => (
                        <SidebarGroup key={item.title}>
                            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {item.items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={false}
                                            >
                                                <Link href={item.url}>
                                                    <GetIcon icon={item.icon} />
                                                    {item.title}
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    ))}
                </ScrollArea>
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
