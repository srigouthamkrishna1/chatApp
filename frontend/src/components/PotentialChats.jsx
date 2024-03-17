import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useContext } from "react";
const PotentialChats = () => {
    const { user } = useContext(AuthContext);
    const { potentialChats, createChat } = useContext(ChatContext);
    console.log("potential Chats", potentialChats)
    return (<div className="h-[6%]">
        {potentialChats &&

            <div className="flex gap-3 mt-3 ml-3">
                {potentialChats.map((u, index) => {
                    return <div onClick={() => createChat(user.id, u._id)} className="rounded-md  h-10 bg-blue-100 flex items-center justify-center p-3 text-lg cursor-pointer" key={u._id}>{u.name}</div>
                })}
            </div>}
    </div>);
}

export default PotentialChats;