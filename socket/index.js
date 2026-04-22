const express = require("express");
const cors = require("cors")
const app = express()
const {Server} = require("socket.io")

app.use(cors())
app.get("/", (req, res) => {
  res.send("Server is running ✅")
})
const io = new Server({
  cors:{
    origin:"https://rad-liger-fa2cba.netlify.app",
    
  }
})
io.on("connection",(socket)=>{
  console.log("User connected")
socket.on("joinRoom",(data)=>{
  socket.join(data)
  console.log(`User : ${socket.id} joined ${data}`)
})

  socket.on("sendMessage",(data)=>{
    socket.to(data.room).emit("receiveMessage",data)  })

  socket.on("disconnect",()=>{
    console.log("User disconneted")
  })
})

io.listen(8000)

app.listen(9000,()=>{
  console.log("server connected")
})



