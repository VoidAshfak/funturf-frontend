import React from 'react'
import Link from 'next/link'
import HeaderText from '@/components/HeaderText'
import EventCard from '@/components/EventCard'

const FeaturedEvents = async () => {

    const res = await fetch("http://localhost:3000/data/events.json")
    const events = await res.json()
    // console.log(events);
    

    return (
        <>
        <HeaderText title="Discover Games" subtitle="Pick a game to play" center={true} className="bg-green-100"/>
        <div className='grid md:grid-cols-4 sm:grid-cols-2 gap-5 p-10 bg-gradient-to-b from-green-100 to-fuchsia-100'>
            {events.map((event) => (

                <Link href={`/events/${event._id}`} key={event._id}>
                    <EventCard  event={event}/>
                </Link>
            ))}
        </div>
        </>
    )
}

export default FeaturedEvents