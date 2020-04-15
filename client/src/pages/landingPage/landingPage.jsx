/* eslint-disable no-alert */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import Loader from './loader';

import './landingPage.css';


const responseGoogle = (response) => new Promise((resolve, reject) => {
  try {
    sessionStorage.setItem('userYS', JSON.stringify(response.profileObj));
    sessionStorage.setItem('authYS', JSON.stringify(response.tc));
    console.log(response);
    resolve();
  } catch (err) {
    reject(err);
  }
});

// eslint-disable-next-line no-async-promise-executor
const userDB = () => new Promise(async (resolve, reject) => {
  const userObj = JSON.parse(sessionStorage.getItem('userYS'));
  if (!userObj) reject();
  const user = {
    name: userObj.name,
  };
  console.log(JSON.stringify(user));
  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-type': 'application/json' },
    });
    const data = await response.json();
    await sessionStorage.setItem('user', JSON.stringify(data));
    resolve(data);
  } catch (err) {
    reject(err);
  }
});

const login = async (response) => {
  console.log(response);
  const tasks = [responseGoogle(response), userDB()];
  Promise.all(tasks)
    .then((/* console.log('DEBUG') */window.location.href = '/dashboard'))
    .catch((err) => console.error(err));
};

const googleFail = (response) => {
  console.error(response);
  alert('FAIL');
};

function LandingPage() {
  const [loading, changeLoading] = useState(true);

  useEffect(() => {
    console.log('useEffect triggered');
    setTimeout(() => {
      changeLoading(false);
      console.log(loading);
    }, 5000);
  });

  return (
    <div className="landingWrapper">
      <div className="title">
        <h1>
          <span>Youtube</span>
          {' '}
          <br />
          {' '}
          SYNC
        </h1>
      </div>
      {loading ? (
        <Loader className="menu" />
      ) : (
        <div className="googleButtonWrapper">
          <GoogleLogin
            className="googleBtn"
            render={(renderProps) => (
              <button
                type="submit"
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
            cookiePolicy="single_host_origin"
            scope="https://www.googleapis.com/auth/youtube"
          />
        </div>
      )}
    </div>
  );
}

export default LandingPage;
