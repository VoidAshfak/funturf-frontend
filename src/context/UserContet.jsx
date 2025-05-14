'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext({
    user: null,
    setUser: () => { },
    loading: true
});

export const ContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/v1/users/varify-login', {
                    method: "POST",
                    credentials: 'include',
                });
                if (!res) {
                    console.log("Something went wrong varifying login");
                }
                const data = await res.json();
                if(data) {
                    setUser(data.data.user);
                } else {
                    setUser(null);
                }
            } catch (err) {
                setUser(null); // not logged in
            } finally {
                setLoading(false)
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
