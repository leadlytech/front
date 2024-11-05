"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { routes } from "@/routes";

import { GetIcon, IconTypeKey } from "@/components/custom";

import { ScrollArea } from "@/components/ui";

interface IItem {
    title: string;
    href?: string;
    icon?: IconTypeKey;
}

export function SideBarOptions() {
    const pathname = usePathname();

    const items: IItem[] = [
        {
            title: "Trade",
            href: routes.dashboard._,
            icon: "TbChartCandleFilled",
        },
        {
            title: "Histórico",
            href: routes.dashboard.history,
            icon: "FaHistory",
        },
        {
            title: "Suporte",
            href: routes.dashboard.support,
            icon: "LuBadgeHelp",
        },
    ];

    const itemClass =
        "w-full flex justify-start items-center gap-3 rounded-md px-3 py-4 text-sm text-muted-foreground hover:text-primary hover:bg-muted hover:dark:bg-[#826AF933] border border-transparent hover:border-background hover:dark:border-[#826AF9]";
    const selectedClass =
        "text-primary dark:bg-[#826AF9] dark:border-[#826AF9]";

    return (
        <ScrollArea className="w-full h-[calc(100vh-69px)]">
            <nav className="flex flex-col items-center gap-2 px-4 py-5">
                {items.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            href={item.href ?? "#"}
                            className={`${itemClass} ${
                                pathname === item.href && selectedClass
                            }`}
                            prefetch={false}
                        >
                            {item.icon && <GetIcon icon={item.icon} />}
                            <span className="capitalize">{item.title}</span>
                        </Link>
                    );
                })}
            </nav>
        </ScrollArea>
    );
}

export function SideBar() {
    return (
        <aside className="w-40 flex flex-col border-r bg-white dark:bg-[#171923]">
            <div className="h-[69px] flex flex-col items-center justify-center border-b">
                <Link
                    href={routes.dashboard._}
                    className="flex items-center gap-2"
                    prefetch={false}
                >
                    <Image
                        className="rounded-sm dark:invert"
                        src={`/assets/images/logo.png`}
                        width={150}
                        height={150}
                        alt="Platform Logo"
                    />
                </Link>
            </div>
            <SideBarOptions />
        </aside>
    );
}
