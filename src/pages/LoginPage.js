import React, { useState, useEffect } from "react";
import { StatusCodes } from "http-status-codes";
import { Link } from "react-router-dom";
import * as api from "../api/api";
import CustomerProfile from "../objects/CustomerProfile";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = props.isLoggedIn;

  //clears error message on input change
  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const login = async (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      return;
    }

    //Calls api
    let response = await api.login(username, password);
    let data = await response.json();
    if (response.status === StatusCodes.OK) {
      //Saves User Info
      console.log(data);
      CustomerProfile.setAll(
        data.id,
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
      setErrMsg(data.message);
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
          autoComplete="on"
          onChange={(e) => setPass(e.target.value)}
        ></input>
        <button onClick={(e) => login(e)}>login</button>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </form>
      {errMsg && <div style={{ color: "Red" }}>{errMsg}</div>}
    </div>
  );
};

export default LoginPage;
