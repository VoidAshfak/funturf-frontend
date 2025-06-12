import "./globals.css";
import { ContextProvider } from "@/context/UserContet";
import QueryProvider from './QueryProvider'

export const metadata = {
    title: "Funturf",
    description: "Your go-to app for managing turf",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ContextProvider>
                    <QueryProvider>
                        {children}
                    </QueryProvider>
                </ContextProvider>
            </body>
        </html>
    );
}
