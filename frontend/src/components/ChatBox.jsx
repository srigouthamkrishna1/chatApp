import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useFetchRecipienUser } from "../hooks/useFetchRecipient";
import moment from "moment"
const ChatBox = () => {
    const { user } = useContext(AuthContext);
    const { currentChat, messages, isMessasgesLoading } = useContext(ChatContext);
    console.log("Usr", user);
    console.log("current", currentChat)
    const { recipientUser } = useFetchRecipienUser(currentChat, user)
    console.log("inside CChat box", recipientUser)
    if (!recipientUser) {
        return <p className="text-xl font-bold text-center w-full">
            No conversation selected yet...
        </p>
    }
    return (
        <div className="flex flex-col w-full h-full   rounded-md bg-gray-100 ml-3">
            <div className="w-full text-center h-14 shadow flex justify-center items-center  grow-0">
                {recipientUser?.name}
            </div>
            <div className="grow">
                {messages && messages.map((message, index) => {

                    return (<div className={message?.senderId == user?.id ? "  text-right mt-8 mr-8" : "text-left mt-8 ml-8"}>
                        <div className="inline-block  p-3 rounded-lg shadow">

                            <div className="">{message.text}</div>

                            <div className="text-white text-xs text-right">{moment(message.createdAt).calendar()}</div>




                        </div>


                    </div>)


                })}
            </div>
            <input className="h-8 rounded-md" placeholder="Type your message">

            </input>
        </div >)
}

export default ChatBox;