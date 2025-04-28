import { Clock, MapPin, ArrowUpRight, User2, Plus } from "lucide-react"
import { formatDate } from "@/utils/date-formatter"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import EventCard from "@/components/EventCard"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

const EventDetails = async ({ params }) => {

    const { eventId } = await params

    const res = await fetch(`http://localhost:3000/data/events.json`)
    const events = await res.json()
    const event = events.find(e => e._id === eventId)

    return (
        <>
            <div className="relative">
                <div className="flex w-full  gap-10 px-26 pt-10">

                    <div className="flex flex-col gap-4 w-2/3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white scrollbar-thumb-rounded-full  scrollbar-corner-rounded-full">
                        <div className="border border-gray-300 p-10 rounded-xl">

                            <div className="pb-8 flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-700 pb-2"> {event?.name} </h1>
                                    <div className="flex items-center justify-start gap-2">
                                        <User2 className="text-gray-600" />
                                        <p className=" text-gray-600"> Organized By {event?.organizer}</p>
                                    </div>
                                </div>
                                <div>
                                    <Avatar className={"cursor-pointer h-14 w-14"}>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@profile" />
                                        <AvatarFallback>PF</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>

                            <div className="flex items-center justify-start gap-6 pb-4">
                                <Clock className="mr-2 font-bold w-10 h-10" />
                                <div>
                                    <p className="font-bold text-2xl text-gray-700 pb-2"> {formatDate(event?.slot.date)} </p>
                                    <p> {event?.slot.startTime} - {event?.slot.endTime} </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-start gap-6 pb-4">
                                <MapPin className="mr-2 font-bold w-10 h-10" />

                                <p> {event?.location} </p>
                                <Button className={"cursor-pointer"} variant={"outline"}>
                                    View Map
                                    <ArrowUpRight />
                                </Button>
                            </div>
                        </div>

                        <div className="border border-gray-300 p-10 rounded-xl">
                            <Tab />
                        </div>
                    </div>


                    <div className="w-1/3 h-[600px] border border-gray-300 p-8 rounded-xl overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white scrollbar-thumb-rounded-full  scrollbar-corner-rounded-full">
                        <h1 className="font-bold text-2xl text-gray-700 pb-4"> {`Players (${event?.participants?.length} / ${event?.playersRequired})`} </h1>
                        <PlayerItem />
                        <PlayerItem />
                        <PlayerItem />
                        <PlayerItem />
                        <PlayerItem />
                        <PlayerItem />
                        <PlayerItem />
                    </div>
                </div>

                <div className="px-26 pt-10">
                    <div className="flex items-center justify-between">
                        <h1 className="font-bold text-3xl text-gray-700 pb-4"> Similar Events </h1>
                        <p className="text-gray-500 underline hover:text-green-500 cursor-pointer">See All Events</p>
                    </div>
                    <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-5 p-10'>
                        {events.map((event) => (

                            <Link href={`/events/${event._id}`} key={event._id}>
                                <EventCard event={event} />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="sticky flex items-center justify-end pr-20 gap-6 bottom-0 h-20 w-full backdrop-blur-sm bg-green-200/30">
                    <Button 
                        className={"bg-green-500 hover:bg-green-600 p-5 font-bold text-xl cursor-pointer"}
                        variant={"outline"}
                    >
                        <Plus /> Request
                    </Button>

                    {/* <Button 
                        className={"p-5 font-bold text-xl cursor-pointer"}
                        variant={"outline"}
                    >
                        Comment
                    </Button> */}
                </div>
            </div>
        </>
    )
}

export default EventDetails



const Tab = () => {
    return (
        <Tabs defaultValue="rules" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="rules">Rules</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            <TabsContent value="rules">
                <div className="h-[700px]">
                    Tab - 1
                </div>
            </TabsContent>
            <TabsContent value="comments">
                <div className="">
                    Tab - 2
                </div>
            </TabsContent>
        </Tabs>
    )
}


const PlayerItem = () => {
    return (
        <div className="flex items-center justify-start gap-6 pl-3 border border-gray-300 p-4 rounded-xl mb-2 hover:bg-gray-100 cursor-pointer">
            <div >
                <Avatar className={"cursor-pointer h-10 w-10"}>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@profile" />
                    <AvatarFallback>PF</AvatarFallback>
                </Avatar>
            </div>
            <div>
                <h1 className="font-bold text-gray-700">Player Name</h1>
                <p className="text-gray-500">Player Role</p>
            </div>
        </div>
    )
}