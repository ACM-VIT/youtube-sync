/* eslint-disable new-cap */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import gsap from 'gsap';
import toPX from '../../../toPX';
import './Toast.css';

function Toast({ toastName, toastUrl }) {
  useEffect(() => {
    const tl = new gsap.timeline();
    tl.to('.Toast', { width: toPX('10vw'), duration: 1 }, 0);
  });
  return (
    <div className="Toast">
      <span>
        {toastName}
        <br />
        {toastUrl}
      </span>
    </div>
  );
}


export default Toast;
