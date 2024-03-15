import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ChatContext = createContext();
export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [isMessagesLoading, setIsMessagesLoading] = useState(true);
    const [messagesError, setMessagesError] = useState(false);
    const [messages, setMessages] = useState(null)
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    console.log("currentChat", currentChat)

    useEffect(() => {
        const getUsers = async () => {
            try {

                const response = await axios.get(`http://localhost:3000/api/users`);
                console.log("userChats is", userChats);

                const pChats = response.data.filter((u) => {
                    let isChatCreated = false;
                    if (user?._id == u._id) {
                        return false;
                    }
                    if (userChats) {
                        isChatCreated = userChats?.some((chat) => { return chat.members[0] == u._id || chat.members[1] == u._id });
                    }
                    return !isChatCreated;
                });
                setPotentialChats(pChats);




            }
            catch (err) {
                console.log("Error fetching users", err);

            }


        }
        getUsers()

    }, [userChats])
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
    useEffect(() => {
        const getMessages = async () => {
            setIsMessagesLoading(true);
            setMessagesError(null);
            try {
                const response = await axios.get(`http://localhost:3000/api/messages/${currentChat?._id}`)
                console.log("messages response",);
                setIsMessagesLoading(false);
                setMessages(response.data);
            }
            catch (err) {
                setMessagesError(err)
            }



        }

        getMessages();
    }, [currentChat])
    const updateCurrentChat = (chat) => {
        console.log("calling this function")
        setCurrentChat(chat);

    }
    const createChat = async (firstId, secondId) => {
        try {
            console.log("firstID", firstId);
            console.log("secondId", secondId);

            const response = await axios.post(`http://localhost:3000/api/chats/`, { firstId, secondId });
            setUserChats((prev) => [...prev, response.data]);

        } catch (err) {

        }


    }
    return <ChatContext.Provider value={{ userChats, isUserChatsLoading, userChatsError, potentialChats, createChat, updateCurrentChat, messages, currentChat }}>{children}</ChatContext.Provider>
}