import React from "react";
import CustomerProfile from "../objects/CustomerProfile";
import { useNavigate } from "react-router-dom";

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
  return (
    <div>
      <h1>OrderThisChris</h1>
      {isLoggedIn && <button onClick={(e) => logout(e)}>logout</button>}
    </div>
  );
};

export default Header;
