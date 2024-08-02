import { useFetchRecipienUser } from "../hooks/useFetchRecipient";
import userIcon from "../assets/user-icon-svgrepo-com.svg"
import onlineIcon from "../assets/onlineIcon.png";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
const UserChat = ({ chat, user, checkOnline }) => {
    const { recipientUser } = useFetchRecipienUser(chat, user)
    const { updateCurrentChat } = useContext(ChatContext)

    return (<div onClick={() => updateCurrentChat(chat)} className="shadow flex h-20 m-2 bg-gray-200 hover:bg-gray-300 relative border-2 rounded-md border-solid cursor-pointer">
        <div className={` m-1  w-16 h-16 bg-slate-200 rounded-full flex justify-center align-items-center ${checkOnline ? "bg-green-200" : " "}`}>
            <img className="h-full w-[80%]" src={userIcon} />

        </div>
        <div className="flex-col ml-5">
            <div className=" text-l font-bold flex-col">
                {recipientUser?.name}
            </div>
            <div className="mt-2 text-gray-600">Text-Message</div>

        </div>
        <div className="absolute right-0 flex-col">
            <div className=" text-gray-600" > Time</div>
            <div className="mt-2 rounded-full w-6 h-6  bg-red-500 flex justify-center">2</div>


        </div>


    </div >);
}

export default UserChat;