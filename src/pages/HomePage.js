import React, { useState, useEffect } from "react";
import CustomerProfile from "../objects/CustomerProfile";
import "./HomePage.css"
import * as api from "../api/api"
import { StatusCodes } from "http-status-codes";

const HomePage = (props) => {
  const isLoggedIn = props.isLoggedIn;
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrders = async () => {
    let response = await api.getOrders(CustomerProfile.getID())
    let data = await response.json();
    if (response.status === StatusCodes.OK) {
      //Saves User Info
      console.log(data);
      setOrders(data)
    }
  }
    getOrders()
  }, []); 
  console.log(orders)
  return (
    <div>
      {isLoggedIn && 
      <div>
        <div class="centeredText">
          Logged in as {CustomerProfile.getUsername()} with id {CustomerProfile.getID()}
        </div>
        <table class="styled-table">
          <tr>
            <th>Name:</th>
            <td>{CustomerProfile.getName()}</td>
          </tr>
          <tr>
            <th>Address:</th>
            <td>{CustomerProfile.getAddress()}</td>
          </tr>
          <tr>
            <th>Phone:</th>
            <td>{CustomerProfile.getPhone()}</td>
          </tr>
          <tr>
            <th>Points:</th>
            <td>{CustomerProfile.getPoints()}</td>
          </tr>
        </table>
        
        <div class="centeredText">Order History</div>
        <table class="styled-table">
          <thead>
            <tr>        
              <th>Date</th>
              <th>Items</th>
              <th>Order ID</th>
              <th>Total</th>
              <th>Driver ID</th>
              <th>Tip</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>--</td>
              <td>--</td>
              <td>--</td>
              <td>--</td>
              <td>--</td>
              <td>--</td>
              <td>--</td>
            </tr>
          </tbody>
        </table>

      </div>     
      }
    </div>
  );
};

export default HomePage;
