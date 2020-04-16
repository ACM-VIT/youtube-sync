/* eslint-disable react/prop-types */
import React from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="input curvyBorder"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
    />
    <button type="submit" className="sendButton curvyBorder" onClick={(e) => sendMessage(e)}>
      Send
    </button>
  </form>
);

export default Input;
