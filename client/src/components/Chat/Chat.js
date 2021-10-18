import React, { useState, useEffect, useRef } from "react";
import socket from "../../socket/socket";
import { isAuthorized, decodeToken } from "../../utils/index";
import style from "./Chat.module.css";

const Chat = () => {
  const [message, setMessage] = useState({});
  const [messages, setMessages] = useState([]);
  const validate = isAuthorized();

  if (validate) {
    const user = decodeToken();
    var username = user.username;
  }

  useEffect(() => {
    socket.emit("connected", username);
  }, [username]);

  useEffect(() => {
    socket.on(
      "messages",
      (message) => {
        setMessages([...messages, message]);
      },
      [messages]
    );

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
    socket.emit("message", message);
    setMessage({ message: "" });
  };

  const handleSetMessage = (e) => {
    e.preventDefault();
    const msg = e.target.value;
    setMessage({
      author: username,
      message: msg,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    });
  };

  return (
    <div>
      <div className={style.chat}>
        {messages?.map((m, i) => (
          <div key={i} className={username === m.author ? style.me : style.you}>
            <div>
              <div>{m.author}</div>
              <div>{m.message}</div>
              <div>{m.time}</div>
            </div>
          </div>
        ))}
        <div ref={divRef}></div>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="">escriba su msj</label>
        <textarea
          value={message.message}
          onChange={(e) => handleSetMessage(e)}
        ></textarea>
        <button>Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
