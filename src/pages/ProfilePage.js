import React, { useState, useEffect } from "react";
import { StatusCodes } from "http-status-codes";
import * as api from "../api/api";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import {  Button, TextField, FormLabel } from "@mui/material";
import CustomerProfile from "../objects/CustomerProfile";
import ManagerProfile from "../objects/ManagerProfile";
import EmployeeProfile from "../objects/EmployeeProfile";
import Header from "../components/Header";


const ProfilePage = (props) => {

    const [password, setPass] = useState("");
    const [password2, setPass2] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const isLoggedIn = props.isLoggedIn;
    const navigate = useNavigate();
    const isManager = ManagerProfile.isLoggedIn() === true;
    const isEmployee = EmployeeProfile.isLoggedIn() === true;

    

     //clears error message on input change
    useEffect(() => {
        setErrMsg("");
    }, [password2, password]);

    const changePassword = async (e) => {
        e.preventDefault();
        let username = "";
        if (CustomerProfile.isLoggedIn()) {
            username = CustomerProfile.getUsername();
        } else if (ManagerProfile.isLoggedIn()) {
            username = ManagerProfile.getUsername();
        } else if (EmployeeProfile.isLoggedIn()) {
            username = EmployeeProfile.getUsername();
        }
        
        //Calls API function 'changePassword()'
        let response = await api.changePassword(username, password, password2);
        let data = await response.json();
        if (response.status === StatusCodes.OK) {
          //Saves User Info
          console.log("Changed Password Successfully");
          if (ManagerProfile.isLoggedIn()) {
            navigate("/ManagerHomepage");
          } else if (EmployeeProfile.isLoggedIn()) {
            navigate("/");
          } else {
            navigate("/");
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
    {
        isManager === true &&
        <FormLabel
          sx={{
            fontSize: 35,
            fontWeight: 'bold',
            marginBottom: 2
          }}
        >
        Manager Mode
        </FormLabel>
    }
        {
        isEmployee === true &&
        <FormLabel
          sx={{
            fontSize: 35,
            fontWeight: 'bold',
            marginBottom: 2
          }}
        >
        Driver Dashboard
        </FormLabel>
    }
    <div>Change Your Password</div>
    <Box component="form" onSubmit={changePassword} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="New Password"
          type="password"
          autoFocus
          onChange={(e) => setPass(e.target.value)}
          error={errMsg !== ""}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Confirm Password"
          type="password"
          id="password2"
          autoComplete="current-password"
          onChange={(e) => setPass2(e.target.value)}
          error={errMsg !== ""}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color="secondary"
        >
          Change Password
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePage;
