// context/UserContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext({
    user: null,
    setUser: () => { },
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    // console.log("PROVIDER START");
    
    // Check auth on first load
    useEffect(() => {

        // console.log("HELLOW FROM USEEFFECT");
        
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
                console.log(data.data.user);
                setUser(data.data.user);

            } catch (err) {
                setUser(null); // not logged in
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
