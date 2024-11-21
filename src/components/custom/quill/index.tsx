"use client";

import { useMemo } from "react";
import { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";

import dynamic from "next/dynamic";

export function Quill(props?: ReactQuillProps) {
    const DynamicQuillEditor = useMemo(() => {
        return dynamic(() => import("react-quill"), {
            loading: () => <p>Abrindo editor...</p>,
            ssr: false,
        });
    }, []);

    return <DynamicQuillEditor {...props} />;
}
