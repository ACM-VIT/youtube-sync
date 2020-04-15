/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import gsap from 'gsap';
import './screen.css';

import Chat from '../../components/Chat/Chat';

function toPX(value) {
  return (
    (parseFloat(value) / 100)
    * (/vh/gi.test(value) ? window.innerHeight : window.innerWidth)
  );
}

let socket;


const AdminPanel = ({ setAdminDisplay, room }) => {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to('.adminPanel', {
      width: toPX('70vw'),
      ease: 'ease-in',
      duration: 1,
    }, 0);
  }, []);
  return (
    <>
      <div className="blur" />
      <div className="adminPanel">
        <div className="apTitle">
          <div className="dash" />
          <br />
          <span>
            ROOM ADMIN
            <br />
            PAGE
          </span>
          <br />
          <span className="apRoom">{room}</span>
        </div>
        <div>CONTROLS</div>
      </div>
    </>
  );
};

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
    <>
      {adminDisplay && <AdminPanel setAdminDisplay={setAdminDisplay} room={room} />}
      <div className="screenWrapper">
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
    </>
  );
};

export default Screen;
