import React, { useEffect, useState } from 'react'
import "./login.css"
const Login = ({username,setusername,setroom,joinRoom}) => {
  
  return (<>
   <div className='login'>
        <h3 className="loginTitle">Welcome Back</h3>
        <input type="text" value={username} className="loginInput"  placeholder="Username"  onChange={(e)=>setusername(e.target.value)}/>
        <input type="number" className="loginInput"  placeholder="Room ID" onChange={(e)=>setroom(e.target.value)}/>
        <button  className="loginButton" onClick={(e)=>{joinRoom(e)}
        }>Join Chat</button>
    </div>
  </>)
}

export default Login