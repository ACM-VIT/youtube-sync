/* eslint-disable new-cap */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import gsap from 'gsap';
import toPX from '../../../toPX';
import './Toast.css';


function Toast({ toastMsg }) {
  useEffect(() => {
    const tl = new gsap.timeline();
    tl.set('.Toast', { width: 0 }, 0);
    tl.to('.Toast', { width: toPX('28vw'), duration: 1 }, '>');
  });
  return (
    <div className="Toast">
      <div className="toastIcon" />
      <div className="toastContent">
        <span>
          {toastMsg}
          <br />
          <em>
            Waiting for others
            <span className="dot" id="one">.</span>
            <span className="dot" id="two">.</span>
            <span className="dot" id="three">.</span>
          </em>
        </span>
      </div>
    </div>
  );
}


export default Toast;
