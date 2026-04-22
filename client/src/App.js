import './App.css';
import Login from './pages/Login';
<<<<<<< HEAD
import { useEffect, useState } from 'react';
=======
import { useEffect, useRef, useState } from 'react';
>>>>>>> master
import  Chat  from './components/chat/Chat';
import {io} from "socket.io-client"

function App() {
<<<<<<< HEAD
const [username, setusername] = useState("")
const [room, setroom] = useState("")
const [socket, setsocket] = useState(null)
const [showChat, setshowChat] = useState(false)
const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark")

const joinRoom = (e) => {
  e.preventDefault()
  if(username !== "" && room !== ""){
    socket?.emit("joinRoom", room)
    setshowChat(true)
  }
}
console.log(process.env.REACT_APP_SOCKET_URL);

useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SOCKET_URL)
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
=======
  const [username, setusername] = useState("")
  const [room, setroom] = useState("")
  const [socket, setsocket] = useState(null)
  const [showChat, setshowChat] = useState(false)
  
  const joinRoom = (e) =>{
    e.preventDefault()
if(username !== "" && room !==""){
  socket?.emit("joinRoom",room)
}
setshowChat(true)
  }
  useEffect(() => {
     setsocket(io("http://localhost:8000"))
     socket?.on("connection",(msg)=>{
       console.log(msg)
     })
  },[])
>>>>>>> master


  return (
  
<<<<<<< HEAD
    <div className={`container ${isDarkMode ? "dark" : ""}`}>
      <button
        className="themeToggle"
        onClick={() => setIsDarkMode((prev) => !prev)}
      >
        {isDarkMode ? "Light" : "Dark"}
      </button>
=======
    <div className="container">
>>>>>>> master
     
  { showChat?  <Chat socket={socket} username={username} room={room} /> :
  <Login username={username} setusername={setusername} setroom={setroom} joinRoom={joinRoom} />}

   </div>
  );
}

export default App;
