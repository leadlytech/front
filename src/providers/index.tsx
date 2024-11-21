import { ContextProviders } from "../context";
import { ThemeProvider } from "./themeProvider";
import { SidebarProvider } from "./sidebarProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ContextProviders>
            <SidebarProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </SidebarProvider>
        </ContextProviders>
    );
}

export { SidebarProvider };
