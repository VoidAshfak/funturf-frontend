import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/lib/features/auth/authSlice"

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authSlice
        },
    })
}