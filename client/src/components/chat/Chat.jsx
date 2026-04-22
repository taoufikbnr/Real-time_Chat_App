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
        time: new Date().getHours() + ":" + 
        String(new Date().getMinutes()).padStart(2, "0")

      }
      await socket.emit("sendMessage",message)
      setmessageList([...messageList,message])
      setcurrentMessage("")
    }
  }
  useEffect(() => {
   socket?.on("receiveMessage",(data)=>{
    setmessageList([...messageList,data])
   })
  }, [socket,messageList])
  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
}, [messageList])

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
          <input type="text" className="chatInput" placeholder='Type your message...'
           value={currentMessage}
           onChange={(e)=>setcurrentMessage(e.target.value)}
           onKeyDown={handleKeyDown}
           />
          <button onClick={sendMessage} className="chatButton">&#10147;</button>
        </div>
        
    </div>
  )
}

export default Chat