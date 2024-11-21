"use client";

import { SidebarProvider as ShadCnSidebarProvider } from "@/components/ui";

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    return <ShadCnSidebarProvider>{children}</ShadCnSidebarProvider>;
}
