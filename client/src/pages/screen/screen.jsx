/* eslint-disable max-len */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable no-console */
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import gsap from "gsap";
import ReactPlayer from "react-player";
import baseUrl from "../../baseUrl";
import "./screen.css";

import Chat from "../../components/Chat/Chat";
import VotingPage from "../votingPage/votingPage";

let socket;

const Room = ({
  adminDisplay,
  setAdminDisplay,
  name,
  room,
  url,
  setUrl,
  ref,
  play,
  pause,
  setMessage,
  sendMessage,
  message,
  messages,
}) => (
  <>
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
  </>
);

const Screen = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [adminDisplay, setAdminDisplay] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [player, initPlayer] = useState(null);
  const [duration, setDuration] = useState(0);
  const [playing, handlePlay] = useState(false);
  const [toast, showToast] = useState(false);
  const [toastName, setToastName] = useState("");
  const [toastUrl, setToastUrl] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [toastHits, settoastHits] = useState(0);
  const [nou, setnou] = useState(0);
  const [roomDisplay, changeRD] = useState(false);
  const [urlChoice, setUC] = useState("");
  const ENDPOINT = `${baseUrl}/`;
  const alSubmit = useRef();

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
  }, [name, room, ENDPOINT]);

  useEffect(() => {
    socket.on("adminCheck", ({ isAdmin }) => {
      console.log("SET ADMIN ACTIVATE", isAdmin);
      setAdmin(isAdmin);
      setAdminDisplay(isAdmin);
    });
    socket.on("initUrls", (urls) => {
      setUrls(urls);
      console.log("INIT URLS ACTIVATE", urls);
    });
    socket.on("message", (message) => {
      console.log("SET MESSAGES ACTIVATE", message);
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users, roomStatus, urls }) => {
      console.log("ROOM DATA ", roomStatus, urls);
      setUsers({ users });
      setnou(users.length);
      setUrls(urls);
      if (roomStatus !== roomDisplay) {
        changeRD(roomStatus);
      }
    });
    socket.on("playerHandler", ({ playing, duration }) => {
      console.log("DURATION ACTIVATE", playing, duration);
      if (!admin) {
        handlePlay(playing);
        setDuration(duration);
        player.seekTo(duration, "seconds");
      } else {
        console.log("reached");
      }
    });
    socket.on("clientUrl", (dbUrl) => {
      console.log("urls updated");
      console.log("SET URL ACTIVATE");
      setUrls([...urls, dbUrl]);
    });
    socket.on("upvoteToast", ({ name, selUrl }) => {
      console.log("upvote toast activate", name, selUrl);
      showToast(true);
      setToastName(name);
      setToastUrl(selUrl);
      setToastMsg(`${name} has selected \n ${selUrl}`);
    });
    socket.on("roomDisplay", (roomDisplay) => {
      console.log("ROOM DISPLAY ACTIVATE", roomDisplay);
      changeRD(roomDisplay);
    });
    socket.on("toastHandler", (toastHits) => {
      console.log("TOAST ACTIVATE ", toastHits);
      settoastHits(toastHits);
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  });

  useEffect(() => {
    console.log("SETURL", url, admin);
    if (admin) {
      socket.emit("setUrl", url, (err) => {
        if (err) {
          console.log(err);
          alert(err);
        }
      });
    }
  }, [url, admin]);

  useEffect(() => {
    if (toastHits === 0) return;
    socket.emit("toastHit", toastHits, (err) => {
      if (err) {
        console.log(err);
        alert(err);
      }
    });
  }, [toastHits]);

  useEffect(() => {
    socket.emit("handlePlayPause", { playing, duration }, (err) => {
      if (err) {
        console.log(err);
        alert(err);
      }
    });
  }, [duration, playing]);

  useEffect(() => {
    if (urls.length === 0) {
      return;
    }
    const upvotes = [];
    urls.forEach((ele) => upvotes.push(ele.upvotes));
    const max = Math.max.apply(null, upvotes);
    const index = upvotes.findIndex((ele) => ele === max);
    console.log(upvotes, max, index, urls);
    socket.emit(
      "changeRD",
      { roomDisplay, urlChoice: urls[index].url },
      (err) => {
        if (err) {
          console.log(err);
          alert(err);
        }
      }
    );
    setUC(urls[index].url);
  }, [roomDisplay]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const sendUrl = (event) => {
    event.preventDefault();
    if (url) {
      socket.emit("sendUrl", { url, room }, () => {
        setUrl("");
        alSubmit.current.style.backgroundColor = "#096C37";
      });
    }
  };

  const play = () => {
    console.log("onPlay");
    console.log(player);
    // const timestamp = player.getCurrentTime();
    // setDuration(timestamp);
    // handlePlay(true);
  };

  const pause = () => {
    console.log("onPause");
    console.log(player);
    const timestamp = player.getCurrentTime();
    setDuration(timestamp.toString());
    handlePlay(false);
  };
  const ref = (pl) => {
    initPlayer(pl);
  };

  const upvote = (changeST, selUrl) => {
    changeST("Selection Done");
    if (!selUrl) return alert("selurl not found");
    settoastHits((hit) => hit + 1);
    return socket.emit("upvote", { selUrl, room }, (err) => {
      if (err) {
        console.log(err);
        alert(err);
      }
    });
  };

  const setRD = () => {
    console.log("CLICKED TOAST");
    changeRD((v) => !v);
  };

  return (
    <>
      {!roomDisplay ? (
        <VotingPage
          setRD={setRD}
          admin={admin}
          nou={nou}
          toastHits={toastHits}
          toastMsg={toastMsg}
          toast={toast}
          toastName={toastName}
          toastUrl={toastUrl}
          upvote={upvote}
          urls={urls}
          url={url}
          setUrl={setUrl}
          sendUrl={sendUrl}
          room={room}
          alSubmit={alSubmit}
        />
      ) : (
        <Room
          adminDisplay={adminDisplay}
          setAdminDisplay={setAdminDisplay}
          name={name}
          room={room}
          url={urlChoice}
          setUrl={setUrl}
          ref={ref}
          play={play}
          pause={pause}
          setMessage={setMessage}
          sendMessage={sendMessage}
          message={message}
          messages={messages}
        />
      )}
    </>
  );
};

export default Screen;
