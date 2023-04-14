import { useEffect, useState, createContext, useContext } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const UserContext = createContext();


export default function UserContextProvider({children}) {
    const [user, setUser] = useState(false);

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        })
        // return unsuscribe;
    }, [])

    if (user === false) return (<p>Loading app...</p>)

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )

}

export const useUserContext = () => useContext(UserContext);