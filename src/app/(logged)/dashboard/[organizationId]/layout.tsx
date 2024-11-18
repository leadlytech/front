"use client";

import { Fragment, ReactNode, useEffect } from "react";

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
import { useMain } from "@/context";
import { redirect, usePathname } from "next/navigation";
import { routes } from "@/routes";

export default function Layout({
    children,
    params,
}: {
    children: ReactNode;
    params: { organizationId: string };
}) {
    const pathname = usePathname();
    const { myOrgs, currentOrg, setCurrentOrg } = useMain();

    useEffect(() => {
        if (myOrgs) {
            const currentOrgIndex = myOrgs.findIndex(
                (org) => org.organization.id === params.organizationId
            );

            if (currentOrgIndex === -1) {
                return redirect(routes.dashboard._);
            }
            setCurrentOrg(myOrgs[currentOrgIndex]);
        }
    }, [myOrgs]);

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
                                            currentOrg?.organization.id || ""
                                        )}
                                    >
                                        {currentOrg?.organization.name}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {pathname
                                    .substring(1)
                                    .split("/")
                                    .slice(2)
                                    .map((path) => {
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
