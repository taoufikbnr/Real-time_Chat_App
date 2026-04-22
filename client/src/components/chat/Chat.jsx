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
        time:new Date(Date.now()).getHours() + 
         ":" + new Date(Date.now()).getMinutes() 
      }
      await socket.emit("sendMessage",message)
      setmessageList([...messageList,message])
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

  return (
    <div className='chat'>
        <div className="chatHeader">
        <h5>Live Chat on {room}</h5>
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
          <input type="text" className="chatInput" placeholder='send message' onChange={(e)=>setcurrentMessage(e.target.value)} />
          <button onClick={sendMessage} className="chatButton">&#10147;</button>
        </div>
        
    </div>
  )
}

export default Chat