import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client"
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
    const [newMessage, setNewMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([null]);
    console.log("currentChat", currentChat)
    console.log("SetMessages", messages);
    console.log("onlineUsers", onlineUsers);


    useEffect(() => {
        const newSocket = io("https://chatapp-1-5sat.onrender.com");

        setSocket(newSocket);
        console.log("Socket", newSocket);
        return () => {
            newSocket.disconnect();
        }

    }, [user]);
    useEffect(() => {
        if (socket == null) return;
        console.log("Run")
        socket.emit("addNewUser", user?.id);
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        })
        return () => {
            socket.off("getOnlineUsers");
        }
    }, [socket])
    useEffect(() => {
        if (!socket) return;
        const recipientId = currentChat.members.find((u) => u !== user.id);

        socket.emit("sendMessage", { ...newMessage, recipientId });
    }, [newMessage])
    useEffect(() => {
        if (!socket) return
        socket.on("getMessage", (res) => {
            console.log("in this1")
            if (currentChat._id !== res.chatId) {
                return;
            }
            setMessages((prev) => [...prev, res]);
        })
        return () => {
            socket.off("getMessage")
        }
    }, [currentChat, socket])

    useEffect(() => {
        const getUsers = async () => {
            try {

                const response = await axios.get(`https://chatapp-t0rr.onrender.com/api/users`);
                console.log("userChats is", userChats);

                const pChats = response.data.filter((u) => {
                    let isChatCreated = false;
                    if (user?.id == u._id) {
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
    const sendTextMessage = async (textMessage, sender, currentChatId, setTextMessage) => {
        if (!textMessage)
            return console.log("You must type something")

        const response = await axios.post("https://chatapp-t0rr.onrender.com/api/messages", { chatId: currentChatId, senderId: sender.id, text: textMessage });
        setNewMessage(response.data);
        console.log("message sent is", response.data);
        setMessages((prev) => { return [...prev, response.data] });

        setTextMessage("");
    }
    useEffect(() => {
        const getUserChats = async () => {

            if (user?.id) {
                console.log("inside here");

                setIsUserChatsLoading(true);
                try {
                    const response = await axios.get(`https://chatapp-t0rr.onrender.com/api/chats/${user?.id}`);
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
                const response = await axios.get(`https://chatapp-t0rr.onrender.com/api/messages/${currentChat?._id}`)

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

            const response = await axios.post(`https://chatapp-t0rr.onrender.com/api/chats/`, { firstId, secondId });
            setUserChats((prev) => {
                if (prev == null || prev == undefined) {
                    return [response.data];
                }
                else {
                    return [...prev, response.data];
                }
            });

        } catch (err) {

        }


    }
    return <ChatContext.Provider value={{ userChats, isUserChatsLoading, userChatsError, potentialChats, createChat, updateCurrentChat, messages, currentChat, sendTextMessage, onlineUsers }}>{children}</ChatContext.Provider>
}