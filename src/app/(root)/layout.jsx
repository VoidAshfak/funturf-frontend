import Navbar from "@/components/Navbar"
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
    title: "Funturf",
    description: "Your go-to app for managing turf",
};

export default function AppLayout({ children }) {
    return (
        <AuthProvider>
            <div className={``}>
                <nav className={"navbar"}>
                    <Navbar />
                </nav>
                {children}
            </div>
        </AuthProvider>
    );
}
