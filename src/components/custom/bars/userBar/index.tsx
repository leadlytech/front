"use client";

import { useContext, ComponentProps } from "react";
import Link from "next/link";
import Image from "next/image";

import { MainContext } from "@/context";

import {
    ScrollArea,
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui";

import { GetIcon } from "@/components/custom";
import { routes } from "@/routes";

// This is sample data.
const options = [
    {
        title: "Conta",
        items: [
            {
                title: "Meus dados",
                icon: "MdAccountCircle",
                url: routes.account._,
            },
            {
                title: "Trocar senha",
                icon: "FaUnlock",
                url: routes.account.security,
            },
        ],
    },
];

export function UserBar({ ...props }: ComponentProps<typeof Sidebar>) {
    const { user } = useContext(MainContext);

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <Image
                    alt="logo"
                    src="/assets/images/logo.png"
                    width={100}
                    height={50}
                />
            </SidebarHeader>
            <SidebarContent>
                <ScrollArea>
                    {options.map((option) => (
                        <SidebarGroup key={option.title}>
                            <SidebarGroupLabel>
                                {option.title}
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {option.items.map((item) => (
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
                    {user?.members ? (
                        <SidebarGroup>
                            <SidebarGroupLabel>Organizações</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href={routes.dashboard._}>
                                                <GetIcon icon="GrOrganization" />
                                                Organizações
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    {user?.members?.map(
                                        (member, index: number) => {
                                            return (
                                                <SidebarMenuItem key={index}>
                                                    <SidebarMenuButton asChild>
                                                        <Link
                                                            href={routes.dashboard.organization.overview(
                                                                member
                                                                    .organization
                                                                    .id
                                                            )}
                                                        >
                                                            <GetIcon icon="IoIosArrowForward" />
                                                            {
                                                                member
                                                                    .organization
                                                                    .name
                                                            }
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            );
                                        }
                                    )}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    ) : undefined}
                </ScrollArea>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
