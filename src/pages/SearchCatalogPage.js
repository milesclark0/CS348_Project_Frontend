import React, { useState, useEffect } from "react";
import CustomerProfile from "../objects/CustomerProfile";
import "./SearchCatalogPage.css";
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
  Button,
  useStepContext,
} from "@mui/material";
import { Box } from "@mui/system";



const SearchCatalogPage = (props) => {
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

    const [query, setQuery] = useState("");

    const handleFormSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <div>
            <h1>
                Welcome to the Search Page
            </h1>
            <form onSubmit={handleFormSubmit}>
                <input type="text" placeholder="Enter an Item Name..." name="query" onChange={event => setQuery(event.target.value)} value={query}/>
            </form>
            <div>
                <Table class="styled-table">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th>Available</th>
                            <th>Item Type</th>
                        </tr>
                        {items.filter((item) =>
                            item.name.toLowerCase().includes(query.toLowerCase())
                        ).map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>${item.price}</td>
                                <td>{item.rating}</td>
                                <td>{item.count}</td>
                                <td>{item.type}</td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </div>
        </div>
        
    );
}

export default SearchCatalogPage;
