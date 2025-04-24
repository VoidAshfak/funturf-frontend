import React from 'react'

const Map = ({address}) => {
    return (
        <div>
            <h1 className="font-bold">Location</h1>
            <p>{address}</p>
        </div>
    )
}

export default Map