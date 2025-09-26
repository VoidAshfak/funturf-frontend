"use client"

import { LogOut } from "lucide-react";
import { DropdownMenuItem, DropdownMenuShortcut } from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";

export default function LogOutButton() {
    return (
        <DropdownMenuItem
            onClick={() => signOut()}
        >
            <LogOut className="text-red-400" />
            <span className="text-red-400" >Log out</span>
            <DropdownMenuShortcut className="text-red-400">⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
    )
}