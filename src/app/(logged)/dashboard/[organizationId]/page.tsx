"use client";

import { useBreadcrumbStore } from "@/store";

export default function Page() {
    const setBreadcrumbs = useBreadcrumbStore((state) => state.setBreadcrumbs);
    setBreadcrumbs(["Visão geral"]);

    return <div className="flex">Visão geral</div>;
}
