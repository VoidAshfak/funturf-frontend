import Link from "next/link"
import EventCard from "@/components/EventCard"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const AllEvents = async () => {
    const res = await fetch("http://localhost:3000/data/events.json")
    const events = await res.json()
    return (
        <div className="px-40 pt-10">

            <div>
                <Filters />
            </div>


            <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-5 p-8 '>
                {events.map((event) => (

                    <Link href={`/events/${event._id}`} key={event._id}>
                        <EventCard event={event} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default AllEvents



const Filters = () => {
    return (
        <div className="grid grid-cols-4 grid-rows-1 gap-6">


            <div >
                <Label htmlFor="email">Your email address</Label>
                <Input />
            </div>


            <div > <Input /> </div>
            <div > <Input /> </div>
            <div > <Input /> </div>
        </div>
    )
}