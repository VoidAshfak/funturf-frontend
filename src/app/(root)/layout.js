import Navbar from "@/components/Navbar"

export const metadata = {
    title: "Funturf",
    description: "Your go-to app for managing turf",
};

export default function RootLayout({ children }) {
    return (
        <div className={``}>
            <nav className={"navbar"}>
                <Navbar />
            </nav>
            {children}
        </div>
    );
}
