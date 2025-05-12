import "./globals.css";
import ClientLayout from "./layout-client";

export const metadata = {
    title: "Funturf",
    description: "Your go-to app for managing turf",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}
