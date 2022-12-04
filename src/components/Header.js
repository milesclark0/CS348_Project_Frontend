import React from "react";
import CustomerProfile from "../objects/CustomerProfile";
import { Link, useNavigate } from "react-router-dom";
import { Toolbar, AppBar, IconButton, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const Header = (props) => {
  const isLoggedIn = props.isLoggedIn;
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    //Clears customer data from memory
    CustomerProfile.clear();
    props.loginChange(CustomerProfile.isLoggedIn());
    navigate("/login");
  };

  const searchCatalogPageRedirect = () => {
    navigate("/SearchCatalogPage")
  }
  
  return (
    <AppBar position="static" color="primary" sx={{mb: '16px'}}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" onClick={() => navigate("/")}>
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          OrderThisChris
        </Typography>
        <Button onClick={searchCatalogPageRedirect} color="inherit">Search Catalog</Button>
        {isLoggedIn && <Button color="inherit" onClick={(e) => logout(e)}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
