"use client"

import Link from "next/link"
import EventCard from "@/components/EventCard"
import useSWR from "swr"
import { useState } from "react"
import { Select, Input, DatePicker } from "@/components/CustomInputComponents"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"


const fetcher = (...args) => fetch(...args).then(res => res.json())

const AllEvents = () => {

    const [filters, setFilters] = useState({ date: "", sport: '', playersRequired: '' });

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    // Use this query to fetch filtered data from the server
    const query = new URLSearchParams(filters);

    const { data: events, isLoading } = useSWR(`http://localhost:3000/data/events.json`, fetcher)

    return (
        <div className=" px-40 pt-10 ">

            <div className="p-10 border-2 border-gray-300 rounded-3xl bg-gradient-to-tr from-gray-100 via-white to-gray-100">
                <form 
                    action={() => {
                        console.log(filters, "Query: ", query);
                    }}
                    className="flex gap-6 items-center justify-around"    
                >


                    <Select
                        name={"sport"}
                        value={filters.sport}
                        onResetHandler={() => setFilters({ ...filters, sport: "" })}
                        onChange={handleChange}
                    />

                    <Input
                        name="playersRequired"
                        value={filters.playersRequired}
                        onChange={handleChange}
                        placeholder={"Required Players"}
                    />

                    <DatePicker
                        date={filters.date}
                        onSelect={(val) => setFilters({ ...filters, date: val })}
                    />

                    <Button
                        className="w-32 p-6 cursor-pointer bg-green-200"
                        variant={"outline"}
                        type="submit"
                    >
                        <Search/> Search
                    </Button>

                </form>
            </div>

            <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-5 p-8 '>
                {events?.map((event) => (

                    <Link href={`/events/${event._id}`} key={event._id}>
                        <EventCard event={event} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default AllEvents
