import React from 'react'
import Link from 'next/link'
import HeaderText from '@/components/HeaderText'
import EventCard from '@/components/EventCard'
import events from "../../public/data/events.json"

const FeaturedEvents = async () => {

    return (
        <>
            <HeaderText title="Discover Games" subtitle="Pick a game to play" center={true} className="" />
            <div className=' flex justify-end items-center gap-2 px-10'>
                <Link 
                    className='text-gray-700 underline hover:text-green-600 cursor-pointer font-bold'
                    href="/events"
                >
                    See all Matches →
                </Link>
            </div>
            <div className='grid md:grid-cols-4 sm:grid-cols-2 gap-5 p-10 '>
                {events.map((event) => (

                    <Link href={`/events/${event._id}`} key={event._id}>
                        <EventCard event={event} />
                    </Link>
                ))}
            </div>
        </>
    )
}

export default FeaturedEvents