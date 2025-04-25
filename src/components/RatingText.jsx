"use client"

import {StarIcon} from "lucide-react"

const RatingText = ({rating, ratingCount}) => {

    const handleRating = () => {
        console.log("Rating Submitted");
        
    }

    return (
        <h1 className="font-bold items-center flex"> <StarIcon className="mr-2 text-yellow-500" />
            {rating}
            <span className="ml-1 font-medium text-sm text-gray-600">
                {`(${ratingCount} ratings)`}
            </span>
            <span
                className="ml-4 font-normal underline text-blue-700 hover:text-gray-700 cursor-pointer"
                onClick={handleRating}
            >
                Rate Venue
            </span>
        </h1>
    )
}

export default RatingText