import { ContextProviders } from "../context";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ContextProviders>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </ContextProviders>
    );
}