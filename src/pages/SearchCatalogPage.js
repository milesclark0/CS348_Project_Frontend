import React, { useState, useEffect } from "react";
import CustomerProfile from "../objects/CustomerProfile";
import "./SearchCatalogPage.css";
import * as api from "../api/api";
import { StatusCodes } from "http-status-codes";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
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
  Select,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import { tableCellClasses } from "@mui/material";

const SearchCatalogPage = (props) => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    let response = await api.getSearchCatalog();
    let data = await response.json();
    if (response.status === StatusCodes.OK) {
      //Saves User Info
      //console.log(data);
      setItems(data);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const possibleTypes = [...new Set(items.map((item) => item.type))];
  const defaultType = "All Types";
  const type = [defaultType].concat(possibleTypes);
  const ratings = [
    "All Ratings",
    "1 Star",
    "2 Stars",
    "3 Stars",
    "4 Stars",
    "5 Stars",
  ];
  const availability = ["Any Availability", "In Stock", "Out of Stock"];

  const [query, setQuery] = useState("");
  const [selectedType, setType] = useState(type[0]);
  const [selectedPrice, setPrice] = useState("");
  const [selectedRating, setRating] = useState(ratings[0]);
  const [selectedAvailability, setAvailability] = useState(availability[0]);

  const handleInput = (e) => {
    setPrice(e.target.value);
  };

  function checkType(selectedType) {
    if (selectedType === "All Types") {
      return "";
    } else {
      return selectedType;
    }
  }

  // make reset button change all setFilters()

  const resetFilters = () => {
    setType(type[0]);
    setPrice("");
    setQuery("");
    setRating(ratings[0]);
    setAvailability(availability[0]);
  };

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

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Search Catalog
      </Typography>
      <Box
        component="form"
        onSubmit={(e) => e.preventDefault()}
        noValidate
        sx={{ mt: 3 }}
      >
        <Stack spacing={2} direction="row">
          <TextField
            label="Filter by name"
            placeholder="Enter an Item Name..."
            name="query"
            onChange={(event) => setQuery(event.target.value)}
            value={query}
          />
          <TextField
            label="Filter by Price"
            placeholder="Enter a price..."
            sx={{ width: 125 }}
            onInput={handleInput}
            value={selectedPrice}
          />
          <TextField
            select
            label="Filter by Rating"
            sx={{ width: 125, textAlign: "left" }}
            onChange={(e) => setRating(e.target.value)}
            value={selectedRating}
          >
            {ratings.map((r) => (
              <MenuItem value={r}>{r}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Filter by Availability"
            placeholder="Available"
            onChange={(e) => setAvailability(e.target.value)}
            value={selectedAvailability}
          >
            {availability.map((op) => (
              <MenuItem value={op}>{op}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Filter by Type"
            select
            onChange={(e) => setType(e.target.value)}
            value={selectedType}
          >
            {type.map((op) => (
              <MenuItem value={op}>{op}</MenuItem>
            ))}
          </TextField>
          <Button variant="outlined" color="secondary" onClick={resetFilters}>
            Reset
          </Button>
        </Stack>
      </Box>
      <Box>
        <TableContainer component={Paper} sx={{ width: "1000px", mt: 2 }}>
          <Table sx={{borderColor: "black"}}>
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>Rating</StyledTableCell>
                <StyledTableCell>Available</StyledTableCell>
                <StyledTableCell>Item Type</StyledTableCell>
              </TableRow>
            </TableHead>
            {items
              .filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
              )
              .filter((item) => item.type.includes(checkType(selectedType)))
              .filter((item) =>
                selectedPrice === ""
                  ? item.price
                  : item.price <= parseFloat(selectedPrice)
              )
              .filter((item) =>
                selectedRating === "All Ratings" || selectedRating === ""
                  ? item.rating
                  : item.rating >= parseFloat(selectedRating[0])
              )
              .filter((item) => {
                if (selectedAvailability === "Any Availability") {
                  return item;
                } else if (selectedAvailability === "In Stock") {
                  return item.count > 0;
                } else {
                  return item.count === 0;
                }
              })
              .map((item, index) => {
                if (index < 11) {
                  return (
                    <StyledTableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>${item.price}</TableCell>
                      <TableCell>{item.rating}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>{item.type}</TableCell>
                    </StyledTableRow>
                  );
                }
              })}
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default SearchCatalogPage;
