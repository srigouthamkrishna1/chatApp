import { useFetchRecipienUser } from "../hooks/useFetchRecipient";

const UserChat = ({ chat, user }) => {
    const { recipientUser } = useFetchRecipienUser(chat, user)
    console.log("recipientUser", recipientUser);
    return (<div>{recipientUser?.name}</div>);
}

export default UserChat;