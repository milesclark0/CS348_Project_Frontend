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

  


const SearchCatalogPage = (props) => {
    const [items, setItems] = useState([]);


    const getItems = async () => {
        let response = await api.getSearchCatalog();
        let data = await response.json();
        if (response.status === StatusCodes.OK) {
        //Saves User Info
            //console.log(data);
            setItems(data)
        }
    };

    useEffect(() => {
        getItems();
    }, []);

    const possibleTypes = [...new Set(items.map(item => item.type))];
    const defaultType = "All Types";
    const type = [defaultType].concat(possibleTypes)

    const [query, setQuery] = useState("");
    const [selectedType, setType] = useState("");
    const [selectedPrice, setPrice] = useState("");
    const [selectedRating, setRating] = useState("");
    const [selectedAvailability, setAvailability] = useState("");

    const handleFormSubmit = (event) => {
        event.preventDefault()
    }

    const handleInput = (e)=>{
        setPrice( e.target.value );
    }


    function checkType(selectedType) {
        if (selectedType === "All Types") {
            return ""
        } else {
            return selectedType
        }
    }


    // make reset button change all setFilters()

    const resetFilters = () => {
        setType("");
        setPrice("");
        setQuery("");
        setRating("All Ratings");
        setAvailability("Any Availability");
    }


    return (
        <div>
            <h1>
                Welcome to the Search Page
            </h1>
            <form onSubmit={handleFormSubmit}>
                <input type="text" placeholder="Enter an Item Name..." name="query" onChange={event => setQuery(event.target.value)} value={query}/>
                <input type="text" placeholder="Enter a price..." onInput={ handleInput } value={selectedPrice} />
                <select id="ratingFilter" placeholder="Rating" onChange={(e)=>setRating(e.target.value)} value={selectedRating}>
                    <option>{"All Ratings"}</option>
                    <option>{1}</option>
                    <option>{2}</option>
                    <option>{3}</option>
                    <option>{4}</option>
                    <option>{5}</option>
                </select>
                <select id="availableFilter" placeholder="Available" onChange={(e)=>setAvailability(e.target.value)} value={selectedAvailability}>
                    <option>{"Any Availability"}</option>
                    <option>{"In Stock"}</option>
                </select>
                <select id="typeFilter" onChange={(e)=>setType(e.target.value)} value={selectedType}>
                    {type.map((op)=><option>{op}</option>)} 
                </select>
                <button onClick={resetFilters}>Reset</button>
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
                        ).filter((item) => 
                            item.type.includes(checkType(selectedType))
                        ).filter((item) => 
                            selectedPrice === "" ? item.price: item.price <= parseFloat(selectedPrice)
                        ).filter((item) => 
                            selectedRating === "All Ratings" || selectedRating === "" ? item.rating: item.rating >= parseFloat(selectedRating)
                        ).filter((item) => 
                            selectedAvailability === "In Stock" ? item.count: item.count >= 0
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
