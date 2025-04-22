import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"
import Navbar2 from "@/components/Navbar2";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Funturf",
    description: "Your go-to app for managing turf",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">

            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <nav className={"navbar"}>
                    <Navbar />
                </nav>

                {/* <nav className="sticky top-0 z-50">
                    <Navbar2 />
                </nav> */}
                {children}
            </body>
        </html>
    );
}
