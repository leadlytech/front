"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useMessages } from "next-intl";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui";
import Image from "next/image";

export function Translate({ locale }: { locale: string }) {
    // const router = useRouter()
    // const pathname = usePathname()
    const messages = useMessages();

    const handleChange = (locale: any) => {
        // router.push(pathname, { locale })
    };

    const langs: { value: string; label: string }[] = [
        {
            value: "pt",
            label: "pt",
        },
        {
            value: "en",
            label: "en",
        },
        {
            value: "es",
            label: "es",
        },
    ];

    return (
        <Select onValueChange={handleChange} defaultValue={locale} disabled>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Idioma" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Idioma</SelectLabel>
                    {langs.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                            <div className="flex items-center gap-2">
                                <Image
                                    src={`https://unpkg.com/language-icons/icons/${lang.value}.svg`}
                                    className="rounded-full"
                                    width={32}
                                    height={32}
                                    alt="Lang flag"
                                />
                                <p>{lang.label}</p>
                            </div>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
