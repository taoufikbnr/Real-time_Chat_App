import React, { useEffect, useState } from 'react'
import "./login.css"
const Login = ({username,setusername,setroom,joinRoom}) => {
  
  return (<>
   <div className='login'>
        <h3 className="loginTitle">Join Chat</h3>
        <input type="text" value={username} className="loginInput"  placeholder="username"  onChange={(e)=>setusername(e.target.value)}/>
        <input type="text" className="loginInput"  placeholder="Room ID" onChange={(e)=>setroom(e.target.value)}/>
        <button  className="loginButton" onClick={(e)=>{joinRoom(e)}
        }>join</button>
    </div>
  </>)
}

export default Login