import { useContext, useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"

import { ChatContext } from "../context/ChatContext"
import { AuthContext } from "../context/AuthContext"
import UserChat from "../components/UserChat"
import PotentialChats from "../components/PotentialChats"
import ChatBox from "../components/ChatBox"
export const Dashboard = () => {
    const { user } = useContext(AuthContext)
    const { userChats, isUserChatsLoading, userChatsError, updateCurrentChat, onlineUsers } = useContext(ChatContext);

    console.log("===>", userChats);
    return <div className="h-screen ">
        <Appbar />
        <PotentialChats></PotentialChats>
        <div className="h-[82%] w-full p-3 overflow-y-auto">

            <div className="flex w-full h-full  ">
                <div className="w-[50%]  overflow-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-500 scrollbar-thumb-rounded-md border-2 border-violet-200 border-rounded-md">
                    {userChats?.length < 1 ? null : (
                        <div className="flex h-full">

                            <div className="w-full ">
                                {userChats?.map((chat, index) => {
                                    let checkOnline = false;
                                    if (chat && onlineUsers);
                                    checkOnline = onlineUsers.some((v) => {
                                        return v?.userId == chat?._id
                                    });
                                    if (checkOnline == true) {
                                        console.log("Hurray!!")
                                    }
                                    return <UserChat key={chat._id} user={user} checkOnline={checkOnline} chat={chat}></UserChat>

                                }

                                )}

                            </div>


                        </div>
                    )}
                </div>
                <ChatBox >

                </ChatBox>


            </div>
        </div>
    </div >
}