"use client";

import Link from "next/link";

import { NavUser } from "./navUser";
import { OrganizationSwitcher } from "./orgSwitcher";
import { useMain } from "@/context";
import { routes } from "@/routes";

import { GetIcon } from "@/components/custom";

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

export function DashBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { currentOrg } = useMain();

    const nav = (organizationId: string) => [
        {
            title: "Dashboard",
            items: [
                {
                    title: "Visão Geral",
                    icon: "TbView360",
                    url: routes.dashboard.organization.overview(organizationId),
                },
                {
                    title: "Relatórios",
                    icon: "HiDocumentReport",
                    url: routes.dashboard.organization.overview(organizationId),
                },
            ],
        },
        {
            title: "CRM",
            items: [
                {
                    title: "Leads",
                    icon: "HiUsers",
                    url: routes.dashboard.organization.overview(organizationId),
                },
                {
                    title: "Segmentações",
                    icon: "BsFillSignpostSplitFill",
                    url: routes.dashboard.organization.overview(organizationId),
                },
            ],
        },
        {
            title: "Serviços",
            items: [
                {
                    title: "Links",
                    icon: "FaLink",
                    url: routes.dashboard.organization.overview(organizationId),
                },
                {
                    title: "Funis de vendas",
                    icon: "AiFillFunnelPlot",
                    url: routes.dashboard.organization.funnels.overview(
                        organizationId
                    ),
                },
            ],
        },
        {
            title: "Integrações",
            items: [
                {
                    title: "API",
                    icon: "AiFillApi",
                    url: routes.dashboard.organization.overview(organizationId),
                },
            ],
        },
        {
            title: "Organização",
            items: [
                {
                    title: "Equipe",
                    icon: "FaUsers",
                    url: routes.dashboard.organization.overview(organizationId),
                },
                {
                    title: "Assinaturas",
                    icon: "MdPaid",
                    url: routes.dashboard.organization.overview(organizationId),
                },
                {
                    title: "Configurações",
                    icon: "IoMdSettings",
                    url: routes.dashboard.organization.overview(organizationId),
                },
            ],
        },
        {
            title: "Plataforma",
            items: [
                {
                    title: "Suporte",
                    icon: "MdContactSupport",
                    url: routes.dashboard.organization.overview(organizationId),
                },
                {
                    title: "Termos de uso",
                    icon: "GoLaw",
                    url: routes.terms,
                },
            ],
        },
    ];

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <OrganizationSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <ScrollArea>
                    {nav(currentOrg?.organization.id || "").map((item) => (
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
