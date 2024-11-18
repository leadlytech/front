"use client";

import React, { ButtonHTMLAttributes } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui";
import { GetIcon } from "../icons";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    content: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
    content,
    ...props
}) => {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            toast.success("Conteúdo copiado");
        } catch (error) {
            console.error(
                "Erro ao copiar para a área de transferência:",
                error
            );
        }
    };

    return (
        <Button
            onClick={handleCopy}
            variant="ghost"
            size="icon"
            {...props} // passa as props adicionais aqui
        >
            <GetIcon icon="FiCopy" />
        </Button>
    );
};
