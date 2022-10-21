import React, { useState, useEffect } from "react";
import { StatusCodes } from "http-status-codes";
import * as api from "../api/api";

const LoginPage = () => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");


  const login = async (e) => {
    e.preventDefault()

    //Calls api 
    let response = await api.login(username, password)
    if (response.status === StatusCodes.OK) {
    let data = await response.json()
    setUser(data)
    console.log(data);
    } else {
        console.error("error logging in");
        setUser(undefined)
    }
  
  }
  return (
    
    <div>
      Enter Your Credentials
      <form onSubmit={e => login(e)
      }>
        <input
          type={"text"}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          type={"password"}
          placeholder="password"
          onChange={(e) => setPass(e.target.value)}
        ></input>
        <button type="submit">login</button>
      </form>
      {user && <div>{user.username}</div>}
      {!user && <div>credentials invalid!</div>}
    </div>
  );
};

export default LoginPage;
