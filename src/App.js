import logo from './logo.svg';
import io from "socket.io-client"
import './App.css';
import { useEffect, useState } from 'react';

const socket = io("https://nodejshandson5backend.onrender.com") // to connect to backend

function App() {
  const [username,setUsername] = useState("")
  const [message,setMessage] = useState("")
  const [messages,setMessages] = useState([])

  useEffect(() => {
    socket.on("message",(data)=>{
      setMessages([...messages,data])
    })
  },[messages]);
  const sendmessage=(event)=>{
    event.preventDefault()
    socket.emit("chat",{username,message})
    console.log(messages)
    setMessage("");
  }
  return (
    <div className="App">
      <h1> Chat App</h1>
      <div className='chat-window'>
        {
        messages.map((msg,index)=>(
            <div>
              {msg.username===username ?
              (<p key={index} className='outgoing'>{msg.message}<br></br><span className='span-msg'>{msg.username}</span></p>):
              (<p key={index} className='incoming'>{msg.message}<br></br><span className='span-msg'>{msg.username}</span></p>)            
            }
            </div>
        ))
        }
      </div>
      <div>
        <form>
          <input type="text" placeholder='Enter Username' value={username} onChange={(e)=>setUsername(e.target.value)} className="input-user"/>
          <textarea type="text" placeholder='Enter Message' value={message} onChange={(e)=>setMessage(e.target.value)}className="input-msg"/>
          <button onClick={sendmessage} className="btn1">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
