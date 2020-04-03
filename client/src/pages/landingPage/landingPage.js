import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import Loader from "./loader";

import "./landingPage.css";
import BannerImage from "../../static/images/youtubeBG.jpg";

const responseGoogle = (response) => {
  return new Promise((resolve, reject) => {
    try {
      sessionStorage.setItem("userYS", JSON.stringify(response.profileObj));
      console.log(response);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

const userDB = () => {
  return new Promise(async (resolve, reject) => {
    const userObj = JSON.parse(sessionStorage.getItem("userYS"));
    if (!userObj) reject();
    let user = {
      name: userObj.name
    };
    console.log(JSON.stringify(user));
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      await sessionStorage.setItem("user", JSON.stringify(data));
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};

const login = async (response) => {
  console.log(response);
  const tasks = [responseGoogle(response), userDB()];
  Promise.all(tasks)
    .then((window.location.href = "/dashboard"))
    .catch((err) => console.error(err));
};

const googleFail = (response) => {
  console.error(response);
  alert("FAIL");
};

function LandingPage(props) {
  let [loading, changeLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect triggered");
    setTimeout(() => {
      changeLoading(false);
      console.log(loading);
    }, 5000);
  });

  return (
    <div className="landingWrapper">
      <div className="title">
        <h1>
          <span>Youtube</span> <br /> SYNC
        </h1>
      </div>
      {loading ? (
        <Loader className="menu"></Loader>
      ) : (
        <div className="googleButtonWrapper">
          <GoogleLogin
            className="googleBtn"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="btn striped-shadow white"
              >
                <span> Login</span>
              </button>
            )}
            clientId="403059120816-7q0nfehr1190g100vt65ms7qg7engls1.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={login}
            onFailure={googleFail}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      )}
    </div>
  );
}

export default LandingPage;
