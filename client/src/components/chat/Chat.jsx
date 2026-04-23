import React, { useEffect, useRef, useState } from 'react'
import "./chat.css"

const Chat = ({socket, username, room}) => {
  const [currentMessage, setcurrentMessage] = useState("")
  const [messageList, setmessageList] = useState([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(true)
  const bottomRef = useRef()
  const scrollRef = useRef()
  const inputRef = useRef()
  const emojiRef = useRef()

  const emojis = ["😀", "😂","😁", "😍", "😎", "😘", "😭", "🔥", "👍", "❤️", "🎉", "🙏","💩"]

  const sendMessage = async() => {
    if(currentMessage.trim() !== ""){
      const message = {
        room,
        username,
        message: currentMessage,
        time: new Date().getHours() + ":" + String(new Date().getMinutes()).padStart(2, "0")
      }
      await socket.emit("sendMessage", message)
      setmessageList(prev => [...prev, message]) 
      setcurrentMessage("")
      setIsAtBottom(true) 
    }
  }
useEffect(() => {
  const handleClickOutside = (e) => {
    if (emojiRef.current && !emojiRef.current.contains(e.target)) {
      setShowEmojiPicker(false)
    }
  }
  document.addEventListener("mousedown", handleClickOutside)
  return () => document.removeEventListener("mousedown", handleClickOutside) // ✅ cleanup
}, [])
  useEffect(() => {
    socket?.on("receiveMessage", (data) => {
      setmessageList(prev => [...prev, data]) 
    })
    return () => socket?.off("receiveMessage") 
  }, [socket]) 

  useEffect(() => {
    if(isAtBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messageList, isAtBottom])

  const handleScroll = () => {
    const el = scrollRef.current
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50
    setIsAtBottom(atBottom)
  }

  const handleKeyDown = (e) => {
    if(e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const addEmoji = (emoji) => {
    setcurrentMessage((prev) => prev + emoji)
    // setShowEmojiPicker(false)
    inputRef.current?.focus()
  }

  return (
    <div className='chat'>
      <div className="chatHeader">
        <div className="dot" />
        <h5>Live chat · {room}</h5>
      </div>

      <div className='chatBody' ref={scrollRef} onScroll={handleScroll}>
      
        {messageList.map((el, i) =>
          <div key={i} className={username === el.username ? "message own" : "message"}>
            <div className="messageTop">
              <div>{el.username}</div>
              <div className="messageText">{el.message}</div>
              <div>{el.time}</div>
            </div>
          </div>
        )}
        <div ref={bottomRef} /> 
      </div>

      <div className="chatFooter">
                {!isAtBottom && (
          <div className="newMessageBtn" onClick={() => {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" })
            setIsAtBottom(true)
          }}>
            New message ↓
          </div>
        )}
        <div className="emojiWrapper"  ref={emojiRef}>
          <button type="button" className="emojiToggle" onClick={() => setShowEmojiPicker((prev) => !prev)}>
            🙂
          </button>
          {showEmojiPicker && (
            <div className="emojiPicker">
              {emojis.map((emoji) => (
                <button key={emoji} type="button" className="emojiItem" onClick={() => addEmoji(emoji)}>
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
        <input
          type="text"
          className="chatInput"
          placeholder='Type your message...'
          value={currentMessage}
          onChange={(e) => setcurrentMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <button onClick={sendMessage} className="chatButton">&#10147;</button>
      </div>
    </div>
  )
}

export default Chat