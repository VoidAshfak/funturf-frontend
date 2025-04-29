"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { logout } from "@/lib/features/auth/authSlice"

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
    UserPlus,
    Users,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Navbar({ className }) {

    const userLoggedIn = useAppSelector((state) => state.auth.isUserLogin)


    return (
        <>
            <Link href={"/"} className="w-10 ml-14">
                <img src="/assets/icons/logo.svg" alt="Logo" />
            </Link>

            <NavigationMenu className={` ${className}`}>
                <NavigationMenuList>

                    <NavigationMenuItem>
                        <NavigationMenuLink href="/events" className={"hover:backdrop-blur-sm hover:bg-green-700/10"} >
                            <div className="flex gap-2 items-center">
                                <img className="w-8" src="/assets/icons/play.png" alt="play" /><span className="text-xl"> Play </span>
                            </div>
                        </NavigationMenuLink>
                    </NavigationMenuItem>


                    <NavigationMenuItem>
                        <NavigationMenuLink href="/venues" className={"hover:backdrop-blur-sm hover:bg-green-700/10"} >
                            <div className="flex gap-2 items-center">
                                <img className="w-8" src="/assets/icons/book.png" alt="book" /><span className="text-xl"> Book </span>
                            </div>
                        </NavigationMenuLink>
                    </NavigationMenuItem>


                </NavigationMenuList>
            </NavigationMenu>


            <div className="mr-10">
                {!userLoggedIn ? (
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
                        <div className="">
                            <ProfileMenu />
                        </div>
                    </>
                )}
            </div>

        </>
    )
}

const ListItem = ({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink
                ref={ref}
                className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    className
                )}
                {...props}
            >

                <div className="text-sm font-medium leading-none">{title}</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {children}
                </p>
            </NavigationMenuLink>
        </li>
    )
}

// ListItem.displayName = "ListItem"


function ProfileMenu() {
    const dispatch = useAppDispatch()
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
                        <DropdownMenuItem>
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
                    <DropdownMenuItem onClick={() => dispatch(logout())}>
                        <LogOut className="text-red-400" />
                        <span className="text-red-400" >Log out</span>
                        <DropdownMenuShortcut className="text-red-400">⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}