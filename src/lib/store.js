"use client";

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/lib/features/auth/authSlice"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: "root",
    storage
}

const persistedReducer = persistReducer(persistConfig, authSlice);

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: persistedReducer
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    })
}

export const store = makeStore();
export const persistor = persistStore(store)