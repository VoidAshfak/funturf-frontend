"use client"

import StoreProvider from "./StoreProvider"

export default function ClientLayout({ children }) {
    return (
        <StoreProvider>
            {children}
        </StoreProvider>
    )
}