import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("loggedInUser");
        if (savedUser) {
            setLoggedInUser(JSON.parse(savedUser));
        }
    }, [])

    useEffect(() => {
        if (loggedInUser) {
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        } else {
            localStorage.removeItem("loggedInUser");
        }
    }, [loggedInUser])

    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </UserContext.Provider>
    )
}