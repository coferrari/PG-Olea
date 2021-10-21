import React, { useState, useEffect, useRef } from "react";
import socket from "../../socket/socket";
import { isAuthorized, decodeToken } from "../../utils/index";
import style from "./Chat.module.css";
import { FiSend } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import Picker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";

const Chat = () => {
  const [message, setMessage] = useState({});
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);
  const validate = isAuthorized();

  if (validate) {
    const user = decodeToken();
    var username = user.username;
    var profile = user.picture;
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
    if (message.message) {
      socket.emit("message", message);
      setMessage({ message: "" });
    }
  };

  const handleSetMessage = (e) => {
    e.preventDefault();
    setMessage({
      author: username,
      img: profile,
      message: e.target.value,
      time: `${("0" + new Date(Date.now()).getHours()).slice(-2)}:${(
        "0" + new Date(Date.now()).getMinutes()
      ).slice(-2)}`,
    });
  };

  const handleShow = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const onEmojiClick = (e, emojiObject) => {
    e.preventDefault();
    const { emoji } = emojiObject;
    setMessage({
      author: username,
      img: profile,
      message: message.message ? `${message.message} ${emoji} ` : emoji,
      time: `${("0" + new Date(Date.now()).getHours()).slice(-2)}:${(
        "0" + new Date(Date.now()).getMinutes()
      ).slice(-2)}`,
    });
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h4 className={style.title}>chat</h4>
      </div>
      <div className={style.chat}>
        {messages?.map((m, i) => (
          <div key={i}>
            {m.msg ? (
              <div className={style.user}>{m.msg}</div>
            ) : (
              <div
                key={i}
                className={username === m.author ? style.mymsg : style.yourmsg}
              >
                <div className={username === m.author ? style.me : style.you}>
                  <div
                    className={
                      username === m.author
                        ? style.msgcontainerme
                        : style.msgcontaineryou
                    }
                  >
                    <div className={style.contimg}>
                      {m.img ? (
                        <img className={style.img} src={m.img} alt={m.author} />
                      ) : (
                        <CgProfile className={style.iconprofile} />
                      )}
                    </div>
                    <div
                      className={
                        username === m.author
                          ? style.mymsginfo
                          : style.yourmsginfo
                      }
                    >
                      <div className={style.info}>
                        <div className={style.time}>{m.time}</div>
                      </div>
                      <div>{m.message}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={divRef}></div>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={style.chatbtns}>
          <button className={style.btnsend} onClick={(e) => handleShow(e)}>
            <BsEmojiSmile className={style.iconsend} />
          </button>
          <textarea
            className={style.textarea}
            value={message.message}
            onChange={(e) => handleSetMessage(e)}
            placeholder="Enviar mensaje..."
          ></textarea>
          <button className={style.btnsend}>
            <FiSend className={style.iconsend} />
          </button>
        </div>
        {show ? (
          <div className={style.picker}>
            <Picker width="800px" onEmojiClick={onEmojiClick} />
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default Chat;
