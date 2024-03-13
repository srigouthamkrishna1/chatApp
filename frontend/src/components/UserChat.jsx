import { useFetchRecipienUser } from "../hooks/useFetchRecipient";
import userIcon from "../assets/user-icon-svgrepo-com.svg"
const UserChat = ({ chat, user }) => {
    const { recipientUser } = useFetchRecipienUser(chat, user)

    return (<div className="flex h-[10%] m-2 hover:bg-gray-200">
        <div className="w-[12%] m-1  h-[90%] bg-blue-200 rounded-full flex justify-center align-items-center">
            <img className="h-full w-[80%]" src={userIcon} />
        </div>
        <div className="flex-col ml-5">
            <div className=" text-l font-bold flex-col">
                {recipientUser?.name}
            </div>
            <div className="mt-2">Text-Message</div>

        </div>
        <div className="flex-grow text-right ">Time</div>
    </div>);
}

export default UserChat;