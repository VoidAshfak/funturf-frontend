'use client'

import React, { useEffect } from 'react'
import { UserPlus, UserCheck, Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { sendTurfmateRequest } from '@/lib/api'


const ConnectButton = ({userId}) => {

    // WORKFLOW
    // check if the app user is connected to this user
    // if not, the button should say "connect"
    // if yes, the button should say "connected"
    // if the user has sent a connection request, the button should say "pending"
    // the click handler should call the api to send a connection request

    const [status, setStatus] = React.useState(null);

    useEffect(() => {
        const turfmateStatus = getTurfmateStatus(userId)
        setStatus(turfmateStatus)
    })


    if(!status) 


    return (
        <div className='mt-8 mr-2'>
            <Button
                variant={"outline"}
                className={"cursor-pointer" + (connection.connected ? " bg-green-300" : "")}
                onClick={handleConnect}
            >
                {
                    connection.connected ? <UserCheck /> : connection.sentConnectionRequest ? <Loader /> : <UserPlus />
                }
            </Button>
        </div>
    )
}

export default ConnectButton