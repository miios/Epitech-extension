import React, { useState, useEffect } from "react";
import "./login.css";
import "./notification.css";

async function _onGetInformations(value, setLogin, setError) {
  setLogin(true);
  setError("");
  await fetch(value + '/user/notification/message?format=json', {
      method: 'GET',
  })
  .then(res => res.json())
  .then((res) => {
    if (Object.keys(res).length !== 0) {
      console.log(res);
      res.map((notification) => {
        console.log(notification.user.picture);
        console.log(notification.title);
        console.log(notification.title);
      })
    } else {
      console.log("Aucun nouveau message");
    }
  })
  .catch(() => {
    setError("Une érreur c'est produite");
  });
}

async function _onGetLog(value, setLogin, setError) {
  setError("");
  await fetch(value + '/user?format=json', {
    method: 'GET',
  })
  .then(res => res.json())
  .then((res) => {
    if (res.error) {
      setError(res.error);
    } else {
      localStorage.setItem('keyAuth', value);
      localStorage.setItem('picture', res.picture);
      localStorage.setItem('firstname', res.firstname);
      _onGetInformations(value, setLogin, setError);
    }
  })
  .catch(() => {
    setError("Une érreur c'est produite");
  });
}

function Login() {
  const [value, setValue] = useState("");
  const [login, setLogin] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem('keyAuth') !== null) {
      _onGetInformations(localStorage.getItem('keyAuth'), setLogin, setError);
    }
  }, [])

  if (!login) {
    return (
      <div className="loginPage">
        <img className="imgLogo" alt="epi" src="epitech-baseline.png"/>
        <span className="notifProvider">Notifications provider</span>
        <span className="titleLink"><a href="https://intra.epitech.eu/admin/autolog" target="_blank">link</a> auto-login epitech :</span>
        <input className="inputLink" type="text" placeholder="intra.epitech.eu/auth-{YOURID}" value={value} onChange={(e) => { setValue(e.target.value) }} />
        <button className="buttonLink" onClick={() => { _onGetLog(value, setLogin, setError) }}>login</button>
        <span className="error">{error}</span>
      </div>
    );
  } else if (login) {
    return (
      <div className="notifPage">
        <div className="navbar">
          <img className="imgProfile" alt="student" src={localStorage.getItem('keyAuth') + localStorage.getItem('picture')}/>
          <span className="bonjour">Bonjour {localStorage.getItem('firstname')}</span>
          <img className="buttonLogout" alt="tuogol" src="logout.png" onClick={() => { setLogin(false); localStorage.removeItem('keyAuth') }}/>
        </div>
        <span>NOTIFIICA</span>
      </div>
    )
  }
}
export default Login;