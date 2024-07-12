import { useEffect, useState } from 'react';
import axios from 'axios';
export const useFetchRecipienUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null)
    console.log("CHat is", chat?.members);
    const recipientId = chat?.members?.find((id) => id != user.id);
    console.log("recipientId", user)
    useEffect(() => {
        const getUser = async () => {
            if (!recipientId)
                return null;
            const response = await axios.get(`https://chatapp-t0rr.onrender.com/api/users/find/${recipientId}`)

            setRecipientUser(response.data);

        }
        getUser()
    }, [recipientId])
    return { recipientUser };
}