import "./globals.css";
import {ContextProvider} from "@/context/UserContet";

export const metadata = {
    title: "Funturf",
    description: "Your go-to app for managing turf",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ContextProvider>
                    {children}
                </ContextProvider>
            </body>
        </html>
    );
}
