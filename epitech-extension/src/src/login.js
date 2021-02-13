import React, { useState, useEffect } from "react";
import "./login.css";

// https://intra.epitech.eu/auth-20a0502b5fd9e6f889f681468717df1707329e12

async function _onGetInformations(value, setLogin, setError) {
  setLogin(true);
  setError("");
  await fetch(value + '/user/notification/message?format=json', {
      method: 'GET',
  })
  .then(res => res.json())
  .then((res) => {
    console.log(res);
    console.log("lll "+res.length);
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
      <div>
        <img className="imglogo" alt="epi" src="epitech-baseline.png"/>
        <span>Notifications provider</span>
        <span><a href="https://intra.epitech.eu/admin/autolog">link</a> auto-login epitech :</span>
        <input type="text" value={value} onChange={(e) => { setValue(e.target.value) }} />
        <button onClick={() => { _onGetLog(value, setLogin, setError) }}>login</button>
        <span>{error}</span>
      </div>
    );
  } else if (login) {
    return (
      <div>
        <div>
          <img alt="student" src={localStorage.getItem('keyAuth') + localStorage.getItem('picture')}/>
          <span>Bonjour {localStorage.getItem('firstname')}</span>
          <button onClick={() => { setLogin(false); localStorage.removeItem('keyAuth') }}>logout</button>
        </div>
      </div>
    )
  }
}
export default Login;