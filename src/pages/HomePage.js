import React, { useState, useEffect } from "react";
import CustomerProfile from "../objects/CustomerProfile";
import "./HomePage.css";
import * as api from "../api/api";
import { Add, Delete } from "@mui/icons-material";
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
  Stack,
  IconButton,
  Button,
  Modal,
  TextField,
  Autocomplete,
  InputAdornment,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import Order from "../objects/Order";
import { tableCellClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

const HomePage = (props) => {
  const isLoggedIn = props.isLoggedIn;
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { item_id: 0, name: "", quantity: 1 },
  ]);
  const [tip, setTip] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [orderCount, setOrderCount] = useState(5);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      borderColor: theme.palette.secondary.main,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  //TODO: Add useEffect to get items from api

  const [items1, setItems] = useState([]);

  const getItems = async () => {
    let response = await api.getSearchCatalog();
    let data = await response.json();
    if (response.status === StatusCodes.OK) {
      //Saves User Info
      setItems(data);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const items = items1.map((t) => ({
    item_id: t.id,
    name: t.name,
    price: parseFloat(t.price),
    count: t.count
  }));


  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

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

  // debugger;
  const CartItem = (props) => (
    <Stack spacing={2} direction="row" mb={2}>
      <Autocomplete
        options={items.map((item) => item.name)}
        value={props.item.name}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Item" />}
        onChange={(e, value) => {
          const tempCartItems = [...cartItems];
          tempCartItems[props.index].name = value;
          const foundItem = items.find((name) => name.name === value)?.item_id;
          if (foundItem) {
            tempCartItems[props.index].item_id = foundItem;
          } else {
            return;
          }
          setCartItems(tempCartItems);
          setTotal(calculateTotal());
        }}
      />
      <TextField
        sx={{ width: "100px" }}
        label="Quantity"
        type={"number"}
        value={props.item.quantity}
        onChange={(event) => {
          const tempCartItems = [...cartItems];
          if (event.target.value < 1) {
            tempCartItems[props.index].quantity = 1;
          } else if (event.target.value > 100) {
            tempCartItems[props.index].quantity = 100;
          } else {
            tempCartItems[props.index].quantity = event.target.value;
          }
          setCartItems(tempCartItems);
          setTotal(calculateTotal());
        }}
      ></TextField>
      <IconButton
        disableTouchRipple
        size="large"
        onClick={() => {
          const tempCartItems = [...cartItems];
          const itemToDeletePrice =
            items.find(
              (item) => item.item_id === tempCartItems[props.index].item_id
            )?.price * tempCartItems[props.index].quantity;
          console.log(itemToDeletePrice);
          tempCartItems.splice(props.index, 1);
          setCartItems(tempCartItems);
          setTotal(total - itemToDeletePrice);
        }}
      >
        <Delete />
      </IconButton>
    </Stack>
  );

  //handlers
  const handleOrderSubmit = async () => {
    Order.setAll(CustomerProfile.getID(), null, total, tip);
    Order.setItems(refactorItems());   
    let validQuantity = true;
    cartItems.forEach((cartItem) => {
      items.forEach((item) => {
        if (cartItem.item_id === item.item_id) {
          if (parseFloat(cartItem.quantity) > item.count) {
            validQuantity = false;
            console.log('invalid order')
          }
        }
      });
    });
    

  

    //call api to create order
    if (Order.isValid() && validQuantity) {
      let response = await api.createOrder(Order.getObject());
      let data = await response.json();
      if (response.status === StatusCodes.OK) {
        setOrders([data, ...orders]);
        setOpen(false);
        setErrMsg("");
        setSuccessMsg("Order successfully created!");
        setCartItems([{ name: "", quantity: 1 }]);
        setTotal(0);
        setTip(0); 
      } else {
        console.log(data);
        setErrMsg(data);
        setSuccessMsg("");
      }
    } else {
      setErrMsg("Requested Quanity Exceeds Current Stock!")
      console.log("invalid");
    }
  };

  //helpers
  //Calculates total price of order based on items in cart
  function calculateTotal() {
    let total = 0;
    cartItems.forEach((cartItem) => {
      items.forEach((item) => {
        if (cartItem.name === item.name) {
          total += cartItem.quantity * item.price;
          console.log(cartItem.quantity);
        }
      });
    });
    return Number(total.toFixed(2));
  }


  //Refactors items in cart to match api
  function refactorItems() {
    let tempItems = [];
    cartItems.forEach((cartItem) => {
      tempItems.push({
        item_id: cartItem.item_id,
        cart_count: cartItem.quantity,
      });
    });
    return tempItems.filter((item) => item.item_id !== 0);
  }

  

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography variant="h6">Create Order</Typography>
          {cartItems.map((cartItem, index) => {
            return <CartItem item={cartItem} key={index} index={index} />;
          })}
          <Button
            variant="outlined"
            color="secondary"
            endIcon={<Add />}
            onClick={() => {
              setCartItems([
                ...cartItems,
                { item_id: 0, name: "", quantity: 1 },
              ]);
            }}
          >
            Add item
          </Button>
          <TextField
            sx={{ marginLeft: 24.2, width: "100px", marginBottom: 4 }}
            value={tip}
            label="Tip"
            inputProps={{ min: 0, max: 100, step: 1.0 }}
            type={"number"}
            onChange={(e) => {
              setTip(e.target.valueAsNumber);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          ></TextField>
          <Typography>Total: ${Number((total + tip).toFixed(2))}</Typography>
          <Stack
            spacing={2}
            direction="row"
            mt={2}
            sx={{ position: "absolute", bottom: 8, right: 8 }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleOrderSubmit()}
            >
              Order
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Stack spacing={2} direction="row" width={"500px"}>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Orders
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          endIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Create Order
        </Button>
      </Stack>
      {successMsg && (
        <Alert
          severity="success"
          sx={{ width: "500px", marginTop: 2 }}
          onClose={() => setSuccessMsg("")}
        >
          {successMsg}
        </Alert>
      )}
      {errMsg && (
        <Alert
          severity="error"
          sx={{ width: "500px", marginTop: 2 }}
          onClose={() => setErrMsg("")}
        >
          {errMsg}
        </Alert>
      )}
      <TableContainer component={Paper} sx={{ width: "1000px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Time</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => {
              if (index + 1 > orderCount) {
                return null;
              }
              return (
                <StyledTableRow
                  key={order.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {new Date(order.date_time).toDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(order.date_time).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>{order.total}</TableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {orderCount < orders.length && (
        <Button onClick={() => setOrderCount(orderCount + 5)}>
          Show More...
        </Button>
      )}
      {orderCount >= orders.length && orders.length > 5 && (
        <Button onClick={() => setOrderCount(5)}>Collapse</Button>
      )}
    </Box>
  );
};

export default HomePage;
