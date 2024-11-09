import { React, useState, createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [firstName, setFirstName] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <UserContext.Provider value={{ firstName, setFirstName, isLoggedIn, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};