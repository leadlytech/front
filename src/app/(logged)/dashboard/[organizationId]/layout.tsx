"use client";

import { Fragment, ReactNode, useEffect } from "react";
import { redirect, usePathname } from "next/navigation";

import { useBreadcrumbStore, useUserStore } from "@/store";
import { routes } from "@/routes";

import { DashBar } from "@/components/custom";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Separator,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui";

export default function Layout({
    children,
    params,
}: {
    children: ReactNode;
    params: { organizationId: string };
}) {
    const pathname = usePathname();
    const { userOrgs, activeOrg, setActiveOrg } = useUserStore();
    const breadcrumbs = useBreadcrumbStore((state) => state.breadcrumbs);

    useEffect(() => {
        if (userOrgs) {
            const success = setActiveOrg(params.organizationId);

            if (!success) {
                return redirect(routes.dashboard._);
            }
        }
    }, [userOrgs]);

    return (
        <>
            <DashBar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink
                                        href={routes.dashboard.organization.overview(
                                            activeOrg?.organization.id || ""
                                        )}
                                    >
                                        {activeOrg?.organization.name}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {(breadcrumbs.length
                                    ? breadcrumbs
                                    : pathname.substring(1).split("/").slice(2)
                                ).map((path) => {
                                    return (
                                        <Fragment key={path}>
                                            <BreadcrumbSeparator className="hidden md:block" />
                                            <BreadcrumbItem className="hidden md:block">
                                                <BreadcrumbPage>
                                                    {path}
                                                </BreadcrumbPage>
                                            </BreadcrumbItem>
                                        </Fragment>
                                    );
                                })}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </main>
            </SidebarInset>
        </>
    );
}
