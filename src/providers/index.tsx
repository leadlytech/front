import { ContextProviders } from "../context";
import { FlowProvider } from "./flowProvider";
import { ThemeProvider } from "./theme-provider";

import { SidebarProvider } from "@/components/ui";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ContextProviders>
            <SidebarProvider>
                {/* <FlowProvider> */}
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                {/* </FlowProvider> */}
            </SidebarProvider>
        </ContextProviders>
    );
}
