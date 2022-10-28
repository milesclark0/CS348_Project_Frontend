import React, { useState, useEffect } from "react"
import { StatusCodes } from "http-status-codes"
import * as api from "../api/api"
import CustomerProfile from "../objects/CustomerProfile"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPass] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(CustomerProfile.isLoggedIn())

  //clears error message on input change
  useEffect(() => {
    setErrMsg("")
  }, [username, password])

  const login = async (e) => {
    e.preventDefault()
    if (isLoggedIn) {
      //TODO route to homepage
      return;
    }

    //Calls api
    let response = await api.login(username, password);
    if (response.status === StatusCodes.OK) {
      let data = await response.json()
      //Saves User Info
      CustomerProfile.setAll(
        data.username,
        data.name,
        data.address,
        data.phone,
        data.birth_date,
        data.points,
        data.creation_date
      );
      setErrMsg("")
    } else {
      setErrMsg(response.message)
    }
    setIsLoggedIn(CustomerProfile.isLoggedIn())
  };

  const logout = (e) => {
    e.preventDefault();
    //Clears customer data from memory
    CustomerProfile.clear();
    setIsLoggedIn(CustomerProfile.isLoggedIn())

    //resets text fields
    document.getElementById("usernameTextBox").value = ""
    document.getElementById("passwordTextBox").value = ""
    setUsername("")
    setPass("")
  }
  return (
    
    <div>
      Enter Your Credentials
      <form>
        <input
          id="usernameTextBox"
          type={"text"}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
        id="passwordTextBox"
          type={"password"}
          placeholder="password"
          onChange={(e) => setPass(e.target.value)}
        ></input>
        <button onClick={(e) => login(e)}>login</button>
        <button onClick={(e) => logout(e)}>logout</button>
      </form>
      {isLoggedIn && <div>Logged in as {CustomerProfile.getUsername()}</div>}
      {errMsg && !isLoggedIn && <div style={{ color: "Red" }}>{errMsg}</div>}
    </div>
  );
};

export default LoginPage;
