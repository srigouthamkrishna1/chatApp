import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);
  console.log("Top", user);
  return (
    <>
      <ChatContextProvider user={user}>

        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          {user && <Route path="/dashboard" element={<Dashboard />} />}


        </Routes>
      </ChatContextProvider>


    </>
  )
}

export default App
