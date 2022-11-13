import React, { useState, useEffect } from "react";
import CustomerProfile from "../objects/CustomerProfile";
import "./HomePage.css";
import * as api from "../api/api";
import { StatusCodes } from "http-status-codes";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const HomePage = (props) => {
  const isLoggedIn = props.isLoggedIn;
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  //directs to login page if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  //gets orders from api
  useEffect(() => {
    const getOrders = async () => {
      let response = await api.getOrders(CustomerProfile.getID());
      let data = await response.json();
      if (response.status === StatusCodes.OK) {
        //Saves User Info
        console.log(data);
        setOrders(data);
      }
    };
    if (isLoggedIn) {
      getOrders();
    }
  }, [isLoggedIn]);
  console.log(orders);
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">Orders</Typography>
      <TableContainer component={Paper} sx={{ width: "500px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  {new Date(order.date_time).toDateString()}
                </TableCell>
                <TableCell>
                  {new Date(order.date_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </TableCell>
                <TableCell>{order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HomePage;
