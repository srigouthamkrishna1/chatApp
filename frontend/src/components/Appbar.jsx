import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";

export const Appbar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();



    return <div className="shadow grow-0 flex justify-between items-center">
        <div className="flex flex-col justify-center h-full ml-4 text-xl font-bold">
            Chat App
        </div>
        <div className="font-bold text-xl">
            Logged in as {user?.name}
        </div>
        <div className="flex h-full">

            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 cursor-pointer" onClick={() => {
                logoutUser();
                navigate('/')
            }}>

                <div className="flex flex-col justify-center h-full text-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>

                </div>
            </div>
        </div>
    </div>
}