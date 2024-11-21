"use client";

import { ReactNode } from "react";
import Typewriter from "typewriter-effect";

import { ImageThemed } from "@/components/custom";

export function Structure({ children }: { children: ReactNode }) {
    return (
        <div className="w-screen h-screen p-6 flex flex-col lg:flex-row justify-end items-center gap-4 overflow-y-auto bg-gray-200 dark:bg-black">
            <div className="w-full md:h-full flex flex-col gap-2">
                <ImageThemed
                    src="/assets/svg/logo/logo.svg"
                    darkSrc="/assets/svg/logo/logo_dark.svg"
                    className="mx-auto md:m-0"
                    alt="logo"
                    width={250}
                    height={120}
                />
                <div className="hidden md:flex flex-col gap-8">
                    <h1 className="text-2xl">
                        Seja Bem-Vindo à{" "}
                        <strong>{process.env.NEXT_PUBLIC_PLATFORM}</strong>!
                    </h1>
                    <div className="flex gap-1 text-xl">
                        <p>Uma maneira fácil de</p>
                        <Typewriter
                            options={{
                                strings: [
                                    "capturar leads e vender através da internet!",
                                    "aumentar sua conversão!",
                                    "vender seus produtos e serviços, de forma rápida e eficiente!",
                                    "criar funis interativos!",
                                    "validar suas ideias de marketing!",
                                    "rastrear suas vendas de forma precisa!",
                                ],
                                autoStart: true,
                                loop: true,
                                delay: 50, // Velocidade de digitação
                                deleteSpeed: 20,
                                wrapperClassName: "font-bold underline",
                            }}
                        />
                    </div>
                </div>
                <div className="mt-4 hidden md:flex flex-col">
                    <div className="flex justify-start items-center gap-4">
                        <div className="w-40 h-36 p-2 flex flex-col justify-start items-center gap-2">
                            <ImageThemed
                                src="/assets/images/link.png"
                                className="p-4 bg-background rounded-3xl shadow-md"
                                alt="logo"
                                width={80}
                                height={120}
                            />
                            <h1 className="text-center text-muted-foreground">
                                Criador de link
                            </h1>
                        </div>
                        <div className="w-40 h-36 p-2 flex flex-col justify-start items-center gap-2">
                            <ImageThemed
                                src="/assets/images/ciclone.png"
                                className="p-4 bg-background rounded-3xl shadow-md"
                                alt="logo"
                                width={80}
                                height={120}
                            />
                            <h1 className="text-center text-muted-foreground">
                                Funis interativos
                            </h1>
                        </div>
                        <div className="w-40 h-36 p-2 flex flex-col justify-start items-center gap-2">
                            <ImageThemed
                                src="/assets/images/webhook.png"
                                className="p-4 bg-background rounded-3xl shadow-md"
                                alt="logo"
                                width={80}
                                height={120}
                            />
                            <h1 className="text-center text-muted-foreground">
                                Webhooks
                            </h1>
                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-4">
                        <div className="w-40 h-36 p-2 flex flex-col justify-start items-center gap-2">
                            <ImageThemed
                                src="/assets/images/kanban.png"
                                className="p-4 bg-background rounded-3xl shadow-md"
                                alt="logo"
                                width={80}
                                height={120}
                            />
                            <h1 className="text-center text-muted-foreground">
                                CRM
                            </h1>
                        </div>
                        {/* <div className="w-40 h-36 p-2 flex flex-col justify-start items-center gap-2">
                            <Image
                                src="/assets/images/email.png"
                                className="p-4 bg-background rounded-3xl shadow-md"
                                alt="logo"
                                width={80}
                                height={120}
                            />
                            <h1 className="text-center text-muted-foreground">
                                Disparo em massa
                            </h1>
                        </div> */}
                        <div className="w-40 h-36 p-2 flex flex-col justify-start items-center gap-2">
                            <ImageThemed
                                src="/assets/images/group.png"
                                className="p-4 bg-background rounded-3xl shadow-md"
                                alt="logo"
                                width={80}
                                height={120}
                            />
                            <h1 className="text-center text-muted-foreground">
                                Gestão de grupos
                            </h1>
                        </div>
                        <div className="w-40 h-36 p-2 flex flex-col justify-start items-center gap-2">
                            <ImageThemed
                                src="/assets/images/ia.png"
                                className="p-4 bg-background rounded-3xl shadow-md"
                                alt="logo"
                                width={80}
                                height={120}
                            />
                            <h1 className="text-center text-muted-foreground">
                                IA
                            </h1>
                        </div>
                        {/* <div className="w-40 h-36 p-2 flex flex-col justify-start items-center gap-2">
                            <Image
                                src="/assets/images/omnichannel.png"
                                className="p-4 bg-background rounded-3xl shadow-md"
                                alt="logo"
                                width={80}
                                height={120}
                            />
                            <h1 className="text-center text-muted-foreground">
                                Atendimento Omnichannel
                            </h1>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="w-full h-full md:max-w-lg p-4 flex justify-center items-center bg-background border rounded-2xl shadow-md">
                {children}
            </div>
        </div>
    );
}
