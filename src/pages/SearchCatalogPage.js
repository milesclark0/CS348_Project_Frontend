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



const SearchCatalogPage = (props) => {
    const isLoggedIn = props.isLoggedIn;
    const [items, setItems] = useState([]);

    const getItems = async () => {
        let response = await api.getSearchCatalog();
        let data = await response.json();
        if (response.status === StatusCodes.OK) {
        //Saves User Info
            console.log(data);
            setItems(data)
        }
    };

    useEffect(() => {
        getItems();
    }, []);

    return (
        <div>
            Welcome to the Search Page
        </div>
    );
}

export default SearchCatalogPage;
