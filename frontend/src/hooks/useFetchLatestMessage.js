import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext"
import axios from "axios";

export const useFetchLatestMessage=(chat)=>{
    const {newMessage,notifications}=useContext(ChatContext);
    const [latestMessage,setLatestMessage]=useState(null);
    useEffect(()=>{
        const getMessages=async()=>{
            const response=await axios.get(`https://chatapp-t0rr.onrender.com/api/messages/${chat?._id}`);
            if(response.error){
                return console.log("Error getting messages...",error);
            }
            const lastMessage=response.data[response?.data?.length-1];
            setLatestMessage(lastMessage);
        }
        getMessages();
    },[newMessage,notifications]);
    return {latestMessage};
}