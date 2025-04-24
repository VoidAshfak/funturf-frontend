import HeaderText from "@/components/HeaderText"
import { ImageCarousel } from "@/components/ImageCarousel"
import { Button } from "@/components/ui/button"
import { Share2, CalendarCheck2 } from 'lucide-react'
import Map from "@/components/Map"
import Link from "next/link"
import { VenueCard } from "@/components/VenueCard"


const VenueDetails = async ({ params }) => {
    const { venueId } = await params

    const res = await fetch(`http://localhost:3000/data/venues.json`)
    const venues = await res.json()
    const venue = venues.find(venue => venue._id === venueId)

    return (

        <>
            <div className="grid grid-cols-3 auto-rows-auto gap-2 p-10">

                <div className="col-span-2">
                    <HeaderText
                        title={venue?.name}
                        subtitle={venue?.address}
                        mapIcon={true}
                    />
                </div>

                <div className="col-span-1">
                    rating and others here...
                </div>

                <div className="row-span-4 row-start-2 col-span-2 bg-gray-500">
                    <div className="flex items-center justify-center">
                        <ImageCarousel images={venue?.venueImages} />
                    </div>
                </div>

                <div className="row-span-1 bg-gray-600">
                    sdas
                </div>

                <div className="row-span-4 row-start-2">

                    <div className="grid grid-cols-1 auto-rows-auto gap-4">
                        <div className="shadow-sm shadow-gray-300 rounded-lg p-4 ">

                            <div className="grid grid-cols-2 grid-rows-2 gap-4">
                                <div className="col-span-2 ">
                                    <Button
                                        className={`w-full bg-green-600 hover:bg-green-700 cursor-pointer`}
                                    >
                                        <CalendarCheck2 />
                                        Book Now
                                    </Button>
                                </div>
                                <div className="row-start-2">
                                    <Button
                                        className={`w-full hover:bg-green-200 cursor-pointer`}
                                        variant={"outline"}
                                    >
                                        <Share2 />
                                        Share
                                    </Button>
                                </div>
                                <div className="row-start-2">
                                    <Button
                                        className={`w-full hover:bg-green-200 cursor-pointer`}
                                        variant={"outline"}
                                    >
                                        Corporate/Bulk
                                    </Button>
                                </div>
                            </div>

                        </div>

                        <div className="shadow-sm shadow-gray-300 rounded-lg p-4 ">
                            <h1 className="font-bold">Open Time</h1>
                            <p> {venue?.availability} </p>
                        </div>

                        <div className="shadow-sm shadow-gray-300 rounded-lg p-4 ">
                            <Map address={venue?.address} />
                        </div>
                    </div>

                </div>

                <div className="col-span-3 pt-10">

                    <h1 className="font-bold text-2xl">
                        Related Venues
                    </h1>

                    <div className="py-10 px-5 grid grid-cols-4 gap-4">
                    {venues.map((venue) => (
                        <Link href={`/venues/${venue._id}`} key={venue._id}>
                            <VenueCard venue={venue} />
                        </Link>
                    ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default VenueDetails