import React from "react";
import "./screen.css";

import Chat from "../../components/Chat/Chat";

function Screen() {
  return (
    <div className="screenWrapper">
      <div className="Movie"></div>
      <div className="Chat">
        <Chat />
      </div>
    </div>
  );
}

export default Screen;
