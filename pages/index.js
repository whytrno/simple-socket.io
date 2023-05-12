import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000", {
  transports: ["websocket"],
});
export default function Home() {
  const [chat, setChat] = useState("");
  const [listChat, setListChat] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const userName = prompt("What is your name?");
    setName(userName);

    if (userName !== null || userName !== "") {
      console.log(userName);
      socket.emit("join-room", userName)
    }
  }, []);

  const handlePost = (e) => {
    socket.emit("chat-room", { name, chat })
    setChat("")
  }

  socket.on("send-chat-to-client", (data) => {
    setListChat([...listChat, data])
  })

  useEffect(() => {
    console.log(listChat);
  }, [listChat])

  return (
    <div>
      <h1>Hallo, {name}</h1>
      <div>
        <input type="text" value={chat} onChange={(e) => setChat(e.target.value)} />
        <button onClick={handlePost}>Send chat</button>
      </div>

      <div>
        {listChat.map((item, index) => (
          <div key={index}>
            <p>{item.name}: {item.chat}</p>
          </div>
        ))}
      </div>
    </div>
  )
}