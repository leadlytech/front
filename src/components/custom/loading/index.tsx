import React from "react";

import { GetIcon } from "../icons";

export function Loading() {
    return (
        <div>
            <div className="flex gap-4">
                <GetIcon icon="BiLoaderAlt" className="animate-spin" />
            </div>
        </div>
    );
}

export function PageLoading() {
    return (
        <div className="flex flex-col w-screen h-screen gap-4">
            <Loading />
        </div>
    );
}
