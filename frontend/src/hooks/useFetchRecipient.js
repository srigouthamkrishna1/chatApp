import { useEffect, useState } from 'react';
import axios from 'axios';
export const useFetchRecipienUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null)
    const recipientId = chat?.members.find((id) => id !== user._id);
    useEffect(() => {
        const getUser = async () => {
            if (!recipientId)
                return null;
            const response = await axios.get(`http://localhost:3000/api/users/find/${recipientId}`)

            setRecipientUser(response.data);

        }
        getUser()
    }, [])
    return { recipientUser };
}