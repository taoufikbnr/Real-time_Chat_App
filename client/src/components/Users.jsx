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
      <div key={i} className="userBadge">
        <div className="onlineDot" />
        {user.username}
      </div>
    ))}
  </div>
  )
}

export default Users