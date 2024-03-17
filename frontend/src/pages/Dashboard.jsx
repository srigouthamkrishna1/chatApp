import { useContext, useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"

import { ChatContext } from "../context/ChatContext"
import { AuthContext } from "../context/AuthContext"
import UserChat from "../components/UserChat"
import PotentialChats from "../components/PotentialChats"
import ChatBox from "../components/ChatBox"
export const Dashboard = () => {
    const { user } = useContext(AuthContext)
    const { userChats, isUserChatsLoading, userChatsError, updateCurrentChat } = useContext(ChatContext);
    console.log("===>", userChats);
    return <div className="h-screen ">
        <Appbar />
        <PotentialChats></PotentialChats>
        <div className="h-[82%] w-full p-3 overflow-y-auto">

            <div className="flex w-full h-full">
                <div className="w-[50%]">
                    {userChats?.length < 1 ? null : (
                        <div className="flex h-full">

                            <div className="w-full border-2 border-black">
                                {userChats?.map((chat, index) => {
                                    return <UserChat key={chat._id} className="div" user={user} chat={chat}></UserChat>

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
    </div>
}