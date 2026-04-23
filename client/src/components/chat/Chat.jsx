import React, { useEffect, useRef, useState } from 'react'
import "./chat.css"
const Chat = ({socket,username,room}) => {

  const [currentMessage, setcurrentMessage] = useState("")
  const [messageList, setmessageList] = useState([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const scrollRef = useRef()
  const emojis = ["😀", "😂", "😍", "😎", "😭", "🔥", "👍", "❤️", "🎉", "🙏","💩"]

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

  const addEmoji = (emoji) => {
    setcurrentMessage((prev) => prev + emoji)
    setShowEmojiPicker(false)
  }
  return (
      <div className='chat'>
        <div className="chatHeader">
        <div className="dot" />
        <h5>Live chat · {room}</h5>
        </div>
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
            <div className="emojiWrapper">
              <button
                type="button"
                className="emojiToggle"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
              >
                🙂
              </button>
              {showEmojiPicker && (
                <div className="emojiPicker">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className="emojiItem"
                      onClick={() => addEmoji(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
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