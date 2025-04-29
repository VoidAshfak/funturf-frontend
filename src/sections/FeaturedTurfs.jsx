import { VenueCard } from '@/components/VenueCard'
import React from 'react'
import Link from 'next/link'
import HeaderText from '@/components/HeaderText'
import { ArrowRight } from 'lucide-react'

const FeaturedTurfs = async () => {

    const res = await fetch("http://localhost:3000/data/venues.json")
    const venues = await res.json()
    // console.log(venues);


    return (
        <>
            <HeaderText title="Featured Turfs" subtitle="Check out our featured turfs" center={true} className="" />
            <div className=' flex justify-end items-center gap-2 px-10'>
                <Link
                    className='text-gray-700 underline hover:text-green-600 cursor-pointer font-bold'
                    href="/venues"
                >
                    See all Turfs →
                </Link>
            </div>
            <div className='grid md:grid-cols-4 sm:grid-cols-2 gap-5 p-10 '>
                {venues.map((venue) => (

                    <Link href={`/venues/${venue._id}`} key={venue._id}>
                        <VenueCard venue={venue} />
                    </Link>
                ))}
            </div>
        </>
    )
}

export default FeaturedTurfs