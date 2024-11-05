import React from "react";

import { GetIcon } from "../icons";
import Image from "next/image";

export function Loading() {
    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <Image
                src="/assets/images/logo.png"
                alt="logo"
                width={120}
                height={120}
            />
            <div className="w-fit flex gap-4">
                <GetIcon icon="BiLoaderAlt" className="w-6 h-6 animate-spin" />
            </div>
        </div>
    );
}

export function PageLoading() {
    return (
        <div className="w-screen h-[100vh] flex flex-col justify-center items-center gap-4">
            <Loading />
        </div>
    );
}
