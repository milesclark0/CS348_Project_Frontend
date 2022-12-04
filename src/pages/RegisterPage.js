import React, { useState, useEffect } from "react";
import { StatusCodes } from "http-status-codes";
import * as api from "../api/api";
import CustomerProfile from "../objects/CustomerProfile";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Stack, Button } from "@mui/material";

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
  }, [username, password, name, address, phone, birth_date]);

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
      setErrMsg(JSON.stringify(data));
      console.log(data);
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Enter Your Credentials
      </Typography>
      <Box component="form" onSubmit={register} noValidate sx={{ mt: 1 }}>
        <Stack spacing={2} direction="row">
          <TextField
            id="usernameTextBox"
            required
            fullWidth
            label="Username"
            autoComplete="username"
            error={errMsg.includes("username")}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            id="passwordTextBox"
            type="password"
            label="Password"
            required
            autoComplete="current-password"
            onChange={(e) => setPass(e.target.value)}
            error={errMsg.includes("password")}
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{mt:1}}>
          <TextField
            id="nameTextBox"
            required
            label="name"
            autoComplete="name"
            fullWidth
            onChange={(e) => setName(e.target.value)}
            error={errMsg.includes("name")}
          />
          <TextField
            id="addressTextBox"
            required
            fullWidth
            label="address"
            onChange={(e) => setAddress(e.target.value)}
            error={errMsg.includes("address")}
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{mt:1}}>
          <TextField
            id="phoneTextBox"
            required
            fullWidth
            label="phone"
            max={10}
            onChange={(e) => setPhone(e.target.value)}
            error={errMsg.includes("phone")}
          ></TextField>
          <TextField
            required
            fullWidth
            id="birthDateTextBox"
            type={"date"}
            onChange={(e) => setBirthDate(e.target.value)}
            error={errMsg.includes("birth_date")}
          ></TextField>
        </Stack>
        <Button
          sx={{ mt: 1, mb: 2 }}
          variant="contained"
          color="secondary"
          fullWidth
          onClick={(e) => register(e)}
        >
          Register
        </Button>
      </Box>
      {errMsg && !isLoggedIn && <div style={{ color: "Red" }}>{errMsg}</div>}
    </Box>
  );
};

export default LoginPage;
