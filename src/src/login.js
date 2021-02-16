import React, { useState, useEffect } from "react";
import "./login.css";
import "./notification.css";

async function _onGetInformations(value, setLogin, setError, setnotif) {
  setLogin(true);
  setError("");
  await fetch(value + '/user/notification/message?format=json', {
      method: 'GET',
  })
  .then(res => res.json())
  .then((res) => {
    if (Object.keys(res).length !== 0) {
      setnotif(res);
    } else {
      setError("Aucun nouveau message");
    }
  })
  .catch(() => {
    setError("Une érreur c'est produite");
  });
}

async function _onGetLog(value, setLogin, setError, setnotif) {
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
      _onGetInformations(value, setLogin, setError, setnotif);
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
  const [notif, setnotif] = useState({});

  useEffect(() => {
    if (localStorage.getItem('keyAuth') !== null) {
      _onGetInformations(localStorage.getItem('keyAuth'), setLogin, setError, setnotif);
    }
  }, [])

  if (!login) {
    return (
      <div className="loginPage">
        <img className="imgLogo" alt="epi" src="epitech-baseline.png"/>
        <span className="notifProvider">Epitech Notifier</span>
        <span className="titleLink"><a href="https://intra.epitech.eu/admin/autolog" target="_blank">lien</a> auto-login epitech :</span>
        <input className="inputLink" type="text" placeholder="intra.epitech.eu/auth-{YOURID}" value={value} onChange={(e) => { setValue(e.target.value) }} />
        <button className="buttonLink" onClick={() => { _onGetLog(value, setLogin, setError, setnotif) }}>login</button>
        <span className="error">{error}</span>
      </div>
    );
  } else if (login) {
    const data = Array.from(notif);
    return (
      <div className="notifPage">
        <div className="navbar">
          <img className="imgProfile" alt="student" src={localStorage.getItem('keyAuth') + localStorage.getItem('picture')}/>
          <span className="bonjour">Bonjour {localStorage.getItem('firstname')}</span>
          <img className="buttonLogout" alt="tuogol" src="logout.png" onClick={() => { setLogin(false); setError(""); localStorage.removeItem('keyAuth') }}/>
        </div>
        <div>
          <div className="nonew">{error}</div>
          {
              data.map(
                (i) => <div>
                    <div className="notification" dangerouslySetInnerHTML={{__html: i.title}} />
                    <hr class="rounded" className="divider" />
                  </div>
              )
          }
        </div>
      </div>
    )
  }
}
export default Login;