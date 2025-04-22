import * as React from "react"
import { Clock, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function VenueCard({ className, venue }) {
    return (
        <Card className={`w-[340px] transition-all duration-300 will-change-transform hover:shadow-lg hover:-translate-y-2 hover:z-10 cursor-pointer ${className}`}>
            <CardHeader>
                <CardTitle className="text-green-600"> {venue.name} </CardTitle>
                <CardDescription className="flex justify-start">
                    <MapPin className="mr-1 w-5 h-5" />
                    {venue.address}
                </CardDescription>
            </CardHeader>
            <CardContent>

                <img
                    src={`assets/images/venue-${venue._id}.jpg`}
                    alt="Venue Image"
                    className="w-full h-[180px] object-cover rounded-2xl"
                />
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="flex items-center">
                    <Clock className="mr-2 w-5 h-5" />
                    <p> {venue.availability} </p>
                </div>
                <div className="flex items-center">
                    <Star className="mr-2 text-yellow-500" />
                    <p> {venue.rating} </p>
                </div>
            </CardFooter>

            {/* <p> {JSON.stringify(venue)} </p> */}
        </Card>
    )
}
