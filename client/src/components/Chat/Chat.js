import React, { useState, ueEffect, useEffect } from "react";

import "./Chat.css";

import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

const Chat = ({ name, room, setMessage, sendMessage, message, messages }) => {
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
