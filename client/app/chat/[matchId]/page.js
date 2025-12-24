"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getToken } from "../../../utils/auth";

export default function ChatPage({ params }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const s = io("http://localhost:5000", {
      auth: { token: getToken() }
    });

    s.emit("joinRoom", params.matchId);
    s.on("receiveMessage", msg => setMessages(m => [...m, msg]));

    setSocket(s);
    return () => s.disconnect();
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      matchId: params.matchId,
      text
    });
    setText("");
  };

  return (
    <div>
      <h1>Chat</h1>
      {messages.map((m, i) => <p key={i}>{m.text}</p>)}
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
