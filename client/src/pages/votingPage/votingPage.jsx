/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';


import './votingPage.css';

import AddLink from './AddLink/AddLink';
import Vote from './Vote/Vote';
import Toast from './Toast/Toast';

const VotingPage = ({
  setAdminDisplay, room, url, setUrl, sendUrl, alSubmit, urls, upvote, toast, toastMsg,
}) => {
  const input = useRef();
  const exp1 = useRef();
  useEffect(() => {
    exp1.current.style.transform = 'translate(-50%,-50%) scale(0.0001)';
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(input.current.value);
    setAdminDisplay(false);
    console.log('alSubmit triggered');
  };
  return (
    <>
      {toast && <Toast toastMsg={toastMsg} />}
      <div ref={exp1} className="explosion" />
      <div className="adminPanel">
        <div className="apTitle">
          <div className="dash" />
          <span className="apRoom">{room}</span>
          <span>
            ROOM
            <br />
            SETUP
          </span>
        </div>
        {/*  <hr /> */}
        <AddLink
          handleSubmit={handleSubmit}
          url={url}
          setUrl={setUrl}
          sendUrl={sendUrl}
          input={input}
          alSubmit={alSubmit}
        />
        <div className="vote">
          {urls.length !== 0 ? <Vote urls={urls} upvote={upvote} /> : null}
        </div>
      </div>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
    </>
  );
};

export default VotingPage;
