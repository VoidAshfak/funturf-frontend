import { VenueCard } from '@/components/VenueCard'
import React from 'react'
import Link from 'next/link'
import HeaderText from '@/components/HeaderText'

const FeaturedTurfs = async () => {

    const res = await fetch("http://localhost:3000/data/venues.json")
    const venues = await res.json()
    // console.log(venues);
    

    return (
        <>
        <HeaderText title="Featured Turfs" subtitle="Check out our featured turfs" center={true} className="bg-emerald-50"/>
        <div className='grid md:grid-cols-4 sm:grid-cols-2 gap-5 p-10 bg-gradient-to-t from-green-100 to-emerald-50'>
            {venues.map((venue) => (

                <Link href={`/venues/${venue._id}`} key={venue._id}>
                    <VenueCard  venue={venue}/>
                </Link>
            ))}
        </div>
        </>
    )
}

export default FeaturedTurfs