import React from 'react'
import "./login.css"
const Login = ({username,setusername,setroom,joinRoom,chatType,setChatType}) => {
  
  return (<>
   <div className='login'>
        <h3 className="loginTitle">Welcome Back</h3>
        <p className="loginSubtitle">Choose your chat type</p>
        <div className="chatTypeSwitch">
          <button
            className={`chatTypeButton ${chatType === "public" ? "active" : ""}`}
            onClick={() => setChatType("public")}
            type="button"
          >
            Public
          </button>
          <button
            className={`chatTypeButton ${chatType === "private" ? "active" : ""}`}
            onClick={() => setChatType("private")}
            type="button"
          >
            Private
          </button>
        </div>
        <input type="text" value={username} className="loginInput"  placeholder="Username"  onChange={(e)=>setusername(e.target.value)}/>
        {chatType === "private" && (
          <input type="number" className="loginInput"  placeholder="Room ID" onChange={(e)=>setroom(e.target.value)}/>
        )}
        <button  className="loginButton" onClick={(e)=>{joinRoom(e)}
        }>{chatType === "public" ? "Join Public Chat" : "Join Private Chat"}</button>
    </div>
  </>)
}

export default Login