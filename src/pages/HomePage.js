import React from "react";
import CustomerProfile from "../objects/CustomerProfile";

const HomePage = (props) => {
  const isLoggedIn = props.isLoggedIn;

  return (
    <div>
      {isLoggedIn && <div>Logged in as {CustomerProfile.getUsername()}</div>}
    </div>
  );
};

export default HomePage;
