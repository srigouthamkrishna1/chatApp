import { useContext, useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"

import { ChatContext } from "../context/ChatContext"
import { AuthContext } from "../context/AuthContext"
import UserChat from "../components/UserChat"
export const Dashboard = () => {
    const { user } = useContext(AuthContext)
    const { userChats, isUserChatsLoading, userChatsError } = useContext(ChatContext);
    console.log("===>", userChats);
    return <div className="h-screen">
        <Appbar />
        <div className="m-8 ml-0 h-[91%]">
            {userChats?.length < 1 ? null : (
                <div className="flex w-screen h-full">

                    <div className="w-[30%] border-2 border-black">
                        {userChats?.map((chat, index) => {
                            return <UserChat key={chat._id} className="div" user={user} chat={chat}></UserChat>

                        }

                        )}

                    </div>

                    <div>ChatBox</div>
                </div>
            )}

        </div>
    </div>
}