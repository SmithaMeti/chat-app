import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./index.css";

const socket = io("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const joinChat = () => {
    if (username.trim()) {
      setIsJoined(true);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", `${username}: ${message}`);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">💬 Real-Time Chat App</div>

      {!isJoined ? (
        <div
          className="input-container"
          style={{ flexDirection: "column", alignItems: "center" }}
        >
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "90%", padding: "8px", marginBottom: "10px" }}
          />
          <button onClick={joinChat} style={{ width: "90%", padding: "8px" }}>
            Join
          </button>
        </div>
      ) : (
        <>
          <div className="chat-box">
            {messages.map((msg, index) => {
              const isMine = msg.startsWith(username);
              return (
                <div
                  key={index}
                  className={`message ${
                    isMine ? "my-message" : "other-message"
                  }`}
                >
                  {msg}
                </div>
              );
            })}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
