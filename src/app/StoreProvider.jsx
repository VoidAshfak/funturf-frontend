'use client';

import { Provider } from 'react-redux';
import { store, persistor } from '@/lib/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useState, useEffect } from 'react';

const StoreProvider = ({ children }) => {

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null; // Prevent mismatch 
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
};

export default StoreProvider;