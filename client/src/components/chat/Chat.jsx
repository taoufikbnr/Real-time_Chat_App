import React, { useCallback, useEffect, useRef, useState } from 'react'
import "./chat.css"

const MAX_IMAGE_SIZE_BYTES = 1024 * 1024

const Chat = ({socket, username, room}) => {
  const [currentMessage, setcurrentMessage] = useState("")
  const [messageList, setmessageList] = useState([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(true)
  const [imagePreview, setImagePreview] = useState(null)

  const bottomRef = useRef()
  const scrollRef = useRef()
  const inputRef = useRef()
  const emojiRef = useRef()
  const fileInputRef = useRef()

  const emojis = ["😀", "😂","😁", "😍", "😎", "😘", "😭", "🔥", "👍", "❤️", "🎉", "🙏","💩"]

  const sendMessage = async() => {
    if (currentMessage.trim() !== "" || imagePreview) {
      const message = {
        room,
        username,
        message: currentMessage,
        image: imagePreview || null,
        time: new Date().getHours() + ":" + String(new Date().getMinutes()).padStart(2, "0")
      }
      await socket.emit("sendMessage", message)
      setmessageList(prev => [...prev, message]) 
      setcurrentMessage("")
      setImagePreview(null)
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
  
  const setPreviewFromFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      window.alert("Image is too large. Please upload an image under 1MB.")
      return
    }

    const reader = new FileReader()
    reader.onload = () => setImagePreview(reader.result)
    reader.readAsDataURL(file)
 }

 const handlePasteImage = useCallback((e) => {
    const items = e.clipboardData?.items
    if (!items) return

    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile()
        setPreviewFromFile(file)
        inputRef.current?.focus() 
        e.preventDefault()
        break
      }
    }
  }, [])

useEffect(() => {
  window.addEventListener("paste", handlePasteImage)
  return () => window.removeEventListener("paste", handlePasteImage)
}, [handlePasteImage])
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
const handleImageUpload = (e) => {
  const file = e.target.files[0]
  setPreviewFromFile(file)
  inputRef.current?.focus() 
  e.target.value = ""
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
              {el.image && ( 
                <img src={el.image} alt="sent" className="messageImage" />
              )}
              {el.message && (
                <div className="messageText">{el.message}</div>
              )}
              <div>{el.time}</div>
            </div>
          </div>
        )}
        <div ref={bottomRef} /> 
      </div>

      <div className="chatFooter">
        {imagePreview && (
          <div className="imagePreview">
            <img src={imagePreview} alt="preview" />
            <button className="removeImage" onClick={() => setImagePreview(null)}>✕</button>
          </div>
        )}
        {!isAtBottom && (
          <div className="newMessageBtn" onClick={() => {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" })
            setIsAtBottom(true)
          }}>
            New message ↓
          </div>
        )}
        <div className="chatFooterControls">
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
        <button type="button" className="imageToggle" onClick={() => fileInputRef.current.click()}>
          🖼️
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        <input
          type="text"
          className="chatInput"
          placeholder='Type message or paste image (Ctrl+V)...'
          value={currentMessage}
          onChange={(e) => setcurrentMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePasteImage}
          ref={inputRef}
        />
        <button onClick={sendMessage} className="chatButton"><span>➤</span></button>
        </div>
      </div>
    </div>
  )
}

export default Chat