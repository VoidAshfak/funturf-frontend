"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {logout} from "@/lib/features/auth/authSlice"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
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

const components = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

export default function Navbar({ className }) {

    const userLoggedIn = useAppSelector((state) => state.auth.isUserLogin)
    

    return (
        <>
            <Link href={"/"} className="w-10 ml-14">
                <img src="/assets/icons/logo.svg" alt="Logo" />
            </Link>

            <NavigationMenu className={` ${className}`}>
                <div>
                    <NavigationMenuList>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger className={"bg-green-500"}>Getting started</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <a
                                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                href="/"
                                            >
                                                <div className="mb-2 mt-4 text-lg font-medium">
                                                    shadcn/ui
                                                </div>
                                                <p className="text-sm leading-tight text-muted-foreground">
                                                    Beautifully designed components that you can copy and
                                                    paste into your apps. Accessible. Customizable. Open
                                                    Source.
                                                </p>
                                            </a>
                                        </NavigationMenuLink>
                                    </li>
                                    <ListItem href="/docs" title="Introduction">
                                        Re-usable components built using Radix UI and Tailwind CSS.
                                    </ListItem>
                                    <ListItem href="/docs/installation" title="Installation">
                                        How to install dependencies and structure your app.
                                    </ListItem>
                                    <ListItem href="/docs/primitives/typography" title="Typography">
                                        Styles for headings, paragraphs, lists...etc
                                    </ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    {components.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>


                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/docs">
                                Documentation
                            </NavigationMenuLink>
                        </NavigationMenuItem>


                    </NavigationMenuList>
                </div>
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
                        <LogOut className="text-red-400"/>
                        <span className="text-red-400" >Log out</span>
                        <DropdownMenuShortcut className="text-red-400">⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}