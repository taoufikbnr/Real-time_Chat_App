const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config() 

const app = express();
app.use(cors());
const roomUsers = {}
app.get("/", (req, res) => {
  res.send("Server is running")
})

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
  const { room, username } = data 
  socket.join(room)
  socket.data.username = username 
  socket.data.room = room

  if (!roomUsers[room]) roomUsers[room] = []
  roomUsers[room].push({ id: socket.id, username })

  io.to(room).emit("roomUsers", roomUsers[room])
})

socket.on("disconnect", () => {
  const { room, username } = socket.data
  if (room && roomUsers[room]) {
    roomUsers[room] = roomUsers[room].filter(u => u.id !== socket.id)
    io.to(room).emit("roomUsers", roomUsers[room])
  }
})

  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("receiveMessage", data)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected")
  })
})

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
