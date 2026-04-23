import React, { useEffect, useState } from 'react'
import "./users.css"
const Users = ({socket}) => {
      const [roomUsers, setRoomUsers] = useState([])

  useEffect(() => {
    socket?.on("roomUsers", (users) => {
      setRoomUsers(users)
    })
    return () => socket?.off("roomUsers")
  }, [socket])
  return (
    <div className="userList">
        Online : {roomUsers?.length}
    {roomUsers.map((user, i) => (
      <span key={i} className="userBadge">
        <span className="onlineDot" />
        {user.username}
      </span>
    ))}
  </div>
  )
}

export default Users