/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

import './votingPage.css';

function toPX(value) {
  return (
    (parseFloat(value) / 100)
    * (/vh/gi.test(value) ? window.innerHeight : window.innerWidth)
  );
}


const VotingPage = ({ setAdminDisplay, room, setUrl }) => {
  const submit = useRef();
  const input = useRef();
  const exp1 = useRef();
  useEffect(() => {
    exp1.current.style.transform = 'translate(-50%,-50%) scale(0.0001)';
    /*  exp1.current.style.borderRadius = '50%'; */
    /*  setTimeout(() => {
      exp1.current.style.display = 'none';
    }, 2500); */
    /* tl.to('.explosion', {
      display: 'none',
      opacity: 0,
    }, '>'); */
    /*  ytSearch('surfing').then((res) => console.log(res)); */
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    /* const tl = gsap.timeline();
    tl.to('.adminPanel', {
      width: 0,
      ease: 'ease-out',
      duration: 2,
    }, 0); */
    setUrl(input.current.value);
    setAdminDisplay(false);
  };
  return (
    <>
      <div ref={exp1} className="explosion" />
      <div className="adminPanel">
        // title first div
        <div className="apTitle">
          <div className="dash" />
          <span className="apRoom">{room}</span>
          <span>
            ROOM
            <br />
            SETUP
          </span>
        </div>
        <hr />
        <form className="AddLink" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="url">YoutubeUrl</label>
          <br />
          <input name="url" type="url" ref={input} />
          <br />

        </form>
        <button className="btn-c" type="submit" ref={submit}>

          <svg width="22px" height="17px" viewBox="-1 0 22 17">
            <path d="M16.9629797,7.00000372 L11.3176817,1.73105898 C10.9139311,1.35422502 10.8921108,0.721436142 11.2689447,0.317685466 C11.6457787,-0.0860652103 12.2785676,-0.107885516 12.6823183,0.268948448 L20.1823183,7.26894845 C20.6058939,7.66428574 20.6058939,8.3357217 20.1823183,8.73105898 L12.6823183,15.731059 C12.2785676,16.1078929 11.6457787,16.0860726 11.2689447,15.682322 C10.8921108,15.2785713 10.9139311,14.6457824 11.3176817,14.2689484 L16.9629797,9.00000372 L1,9.00000372 C0.44771525,9.00000372 -7.10542736e-15,8.55228847 -7.10542736e-15,8.00000372 C-7.10542736e-15,7.44771897 0.44771525,7.00000372 1,7.00000372 L16.9629797,7.00000372 Z" />
          </svg>

        </button>
        <div />
      </div>
    </>
  );
};

export default VotingPage;
