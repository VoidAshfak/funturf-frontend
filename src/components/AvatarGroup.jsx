"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarGroup() {
    const users = [
        { name: "Fede", image: "/assets/avatars/player-1.jpg" },
        { name: "Luca", image: "/assets/avatars/player-2.jpg" },
        { name: "Jude", image: "/assets/avatars/player-3.jpg" },
        { name: "Dani", image: "/assets/avatars/player-4.jpg" },
        { name: "Brahim", image: "/assets/avatars/player-5.jpg" },
    ];

    return (
        <div className="flex items-center -space-x-2 *:ring-3 *:ring-background">
            {users.slice(0, 3).map((user, index) => (
                <Avatar
                    key={index}
                >
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>
                        {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>
            ))}
            {users.length > 3 && (
                <Avatar className="z-10 text-sm font-medium text-muted-foreground">
                    <AvatarFallback>
                        +{users.slice(3).reduce((acc) => acc + 1, 0)}
                    </AvatarFallback>
                </Avatar>
            )}
        </div>
    );
}
