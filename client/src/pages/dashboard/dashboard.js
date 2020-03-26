import React, { useEffect } from "react";
import gsap from "gsap";
import "./dashboard.css";
function toPX(value) {
  return (
    (parseFloat(value) / 100) *
    (/vh/gi.test(value) ? window.innerHeight : window.innerWidth)
  );
}

function DashBoard(props) {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(".DashBegin", { width: toPX("100vw") }, 1); //blue screen
    tl.to(".dashTitle", { opacity: 1, duration: 1.3 }, "-=0.5"); //title comes in
    tl.to(".DashBegin", { x: toPX("100vw"), duration: 0.8 }, ">"); //bluescreen fade out
    /*  tl.to(".dashWrapper", { width: toPX("100vw") }, ">"); //actual dash in */
    tl.to(".menu", { width: toPX("50vw") }, "<"); //red div in
    tl.to(
      ".dashTitle",
      { top: toPX("88vh"), ease: "ease-out", duration: 1.2 },
      "+=0.3"
    ); //title falls down
    tl.to(".profileBtn", { display: "block" }, "-=1.2");
    tl.to(".RoomOptions", { display: "block" }, "-=1");
    tl.to("#createRoom", { display: "block", ease: "ease-out" }, ">"); // Room option 1 pop up
    tl.to("#joinRoom", { display: "inline", ease: "ease-out" }, "-=0.2"); //Room option 2 pop up
  });
  return (
    <div className="wrapper">
      <div className="DashBegin"></div>
      <main className="dashWrapper">
        <div className="menu">
          <div className="profileBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 23 25"
              light-dom-id="4"
            >
              <g transform="matrix(1.33333 0 0 -1.33333 0 25)" light-dom-id="4">
                <path
                  d="m 0,0 c 0.258,3.903 3.516,7 7.483,7 3.967,0 7.225,-3.097 7.483,-7 z m 2.983,12.5 c 0,2.481 2.019,4.5 4.5,4.5 2.481,0 4.5,-2.019 4.5,-4.5 0,-2.481 -2.019,-4.5 -4.5,-4.5 -2.481,0 -4.5,2.019 -4.5,4.5 m 7.022,-4.882 c 1.767,0.916 2.978,2.759 2.978,4.882 0,3.032 -2.467,5.5 -5.5,5.5 -3.033,0 -5.5,-2.468 -5.5,-5.5 0,-2.123 1.211,-3.966 2.978,-4.882 C 1.502,6.541 -1.017,3.31 -1.017,-0.5 V -1 h 17 v 0.5 c 0,3.81 -2.519,7.041 -5.978,8.118"
                  transform="translate(1 1)"
                  light-dom-id="4"
                ></path>
              </g>
            </svg>
          </div>
          <div className="RoomOptions">
            <span id="createRoom">Create Room</span>
            <br />
            <span id="joinRoom">Join Room</span>
          </div>
        </div>
        <div className="display"></div>
      </main>
      <h1 className="dashTitle">Sync</h1>
    </div>
  );
}

export default DashBoard;
