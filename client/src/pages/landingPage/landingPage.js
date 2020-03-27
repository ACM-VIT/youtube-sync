import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import Loader from "./loader";

import "./landingPage.css";
import BannerImage from "../../static/images/youtubeBG.jpg";

const responseGoogle = (response) => {
  sessionStorage.setItem("userYS", JSON.stringify(response.profileObj));
  console.log(response.profileObj);
  window.location.href = "/dashboard";
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
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      )}
    </div>
  );
}

export default LandingPage;
