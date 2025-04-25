import { Clock, CalendarDays, MapPin } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import AvatarGroup from "./AvatarGroup"
import { formatDate } from "@/utils/date-formatter"

const EventCard = ({ className, event }) => {
    return (
        <Card className={`w-[340px] transition-all duration-300 will-change-transform hover:shadow-lg hover:-translate-y-2 hover:z-10 cursor-pointer ${className}`}>
            <CardHeader>
                <CardTitle className="min-h-6 bg-gradient-to-r from-black via-blue-500 to-green-500 inline-block text-transparent bg-clip-text"> {event?.name} </CardTitle>
                <div className="flex justify-between items-center">
                    <AvatarGroup />
                    <h2 className={`font-bold text-gray-700 text-[17px] ${event?.playersRequired === event?.participants?.length ? 'text-red-500' : ''}`}>{`${event?.participants?.length}/`}<span className="font-normal text-[14px]">{`${event?.playersRequired}`} </span> Joined </h2>
                </div>
                <CardDescription> {event?.location} </CardDescription>
            </CardHeader>
            <CardContent className={`h-24`}>
                <div>
                    <h1 className="font-bold text-[18px] text-gray-700 min-h-16"> {event?.description} </h1>

                    <div className="flex items-center border-2 px-7 py-2 rounded-xl backdrop-blur-sm bg-gray-200/30">
                        <Clock className="mr-2 w-5 h-5" />
                        <h1 className=""> {`${event?.slot.startTime} - ${event?.slot.endTime}`} </h1>   
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <div>
                    <img src={`/assets/icons/${event?.sport.toLowerCase()}.png`} alt="football" className="w-6 h-6" />
                </div>
                <div className="flex items-center">
                    <CalendarDays className="mr-2 w-5 h-5" />
                    {/* <p className="text-gray-700 font-bold"> {`${event?.slot.startTime}-${event?.slot.endTime} | `} </p> */}
                    <p> {` ${formatDate(event?.slot.date)}`} </p>
                </div>
            </CardFooter>

            {/* <p> {JSON.stringify(event)} </p> */}
        </Card>
    )
}

export default EventCard