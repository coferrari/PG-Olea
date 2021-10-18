import React, { useState, useEffect, useRef } from "react";
import socket from "../../socket/socket";
import { isAuthorized, decodeToken } from "../../utils/index";
import style from "./Chat.module.css";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const validate = isAuthorized();
//   if (validate) {
//     const user = decodeToken();
//     var username = user.username;
//   }
const username = 'Coni'

  useEffect(() => {
    socket.emit("connected", username);
  }, [username]);

  useEffect(() => {
    socket.on("messages", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", username, message);
  };

  return (
    <div>
      <div className={style.chat}>
        {messages?.map((m) => (
          <div>{m.message}</div>
        ))}
        <div ref={divRef}></div>
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
