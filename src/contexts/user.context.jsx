import { useState, createContext, useEffect } from "react";

import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

// as the actual value that you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };


    // the moment the onAuthStateChangedListener mounts, it will check the authentication state automatically, when you initialize the listener. 
    // Any future runs of this callback will be tied directly to the actual auth state changing. 
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            console.log(user);
        });
        return unsubscribe;     // unsubscribe from the listener when the component unmounts
    }, [])


    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}