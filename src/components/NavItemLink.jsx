"use client"


import { usePathname } from "next/navigation";
import { NavigationMenuLink } from "./ui/navigation-menu";

export default function NavItemLink({ path, children }) {
    const pathname = usePathname();
    const isActive = pathname.includes(path)
    return (
        <NavigationMenuLink
            href={path}
            className={` ${isActive ? 'border border-green-500 text-green-500' : ''}`}
        >
            {children}
        </NavigationMenuLink>
    )
}