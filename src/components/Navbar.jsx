import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileMenu from "./ProfileMenu";
import Notification from "./Notification";
import NavItemLink from "./NavItemLink";

export default async function Navbar({ className }) {
    const session = await getServerSession(authOptions);
    return (
        <>
            <Link href={"/"} className="w-10 ml-14">
                <img src="/assets/icons/logo.svg" alt="Logo" />
            </Link>

            <NavigationMenu className={` ${className}`}>
                <NavigationMenuList>

                    <NavigationMenuItem>
                        <NavItemLink path="/events">
                            <div className="flex gap-2 items-center">
                                <img className="w-8" src="/assets/icons/play.png" alt="play" /><span className="text-xl"> Play </span>
                            </div>
                        </NavItemLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavItemLink path="/venues">
                            <div className="flex gap-2 items-center">
                                <img className="w-8" src="/assets/icons/book.png" alt="book" /><span className="text-xl"> Book </span>
                            </div>
                        </NavItemLink>
                    </NavigationMenuItem>

                </NavigationMenuList>
            </NavigationMenu>

            <div className="mr-10">
                {!session ? (
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
                ) : (
                    <div className="flex gap-8 items-center">
                        <Notification />
                        <ProfileMenu session={session} />
                    </div>
                )}
            </div>
        </>
    )
}