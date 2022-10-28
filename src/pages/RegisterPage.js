import React, { useState, useEffect } from "react";
import { StatusCodes } from "http-status-codes";
import * as api from "../api/api";
import CustomerProfile from "../objects/CustomerProfile";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const isLoggedIn = props.isLoggedIn;

  //clears error message on input change
  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const register = async (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      //TODO route to homepage
      return;
    }

    //Calls api
    let response = await api.register(
      username,
      password,
      name,
      address,
      phone,
      birth_date
    );
    let data = await response.json();
    if (response.status === StatusCodes.OK) {
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
      setErrMsg("");
      props.loginChange(CustomerProfile.isLoggedIn());
      navigate("/");
    } else {
      setErrMsg(JSON.stringify(data));
      console.log(data);
    }
  };

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
          autoComplete="new-password"
          onChange={(e) => setPass(e.target.value)}
        ></input>
        <input
          id="nameTextBox"
          type={"text"}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          id="addressTextBox"
          type={"text"}
          placeholder="address"
          onChange={(e) => setAddress(e.target.value)}
        ></input>
        <input
          id="phoneTextBox"
          type={"text"}
          placeholder="phone"
          max={10}
          onChange={(e) => setPhone(e.target.value)}
        ></input>
        <input
          id="birthDateTextBox"
          type={"date"}
          onChange={(e) => setBirthDate(e.target.value)}
        ></input>
        <button onClick={(e) => register(e)}>Register</button>
      </form>
      {errMsg && !isLoggedIn && <div style={{ color: "Red" }}>{errMsg}</div>}
    </div>
  );
};

export default LoginPage;
