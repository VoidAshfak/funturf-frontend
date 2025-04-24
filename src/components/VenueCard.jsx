import { Clock, Star, MapPin } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function VenueCard({ className, venue }) {
    return (
        <Card className={`w-[340px] transition-all duration-300 will-change-transform hover:shadow-lg hover:-translate-y-2 hover:z-10 cursor-pointer ${className}`}>
            <CardHeader>
                <CardTitle className="min-h-6 w-8/12 bg-gradient-to-r from-black via-blue-500 to-green-500 inline-block text-transparent bg-clip-text"> {venue?.name} </CardTitle>
                <CardDescription className="flex justify-start">
                    <MapPin className="mr-1 w-5 h-5" />
                    {venue?.address}
                </CardDescription>
            </CardHeader>
            <CardContent>

                <img
                    src={venue?.venueImages[0]}
                    alt="Venue Image"
                    className="w-full h-[180px] object-cover rounded-2xl"
                />
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="flex items-center">
                    <Clock className="mr-2 w-5 h-5" />
                    <p> {venue?.availability} </p>
                </div>
                <div className="flex items-center">
                    <Star className="mr-2 text-yellow-500" />
                    <p> {venue?.rating} </p>
                </div>
            </CardFooter>

            {/* <p> {JSON.stringify(venue)} </p> */}
        </Card>
    )
}
