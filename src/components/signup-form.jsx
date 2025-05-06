"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Options } from "./Options"

export function SignupForm({
    className,
    ...props
}) {

    const skillOpts = [
        { id: 1, name: "Beginner", value: "BEGINNER" },
        { id: 2, name: "Intermediate", value: "INTERMEDIATE" },
        { id: 3, name: "Advanced", value: "ADVANCED" },
    ]

    const handleRegister = () => {
        // e.preventDefault();
        console.log("Registered!");
    }
    return (
        <form action={handleRegister} className={cn("flex flex-col gap-6", className)} {...props}>
            {/* Heading */}
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Register User</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your information below to create an account
                </p>
            </div>


            <div className="grid grid-cols-2 gap-6">
                <div className="grid row-span-4 gap-6">

                    <div className="grid gap-3">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" type="text" placeholder="me@google.com" required />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="username">Username *
                            <div className="
                            "></div>
                        </Label>
                        <Input id="username" type="text" placeholder="Jhon Doe" required />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="phone">Phone Number *
                            <div className="
                            "></div>
                        </Label>
                        <Input id="phone" type="text" placeholder="01788 888888" required />
                    </div>

                    <div className="grid gap-3">
                        <div className="flex items-center">
                            <Label htmlFor="bio">Bio</Label>
                        </div>
                        <Textarea id="bio" type="text" rows="5" />
                    </div>

                </div>


                <div className="grid row-span-3 gap-6">

                    <div className="grid gap-3">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" placeholder="me@google.com" required />
                    </div>

                    <div className="grid gap-3">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password *</Label>
                        </div>
                        <Input id="password" type="password" required />
                    </div>

                    <div className="grid gap-3">
                        <div className="flex items-center">
                            <Label htmlFor="skill">Skill Level *</Label>
                        </div>
                        <Options label="Skill Level" placeholder={"Select your skill level"} className={"w-full"} options={skillOpts}/>
                    </div>

                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 text-center text-sm">
                <Button type="submit" className="w-1/3">
                    Sign Up
                </Button>
                <div>
                    Already have an account?{" "}
                    <a href="/login" className="underline underline-offset-4">
                        Login
                    </a>
                </div>
            </div>
        </form>
    );
}
