import React from "react";
import CustomerProfile from "../objects/CustomerProfile";
import { Link, useNavigate } from "react-router-dom";
import { Toolbar, AppBar, IconButton, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ManagerProfile from "../objects/ManagerProfile";
import EmployeeProfile from "../objects/EmployeeProfile";

const Header = (props) => {
  const isLoggedIn = props.isLoggedIn;
  const isManager = ManagerProfile.isLoggedIn();
  const isEmployee = EmployeeProfile.isLoggedIn();
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();

    //Clears Current User From Logged In
    if (CustomerProfile.isLoggedIn()) {
      CustomerProfile.clear();
      props.loginChange(CustomerProfile.isLoggedIn());
    } else if (ManagerProfile.isLoggedIn()) {
      ManagerProfile.clear();
      props.loginChange(ManagerProfile.isLoggedIn());
    } else if (EmployeeProfile.isLoggedIn()) {
      EmployeeProfile.clear();
      props.loginChange(EmployeeProfile.isLoggedIn());
    }
    
    navigate("/login");
  };

  const searchCatalogPageRedirect = () => {
    navigate("/SearchCatalogPage")
  }
  
  return (
    <AppBar position="static" color="primary" sx={{mb: '16px'}}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" onClick={() => {
          if (isManager) {
            navigate("/ManagerHomePage");
          } else if (isEmployee) {
            navigate("/EmployeeHomePage")
          } else {
            navigate("/");
          }
        }}>
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          OrderThisChris
        </Typography>
        <Button onClick={searchCatalogPageRedirect} color="inherit">Search Catalog</Button>
        {isEmployee && <Button color="inherit" onClick={(e) => navigate("/openJobs")}>Open Jobs</Button>}
        {isManager && <Button color="inherit" onClick={(e) => navigate("/hire")}>Hire Driver</Button>}
        {isLoggedIn && <Button color="inherit" onClick={(e) => navigate("/profile")}>Profile</Button>}
        {isLoggedIn && <Button color="inherit" onClick={(e) => logout(e)}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
