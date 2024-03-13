import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ChatContext = createContext();
export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    console.log("user is", user?.id);
    useEffect(() => {
        const getUserChats = async () => {

            if (user?.id) {
                console.log("inside here");

                setIsUserChatsLoading(true);
                try {
                    const response = await axios.get(`http://localhost:3000/api/chats/${user?.id}`);
                    console.log("Response is", response.data);
                    setIsUserChatsLoading(true);
                    setUserChats(response.data);
                }
                catch (err) {
                    return setUserChatsError(err.response.data);
                }
            }
        }
        console.log("Inside this useEffect")
        getUserChats();
    }, [user])
    return <ChatContext.Provider value={{ userChats, isUserChatsLoading, userChatsError }}>{children}</ChatContext.Provider>
}