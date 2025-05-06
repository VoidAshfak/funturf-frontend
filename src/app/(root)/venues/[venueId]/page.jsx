import HeaderText from "@/components/HeaderText"
import { ImageCarousel } from "@/components/ImageCarousel"
import { Button } from "@/components/ui/button"
import { Share2, CalendarCheck2, CheckSquareIcon, Clock } from 'lucide-react'
import Map from "@/components/Map"
import Link from "next/link"
import { VenueCard } from "@/components/VenueCard"
import RatingText from "@/components/RatingText"


const VenueDetails = async ({ params }) => {
    const { venueId } = await params

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data/venues.json`)
    const venues = await res.json()
    const venue = venues.find(venue => venue._id === venueId)

    return (

        <>
            <div className="grid grid-cols-3 auto-rows-auto gap-2 px-10 pt-10">

                <div className="col-span-2">
                    <HeaderText
                        title={venue?.name}
                        subtitle={venue?.address}
                        mapIcon={true}
                    />
                </div>

                <div className="col-span-1">
                    <RatingText rating={venue?.rating} ratingCount={105}/>
                </div>

                <div className="col-span-2">
                    <div className="flex items-center justify-center">
                        <ImageCarousel images={venue?.venueImages} />
                    </div>
                </div>

                <div className="row-span-4 overflow-hidden">

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
                            <h1 className="font-bold items-center flex pb-5"> <Clock className="mr-2" /> Open Time</h1>
                            <p> {venue?.availability} </p>
                        </div>

                        <div className="shadow-sm shadow-gray-300 rounded-lg p-4 ">
                            <Map address={venue?.address} />
                        </div>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-3 auto-rows-auto gap-2 px-10 my-10">
                <div className="col-span-3 shadow-sm shadow-gray-300 rounded-lg p-4 my-5">
                    <h1 className="font-bold text-2xl">
                        Available Sports at {venue?.name}
                    </h1>
                    <p className="text-gray-500">(Click on sports to view price chart)</p>
                    <div className="flex flex-wrap items-center justify-start py-2">
                        {venue?.sports.map((sport, index) => (
                            <div key={index} className="flex flex-col items-center justify-evenly h-30 w-30 p-5 m-5 border shadow-sm hover:shadow-green-300 transition-all duration-300 will-change-transform hover:shadow-lg hover:-translate-y-1 hover:z-10 cursor-pointer" >
                                <img src={`/assets/icons/${sport.toLowerCase()}.png`} alt="football" className="w-6 h-6" />
                                <p className="font-bold"> {sport} </p>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="col-span-3 shadow-sm shadow-gray-300 rounded-lg p-4 my-5">
                    <h1 className="font-bold text-2xl">
                        Facilities
                    </h1>

                    <div className="flex flex-wrap items-center justify-start py-2">
                        {venue?.facilities.map((facility, index) => (
                            <div key={index} className="flex items-center justify-evenly p-5 m-5 " >
                                <CheckSquareIcon className="mr-2 text-green-500" />
                                <p className="font-bold"> {facility} </p>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="col-span-3 shadow-sm shadow-gray-300 rounded-lg p-4 my-5">
                    <h1 className="font-bold text-2xl">
                        About {venue?.name}
                    </h1>
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 py-10">{venue.about}</pre>
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