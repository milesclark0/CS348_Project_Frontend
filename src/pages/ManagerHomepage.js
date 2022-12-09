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
  Rating,
} from "@mui/material";
import { Box } from "@mui/system";
import Order from "../objects/Order";
import { tableCellClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import ManagerProfile from "../objects/ManagerProfile";

const ManagerHomepage = (props) => {
  const isLoggedIn = props.isLoggedIn;
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

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

  const getEmployees = async () => {
    let response = await api.getEmployees(ManagerProfile.getID());
    let data = await response.json();
    if (response.status === StatusCodes.OK) {
      //Saves User Info
      console.log(data);
      setEmployees(data);
    }
  };

  const handleDelete = async (index) => {
    const employee = employees[index];
    let response = await api.fireEmployee(employee.id);
    if (response.status === StatusCodes.OK) {
        //Saves User Info
        console.log("Employee deleted");
        const newEmployees = [...employees]
        newEmployees.splice(index, 1);
        setEmployees(newEmployees);
        }
    };

    const formatPhoneNumber = (phoneNumberString) => {
        let cleaned = ("" + phoneNumberString).replace(/\D/g, "");
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return "(" + match[1] + ") " + match[2] + "-" + match[3];
        }
        return null;
    };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">Manage Employees</Typography>
      <TableContainer component={Paper} sx={{ width: "1000px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Zip</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Hire Date</StyledTableCell>
              <StyledTableCell>Birth Date</StyledTableCell>
              <StyledTableCell>Average Rating</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => {
              return (
                <StyledTableRow
                  key={employee.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.username}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.zip}</TableCell>
                  <TableCell>{formatPhoneNumber(employee.phone)}</TableCell>
                  <TableCell>{employee.hire_date}</TableCell>
                  <TableCell>{employee.birth_date}</TableCell>
                  <TableCell><Rating readOnly precision={0.5} value={employee.avg_rating}></Rating></TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleDelete(index)}>
                      <Delete/>
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default ManagerHomepage;
