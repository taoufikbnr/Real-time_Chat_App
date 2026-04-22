import './App.css';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import  Chat  from './components/chat/Chat';
import {io} from "socket.io-client"

function App() {
const [username, setusername] = useState("")
const [room, setroom] = useState("")
const [socket, setsocket] = useState(null)
const [showChat, setshowChat] = useState(false)
const [isDarkMode, setIsDarkMode] = useState(() => {
  const savedTheme = localStorage.getItem("theme")
  return savedTheme ? savedTheme === "dark" : true
})
const [chatType, setChatType] = useState("public")

const joinRoom = (e) => {
  e.preventDefault()
  const targetRoom = chatType === "public" ? "9ata3 w Rayech" : room
  if(username !== "" && targetRoom !== ""){
    setroom(targetRoom)
    socket?.emit("joinRoom", targetRoom)
    setshowChat(true)
  }
}
console.log(process.env.REACT_APP_SOCKET_URL);

useEffect(() => {
        const newSocket = io(process.env.REACT_APP_SOCKET_URL, {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
    })
    setsocket(newSocket)

    // ✅ Listen on newSocket not socket (socket is still null here)
    newSocket.on("connect", () => {
      console.log("✅ Connected to server!", newSocket.id)
    })

    newSocket.on("connect_error", (err) => {
      console.log("❌ Connection failed:", err.message)
    })

    // ✅ Cleanup on unmount
    return () => newSocket.disconnect()
  }, [])

useEffect(() => {
  document.body.classList.toggle("dark-mode", isDarkMode)
  localStorage.setItem("theme", isDarkMode ? "dark" : "light")
}, [isDarkMode])


  return (
  
    <div className={`container ${isDarkMode ? "dark" : ""}`}>
      <button
        className="themeToggle"
        onClick={() => setIsDarkMode((prev) => !prev)}
      >
        {isDarkMode ? "Light" : "Dark"}
      </button>
     
  { showChat?  <Chat socket={socket} username={username} room={room} /> :
  <Login
    username={username}
    setusername={setusername}
    setroom={setroom}
    joinRoom={joinRoom}
    chatType={chatType}
    setChatType={setChatType}
  />}

   </div>
  );
}

export default App;
