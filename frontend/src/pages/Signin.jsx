import { useContext, useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export const Signin = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState(null);
  const updateLoginDetails = (info) => {
    setLoginDetails(info)
  }
  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox placeholder="harkirat@gmail.com" label={"Email"} onChange={(e) => {
          updateLoginDetails({ ...loginDetails, email: e.target.value })
        }} />
        <InputBox placeholder="123456" label={"Password"} onChange={(e) => {
          updateLoginDetails({ ...loginDetails, password: e.target.value })
        }} />
        <div className="pt-4">
          <Button label={"Sign in"} onClick={async () => {
            const response = await axios.post("https://chatapp-t0rr.onrender.com/api/users/login", loginDetails);
            localStorage.setItem("User", JSON.stringify(response.data));
            setUser(response.data);
            navigate("/dashboard")
          }} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}