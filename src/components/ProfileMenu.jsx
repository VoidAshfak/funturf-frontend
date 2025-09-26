import { LogOut, Settings, User, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu";
import LogOutButton from "./LogOutButton";
import Link from "next/link";

export default function ProfileMenu({ session }) {
    const { user: { name } } = session;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className={"cursor-pointer h-10 w-10"}>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@profile" />
                    <AvatarFallback>PF</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 mr-6">
                <DropdownMenuLabel>Hello, {name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="#">
                            <User />
                            <span>Profile</span>
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link href="#">
                            <Settings />
                            <span>Settings</span>
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>

                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="#">
                            <Users />
                            <span>Team</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <LogOutButton />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}