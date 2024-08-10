import { useFetchRecipienUser } from "../hooks/useFetchRecipient";
import userIcon from "../assets/user-icon-svgrepo-com.svg"
import onlineIcon from "../assets/onlineIcon.png";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import moment from "moment";
import { useFetchLatestMessage } from "../hooks/useFetchLatestMessage";
const UserChat = ({ chat, user, checkOnline }) => {
    const { recipientUser } = useFetchRecipienUser(chat, user)
    const { updateCurrentChat ,notifications,allUsers,markThisUserNotificationsAsRead} = useContext(ChatContext);
    const {latestMessage}=useFetchLatestMessage(chat);
    const unreadNotifications=notifications?.filter((u)=>{return (u.isRead==false)})
    console.log("notifications-1",notifications);
    console.log("unreadNotifications-1",unreadNotifications);
    const thisUserNotifications=unreadNotifications?.filter((n)=>{return n.senderId==recipientUser?._id});
    const truncateText=(text)=>{
        let shortText=text.substring(0,20);
        if(text.length>20){
            shortText=shortText+"..."
        }

        return shortText;
    }
    return (<div onClick={() => {updateCurrentChat(chat);
        if(thisUserNotifications?.length!=0){
            markThisUserNotificationsAsRead(
                thisUserNotifications,notifications
            )
            console.log("newNotifications",notifications);
            console.log("thisUserNotifications",thisUserNotifications);
        }
    }} className="shadow flex h-20 m-2 bg-gray-200 hover:bg-gray-300 relative border-2 rounded-md border-solid cursor-pointer">
        <div className={` m-1  w-16 h-16 bg-slate-200 rounded-full flex justify-center align-items-center ${checkOnline ? "bg-green-200" : " "}`}>
            <img className="h-full w-[80%]" src={userIcon} />

        </div>
        <div className="flex-col ml-5">
            <div className=" text-l font-bold flex-col">
                {recipientUser?.name}
            </div>
            <div className="mt-2 text-gray-600">{latestMessage?.text&&truncateText(latestMessage.text)}</div>

        </div>
        <div className="absolute right-0 flex-col">
            <div className=" text-gray-600" > {moment(latestMessage?.createdAt).calendar()}</div>
            <div className={thisUserNotifications?.length?"mt-2 rounded-full w-6 h-6  bg-slate-700 text-white flex justify-center":""}>{thisUserNotifications?.length?`${thisUserNotifications.length}+`:null}</div>


        </div>


    </div >);
}

export default UserChat;