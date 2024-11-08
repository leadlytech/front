import { ContextProviders } from "../context";
import { ThemeProvider } from "./theme-provider";

import { SidebarProvider } from "@/components/ui";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui";
// import { AppSidebar } from "@/components/custom";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ContextProviders>
            <SidebarProvider>
                {/* <AppSidebar /> */}
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
