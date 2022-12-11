import React, { useState, useEffect } from "react";
import { StatusCodes } from "http-status-codes";
import { Link } from "react-router-dom";
import * as api from "../api/api";
import CustomerProfile from "../objects/CustomerProfile";
import ManagerProfile from "../objects/ManagerProfile";
import { useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/system";
import { Avatar, Button, FormControlLabel, InputAdornment, TextField, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import EmployeeProfile from "../objects/EmployeeProfile";


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
      if (data.user_type === "User") {
        CustomerProfile.setAll(
          data.id,
          data.username,
          data.name,
          data.address,
          data.phone,
          data.birth_date,
          data.points,
          data.creation_date,
          data.user_type
        );
        setErrMsg("");
        props.loginChange(CustomerProfile.isLoggedIn());
        navigate("/");

      } else if (data.user_type === "Manager") {
        ManagerProfile.setAll(
          data.id,
          data.username,
          data.name,
          data.zip,
          data.phone,
          data.birth_date,
          data.hire_date,
          data.user_type
        );
        setErrMsg("");
        props.loginChange(ManagerProfile.isLoggedIn());
        navigate("/ManagerHomepage");
      
        } else if (data.user_type === "Employee") {
          EmployeeProfile.setAll(
            data.id,
            data.username,
            data.name,
            data.phone,
            data.birth_date,
            data.zip,
            data.hire_date,
            data.avg_rating
          );
          setErrMsg("");
          props.loginChange(EmployeeProfile.isLoggedIn());
          navigate("/EmployeeHomepage");
        }
    } else {
      setErrMsg(data.message);
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
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          autoComplete="username"
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
          error={errMsg !== ""}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => setPass(e.target.value)}
          error={errMsg !== ""}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Button
          href="/register"
          fullWidth
          variant="outlined"
          sx={{ mt: 1, mb: 2 }}
        >
          Register
        </Button>
      </Box>
      {errMsg && <div style={{ color: "Red" }}>{errMsg}</div>}
    </Box>
  );
};

export default LoginPage;
