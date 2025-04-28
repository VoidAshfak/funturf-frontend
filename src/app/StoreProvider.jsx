"use client"

import { Provider } from "react-redux"
import {makeStore} from "@/lib/store"
import { useRef } from 'react'

const StoreProvider = ({ children }) => {
    const storeRef = useRef(undefined)

    if(!storeRef.current) {
        storeRef.current = makeStore()
    }

    return (
        <Provider store={storeRef.current}>
            {children}
        </Provider>
  )
}

export default StoreProvider