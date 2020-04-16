/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable no-console */
import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import gsap from 'gsap';
import ReactPlayer from 'react-player';
import baseUrl from '../../baseUrl';
import './screen.css';

import Chat from '../../components/Chat/Chat';


function toPX(value) {
  return (
    (parseFloat(value) / 100)
    * (/vh/gi.test(value) ? window.innerHeight : window.innerWidth)
  );
}

let socket;


const AdminPanel = ({ setAdminDisplay, room, setUrl }) => {
  const submit = useRef();
  const input = useRef();
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to('.adminPanel', {
      width: toPX('70vw'),
      ease: 'ease-in',
      duration: 1,
    }, 0);
    /*  ytSearch('surfing').then((res) => console.log(res)); */
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tl = gsap.timeline();
    tl.to('.adminPanel', {
      width: 0,
      ease: 'ease-out',
      duration: 2,
    }, 0);
    setUrl(input.current.value);
    setAdminDisplay(false);
  };
  return (
    <>
      <div className="blur" />
      <div className="adminPanel">
        // title
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
        <hr />
        //form
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="url">YoutubeUrl</label>
            <br />
            <input name="url" type="url" ref={input} />
            <br />
            <button className="btn-c" type="submit" ref={submit}>

              <svg width="22px" height="17px" viewBox="-1 0 22 17">
                <path d="M16.9629797,7.00000372 L11.3176817,1.73105898 C10.9139311,1.35422502 10.8921108,0.721436142 11.2689447,0.317685466 C11.6457787,-0.0860652103 12.2785676,-0.107885516 12.6823183,0.268948448 L20.1823183,7.26894845 C20.6058939,7.66428574 20.6058939,8.3357217 20.1823183,8.73105898 L12.6823183,15.731059 C12.2785676,16.1078929 11.6457787,16.0860726 11.2689447,15.682322 C10.8921108,15.2785713 10.9139311,14.6457824 11.3176817,14.2689484 L16.9629797,9.00000372 L1,9.00000372 C0.44771525,9.00000372 -7.10542736e-15,8.55228847 -7.10542736e-15,8.00000372 C-7.10542736e-15,7.44771897 0.44771525,7.00000372 1,7.00000372 L16.9629797,7.00000372 Z" />
              </svg>

            </button>
          </form>
        </div>
      </div>
    </>
  );
};


const Screen = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [url, setUrl] = useState(null);
  const [adminDisplay, setAdminDisplay] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [player, initPlayer] = useState(null);
  const [duration, setDuration] = useState(0);
  const [playing, handlePlay] = useState(false);
  const ENDPOINT = `${baseUrl}/`;


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
    socket.on('playerHandler', ({ playing, duration }) => {
      if (!admin) {
        handlePlay(playing);
        setDuration(duration);
        player.seekTo(duration, 'seconds');
      } else {
        console.log('reached');
      }
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  });

  useEffect(() => {
    socket.emit('handlePlayPause', { playing, duration }, (err) => {
      if (err) {
        console.log(err);
        alert(err);
      }
    });
  }, [duration, playing]);


  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  const play = () => {
    console.log('onPlay');
    console.log(player);
    const timestamp = player.getCurrentTime();
    setDuration(timestamp);
    handlePlay(true);
  };

  const pause = () => {
    console.log('onPause');
    console.log(player);
    const timestamp = player.getCurrentTime();
    setDuration(timestamp.toString());
    handlePlay(false);
  };
  const ref = (pl) => {
    initPlayer(pl);
  };


  return (
    <>
      {adminDisplay && <AdminPanel setAdminDisplay={setAdminDisplay} room={room} setUrl={setUrl} />}
      <div className="screenWrapper">
        <div className="Movie">
          <ReactPlayer
            ref={ref}
            url={url || null}
            width="100%"
            height="100%"
            onPlay={play}
            onPause={pause}
          />
        </div>
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
      <link rel="stylesheet" href="https://cdn.plyr.io/3.5.10/plyr.css" />
    </>
  );
};

export default Screen;
