import React, { useState, useEffect } from "react";
import querystring from "query-string";
import io from "socket.io-client";

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  useEffect(() => {
    const { name, room } = querystring.parse(window.location.search);
    const socket = io("localhost:3001/");
    setName(name);
    setRoom(room);
    socket.emit("join", { name: name, room: room });
    return () => {
      socket.emit("disconnected", { name: name, room: room });
    };
  }, [window.location.search]);
  return <div>Hola {name}</div>;
};
export default Chat;
