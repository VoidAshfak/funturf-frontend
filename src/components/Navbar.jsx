"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname } from "next/navigation"
import Notification from "@/components/Notification"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

import {
    LogOut,
    Settings,
    User,
    Users,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import NavbarSkeleton from "./skeleton/NavbarSkeleton"
import { useUser } from "@/context/UserContet"

export default function Navbar({ className }) {

    const pathName = usePathname()
    const { user, loading } = useUser()


    if(loading) return <NavbarSkeleton />

    return (
        <>
            <Link href={"/"} className="w-10 ml-14">
                <img src="/assets/icons/logo.svg" alt="Logo" />
            </Link>

            <NavigationMenu className={` ${className}`}>
                <NavigationMenuList>

                    <NavigationMenuItem>
                        <NavigationMenuLink href="/events" className={`${(pathName === "/events" || (pathName.startsWith("/events") && pathName !== "/")) ? "backdrop-blur-sm bg-green-700/10" : ""}`} >
                            <div className="flex gap-2 items-center">
                                <img className="w-8" src="/assets/icons/play.png" alt="play" /><span className="text-xl"> Play </span>
                            </div>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink href="/venues" className={`${(pathName === "/venues" || (pathName.startsWith("/venues") && pathName !== "/")) ? "backdrop-blur-sm bg-green-700/10" : ""}`} >
                            <div className="flex gap-2 items-center">
                                <img className="w-8" src="/assets/icons/book.png" alt="book" /><span className="text-xl"> Book </span>
                            </div>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                </NavigationMenuList>
            </NavigationMenu>


            <div className="mr-10">
                {!user ? (
                    <>
                        <div>
                            <Button
                                className="mx-2"
                                asChild
                            >
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button
                                className="mx-2"
                                variant='outline'
                                asChild
                            >
                                <Link href="/signup">Signup</Link>
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex gap-8 items-center">
                            <Notification />
                            <ProfileMenu />
                        </div>
                    </>
                )}
            </div>

        </>
    )
}


function ProfileMenu() {

    const { setUser } = useUser()

    const logout = async (prevState, formData) => {
        await fetch("http://localhost:8080/api/v1/users/logout", {
            method: "POST",
credentials: "include"
        })

        setUser(null)
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className={"cursor-pointer h-10 w-10"}>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@profile" />
                        <AvatarFallback>PF</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mr-6">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => { }} >
                            <User />
                            <span>Profile</span>
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <Settings />
                            <span>Settings</span>
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>

                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Users />
                            <span>Team</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                        <LogOut className="text-red-400" />
                        <span className="text-red-400" >Log out</span>
                        <DropdownMenuShortcut className="text-red-400">⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}