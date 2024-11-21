"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

type Props = {
    alt: string;
    src: string;
    darkSrc?: string;
    width: number;
    height: number;
    className?: string;
};

export function ImageThemed({
    alt,
    src,
    darkSrc,
    className,
    width,
    height,
}: Props) {
    const { theme } = useTheme();

    return (
        <Image
            src={darkSrc ? (theme === "light" ? src : darkSrc) : src}
            className={className}
            alt={alt}
            width={width}
            height={height}
        />
    );
}
