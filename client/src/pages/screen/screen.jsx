/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './screen.css';

import Chat from '../../components/Chat/Chat';

let socket;

const AdminPanel = () => (
  <>
    <div className="blur" />
    <div className="adminPanel" />
  </>
);

const Screen = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [adminDisplay, setAdminDisplay] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'http://localhost:5000/';

  useEffect(() => {
    const userObj = JSON.parse(sessionStorage.getItem('userYS'));
    const roomObj = JSON.parse(sessionStorage.getItem('room'));

    setName(userObj.name);
    setRoom(roomObj.name);
  }, []);

  useEffect(() => {
    socket = io(ENDPOINT);
    if (!name || !room) return;
    console.log(name, room);
    socket.emit('join', { name, room }, (err) => {
      if (err) {
        console.log(err);
        alert(err);
      }
    });
  }, [name, room]);

  useEffect(() => {
    socket.on('adminCheck', ({ isAdmin }) => {
      console.log('SET ADMIN ACTIVATE', isAdmin);
      setAdmin(isAdmin);
      setAdminDisplay(isAdmin);
    });
    socket.on('message', (message) => {
      console.log('SET MESSAGES ACTIVATE', message);
      setMessages([...messages, message]);
    });
    socket.on('roomData', ({ users }) => {
      setUsers({ users });
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  });

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };
  return (
    <div className="screenWrapper">
      {adminDisplay && <AdminPanel />}
      <div className="Movie" />
      <div className="Chat">
        <Chat
          name={name}
          room={room}
          setMessage={setMessage}
          sendMessage={sendMessage}
          message={message}
          messages={messages}
        />
      </div>
    </div>
  );
};

export default Screen;
