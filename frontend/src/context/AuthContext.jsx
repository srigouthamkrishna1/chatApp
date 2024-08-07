import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerInfo, setRegisterInfo] = useState(null);
    

    useEffect(() => {
        const user = localStorage.getItem("User");
        setUser(JSON.parse(user));




    }, []);
    const updateRegisterInfo = (info) => {
        console.log(info);
        setRegisterInfo(info);
    }
    const logoutUser = () => {
        localStorage.removeItem("User")
        setUser(null);
    }


    return (<AuthContext.Provider value={{ user, registerInfo, updateRegisterInfo, setUser, logoutUser }}>{children}</AuthContext.Provider>)
}