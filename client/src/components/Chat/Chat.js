import React, { useState, useEffect, useRef } from "react";
import socket from "../../socket/socket";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("connected", "I'm connected with the back-end");
  }, []);

  useEffect(() => {
    socket.on("messages", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
  };

  return (
      <div>
      <div>{messages?.map((m) => <div>{m.message}</div>)}
      </div>

    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="">escriba su msj</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button>Enviar</button>
    </form>
      </div>
  );
};

export default Chat;
