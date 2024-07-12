import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useContext } from "react";
const PotentialChats = () => {
    const { user } = useContext(AuthContext);
    const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
    console.log("potential Chats", potentialChats);
    console.log("onlineUsers--", onlineUsers);
    return (<div className="h-[6%]">
        {potentialChats &&

            <div className="flex gap-3 mt-3 ml-3">
                {potentialChats.map((u, index) => {
                    let checkOnline = false;
                    if (u && onlineUsers);
                    checkOnline = onlineUsers.some((v) => {
                        return v?.userId == u?._id
                    });
                    if (checkOnline == true) {
                        console.log("Hurray!!")
                    }
                    return <div onClick={() => createChat(user.id, u._id)} className={`rounded-md  h-10 bg-blue-100 flex items-center justify-center p-3 text-lg cursor-pointer ${checkOnline == true ? "bg-green-200" : ' '}`} key={u._id}>{u.name}</div>
                })}
            </div>}
    </div>);
}

export default PotentialChats;