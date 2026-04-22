import React, { useEffect, useRef, useState } from 'react'
import "./chat.css"
const Chat = ({socket,username,room}) => {

  const [currentMessage, setcurrentMessage] = useState("")
  const [messageList, setmessageList] = useState([])
  const scrollRef = useRef()

  const sendMessage = async() =>{
    if(currentMessage !== ""){
      const message ={
        room :room,
        username:username,
        message:currentMessage,
<<<<<<< HEAD
        time: new Date().getHours() + ":" + 
        String(new Date().getMinutes()).padStart(2, "0")

      }
      await socket.emit("sendMessage",message)
      setmessageList([...messageList,message])
      setcurrentMessage("")
=======
        time:new Date(Date.now()).getHours() + 
         ":" + new Date(Date.now()).getMinutes() 
      }
      await socket.emit("sendMessage",message)
      setmessageList([...messageList,message])
>>>>>>> master
    }
  }
  useEffect(() => {
   socket?.on("receiveMessage",(data)=>{
    setmessageList([...messageList,data])
    console.log(messageList)
   })
  }, [socket,messageList])
  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
}, [messageList])

<<<<<<< HEAD
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }
  return (
    <div className='chat'>
        <div className="chatHeader">
        <h5>Room #{room}</h5>
=======
  return (
    <div className='chat'>
        <div className="chatHeader">
        <h5>Live Chat</h5>
>>>>>>> master
        </div>
    <div className='chatBody'>
    {messageList.map((el,i)=> 
      <div key={i} ref={scrollRef} className={username===el.username?"message own":"message"}>
        <div className="messageTop">
                <div>{el.username}</div>
                <div className="messageText">{el.message}</div>
                <div>{el.time}</div>
            </div>

        </div>)}
    </div>
        <div className="chatFooter">
<<<<<<< HEAD
          <input type="text" className="chatInput" placeholder='Type your message...'
           value={currentMessage}
           onChange={(e)=>setcurrentMessage(e.target.value)}
           onKeyDown={handleKeyDown}
           />
=======
          <input type="text" className="chatInput" placeholder='send message' onChange={(e)=>setcurrentMessage(e.target.value)} />
>>>>>>> master
          <button onClick={sendMessage} className="chatButton">&#10147;</button>
        </div>
        
    </div>
  )
}

export default Chat