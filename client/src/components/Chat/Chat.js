import React, { useState, ueEffect, useEffect } from "react";
import io from "socket.io-client";

import "./Chat.css";

import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:5000/";

  useEffect(() => {
    const userObj = JSON.parse(sessionStorage.getItem("userYS"));
    const roomObj = JSON.parse(sessionStorage.getItem("room"));

    setName(userObj.name);
    setRoom(roomObj.name);
  }, []);

  useEffect(() => {
    socket = io(ENDPOINT);
    if (!name || !room) return;
    console.log(name, room);
    socket.emit("join", { name, room }, (err) => {
      if (err) {
        console.log(err);
        alert(err);
      }
    });
  }, [name, room]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("SET MESSAGES ACTIVATE", message);
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers({ users });
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  });

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <>
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </>
  );
};

export default Chat;
