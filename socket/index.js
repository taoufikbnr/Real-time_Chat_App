const express = require("express");
<<<<<<< HEAD
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config() 

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running ✅")
})

// ✅ Tie express and socket.io together
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://a7kictm.netlify.app",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected")

  socket.on("joinRoom", (data) => {
    socket.join(data)
    console.log(`User: ${socket.id} joined ${data}`)
  })

  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("receiveMessage", data)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected")
  })
})

// ✅ Single port
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
=======
const cors = require("cors")
const app = express()
const {Server} = require("socket.io")

app.use(cors())

const io = new Server({
  cors:{
    origin:"http://localhost:3000"
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



>>>>>>> master
