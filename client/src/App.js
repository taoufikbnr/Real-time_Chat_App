import './App.css';
import Login from './pages/Login';
import { useEffect, useRef, useState } from 'react';
import  Chat  from './components/chat/Chat';
import {io} from "socket.io-client"

function App() {
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


  return (
  
    <div className="container">
     
  { showChat?  <Chat socket={socket} username={username} room={room} /> :
  <Login username={username} setusername={setusername} setroom={setroom} joinRoom={joinRoom} />}

   </div>
  );
}

export default App;
