"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Options } from "./Options"
import Link from "next/link"
import { useActionState } from "react"
import { Loader2 } from "lucide-react"


const signIn = async (prevState, formData) => {

    const res = await fetch("http://localhost:8080/api/v1/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            phone: formData.get("phone"),
            address: formData.get("address"),
            bio: formData.get("bio"),
            role: formData.get("role")
        })
    })
    const data = await res.json()

    console.log(data);
    
}

export function SignupForm({
    className,
    ...props
}) {

    const [prevState, formAction, loading] = useActionState(signIn, {})

    const skillOpts = [
        { id: 1, name: "User", value: "USER" },
        { id: 2, name: "Admin", value: "ADMIN" },
    ]

    return (
        <form action={formAction} className={cn("flex flex-col gap-6", className)} {...props}>
            {/* Heading */}
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Register User</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your information below to create an account
                </p>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white rounded-xl shadow-md">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            required
                            className="w-full border rounded-md px-4 py-2"
                        />
                    </div>

                    

                    {/* Phone Number */}
                    <div className="space-y-2">
                        <Label htmlFor="phone">
                            Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder="01788 888888"
                            required
                            className="w-full border rounded-md px-4 py-2"
                        />
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            name="bio"
                            rows="4"
                            placeholder="Tell us about yourself..."
                            className="w-full border rounded-md px-4 py-2"
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">
                            Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="me@google.com"
                            required
                            className="w-full border rounded-md px-4 py-2"
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password">
                            Password <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full border rounded-md px-4 py-2"
                        />
                    </div>

                    {/* Skill Level */}
                    <div className="space-y-2">
                        <Label htmlFor="skillLevel">
                            Role <span className="text-red-500">*</span>
                        </Label>
                        <Options
                            label="Role"
                            name="role"
                            placeholder="Select your role"
                            className="w-full"
                            options={skillOpts}
                        />
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                            id="address"
                            name="address"
                            rows="4"
                            placeholder="123 Main Street, City, Country"
                            className="w-full border rounded-md px-4 py-2"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 text-center text-sm">
                <Button type="submit" className="w-1/3" disabled={loading}>
                    {loading && <Loader2 className="animate-spin" />}
                    Sign Up
                </Button>
                <div>
                    Already have an account?{" "}
                    <Link href="/login" className="underline underline-offset-4">
                        Login
                    </Link>
                </div>
            </div>
        </form>
    );
}
