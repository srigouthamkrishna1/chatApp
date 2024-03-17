import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useFetchRecipienUser } from "../hooks/useFetchRecipient";
import moment from "moment"
import InputEmoji from "react-input-emoji"
import send from "../assets/send.svg"
const ChatBox = () => {
    const { user } = useContext(AuthContext);
    const { currentChat, messages, isMessasgesLoading, sendTextMessage } = useContext(ChatContext);
    const [textMessage, setTextMessage] = useState("");
    console.log("Usr", user);
    console.log("current", currentChat)
    console.log("text", textMessage)
    const { recipientUser } = useFetchRecipienUser(currentChat, user)
    console.log("inside CChat box", recipientUser)

    if (!recipientUser) {
        return <p className="text-xl font-bold text-center w-full">
            No conversation selected yet...
        </p>
    }
    return (
        <div className="flex flex-col  w-full h-full rounded-md bg-gray-100 ml-3 ">
            <div className="w-full text-center h-[10%] shadow flex justify-center items-center grow-0 ">
                {recipientUser?.name}
            </div>
            <div className="h-[80%] overflow-y-auto">
                <div className="h-full ">
                    {messages && messages.map((message, index) => {

                        return (<div className={message?.senderId == user?.id ? "text-right mt-8 mr-8" : "text-left mt-8 ml-8"}>
                            <div className="inline-block  p-3 rounded-lg shadow">

                                <div className="">{message.text}</div>

                                <div className="text-white text-xs text-right">{moment(message.createdAt).calendar()}</div>




                            </div>


                        </div>)


                    })}</div>

            </div>
            <div className="flex items-center grow-0">

                <InputEmoji value={textMessage} onChange={(value) => setTextMessage(value)}></InputEmoji>
                <img src="send" alt="" />
                <svg className="h-8 cursor-pointer" onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)} xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 32 32" viewBox="0 0 32 32" id="send"><path d="M30.5,14.58997l-28-10c-0.54999-0.19995-1.16998-0.04999-1.58002,0.37C0.51001,5.38,0.39001,6.01001,0.60999,6.56l2.91882,7.31079C3.68054,14.25073,4.0484,14.5,4.45752,14.5h7.70245c0.83002,0,1.5,0.66998,1.5,1.5c0,0.82996-0.66998,1.5-1.5,1.5H4.45752c-0.40912,0-0.77698,0.24921-0.92871,0.62921L0.60999,25.44c-0.21997,0.54999-0.09998,1.17999,0.31,1.59998C1.21002,27.33997,1.59998,27.5,2,27.5c0.16998,0,0.34003-0.03003,0.5-0.09003l28-10c0.59998-0.20996,1-0.77997,1-1.40997S31.09998,14.79999,30.5,14.58997z"></path></svg>
            </div>

        </div >)
}

export default ChatBox;