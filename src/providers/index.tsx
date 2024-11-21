import { ContextProviders } from "../context";
import { ThemeProvider } from "./themeProvider";

import { SidebarProvider } from "@/components/ui";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ContextProviders>
            <SidebarProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </SidebarProvider>
        </ContextProviders>
    );
}
