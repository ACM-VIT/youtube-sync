import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { GoogleLogout } from "react-google-login";
import "./dashboard.css";
import cancel from "./cancel.svg";
import profile from "./profile.png";
function toPX(value) {
  return (
    (parseFloat(value) / 100) *
    (/vh/gi.test(value) ? window.innerHeight : window.innerWidth)
  );
}

function slideIn() {
  gsap.to(".whiteScreen", {
    width: toPX("75vw"),
    ease: "ease-in",
    duration: 0.5
  });
}

function slideOut() {
  gsap.to(".whiteScreen", {
    width: 0,
    ease: "ease-in",
    duration: 1
  });
  const whiteScreen = document.querySelector(".whiteScreen");
  whiteScreen.style = "padding:0";
}

const hrVeticalStyle = {
  transform: "rotate(90deg)",
  width: "33%",
  position: "relative",
  left: "23vw",
  top: "15vw"
};

const Profile = ({ changeBlur, showProfile }) => {
  const logout = () => {
    window.location.href = "/";
  };
  return (
    <>
      <img
        className="closeBtn"
        onClick={() => {
          slideOut();
          changeBlur("none");
          showProfile(false);
        }}
        src="https://img.icons8.com/ios/50/000000/close-window.png"
      />
      <img
        className="avatar"
        src={JSON.parse(sessionStorage.getItem("userYS")).imageUrl}
        alt=""
      />
      <br />
      <hr />
      <div className="profile">
        <span>Name</span> <br />
        <div className="universe">
          <div className="name">
            {JSON.parse(sessionStorage.getItem("userYS")).name.split(" ")[0]}
            <br />
            {JSON.parse(sessionStorage.getItem("userYS")).name.split(" ")[1]}
          </div>
        </div>
      </div>
      <hr style={hrVeticalStyle} />
      <div className="profileStats">
        <div className="stat">
          no of Syncs <br />
          <span>0</span>
        </div>
        <br />
        <div className="stat">
          joined <br />
          <span>4th March 2020</span>
        </div>
        <GoogleLogout
          clientId="403059120816-7q0nfehr1190g100vt65ms7qg7engls1.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="Logout"
            >
              Logout
            </button>
          )}
        />
      </div>
    </>
  );
};

const RoomOptions = ({ changeBlur, showProfile, showCR }) => {
  return (
    <main className="dashWrapper">
      <div className="menu">
        <div
          className="profileBtn"
          onClick={() => {
            changeBlur("inline");
            slideIn();
            showProfile(true);
            console.log("clcked");
          }}
        >
          <img src="./profile.svg" alt="" className="profileSvg" />
        </div>
        <div className="RoomOptions">
          <span
            id="createRoom"
            onClick={() => {
              changeBlur("inline");
              slideIn();
              showCR(true);
            }}
          >
            Create Room
          </span>
          <br />
          <span
            id="joinRoom"
            onClick={() => {
              changeBlur("inline");
              slideIn();
            }}
          >
            Join Room
          </span>
        </div>
      </div>
      <div className="display"></div>
    </main>
  );
};

const CreateRoom = ({ changeBlur, showCR }) => {
  return (
    <>
      <img
        className="closeBtn"
        onClick={() => {
          slideOut();
          changeBlur("none");
          showCR(false);
        }}
        src="https://img.icons8.com/ios/50/000000/close-window.png"
      />
    </>
  );
};

function DashBoard(props) {
  let [blur, changeBlur] = useState("none");
  let [profile, showProfile] = useState(false);
  let [createRoom, showCR] = useState(false);
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

  useEffect(() => {
    let mouseX, mouseY;
    let ww = window.innerWidth;
    let wh = window.innerHeight;
    let traX, traY;
    document
      .querySelector(".whiteScreen")
      .addEventListener("mouseover", (e) => {
        mouseX = e.pageX;
        mouseY = e.pageY;
        traX = (4 * mouseX) / 570 + 40;
        traY = (4 * mouseY) / 570 + 50;
        if (document.querySelector(".name")) {
          document.querySelector(
            ".name"
          ).style = `background-position:${traX}%${traY}%`;
        }
      });
  });

  return (
    <div className="wrapper">
      <div className="DashBegin"></div> {/* bluescreen */}
      <RoomOptions
        changeBlur={changeBlur}
        showProfile={showProfile}
        showCR={showCR}
      />
      <h1 className="dashTitle">Sync</h1>
      <div className="menuBlur" style={{ display: blur }}></div>
      <div className="whiteScreen">
        {profile && (
          <Profile changeBlur={changeBlur} showProfile={showProfile} />
        )}
        {createRoom && <CreateRoom />}
      </div>
    </div>
  );
}

export default DashBoard;
