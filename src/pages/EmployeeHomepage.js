import React, { useState, useEffect } from "react";
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
import EmployeeProfile from "../objects/EmployeeProfile";
import * as api from "../api/api";
import ManagerProfile from "../objects/ManagerProfile";
import {Delete} from "@mui/icons-material";

const EmployeeHomepage = (props) => {
  const isLoggedIn = props.isLoggedIn;
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

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

  const getJobs = async () => {
    let response = await api.getJobs(EmployeeProfile.getID());
    let data = await response.json();
    if (response.status === StatusCodes.OK) {
      //Saves User Info
      //console.log(data);
      console.log(data)
      setJobs(data);
    }
  };
/*
  const handleDelete = async (index) => {
    const employee = employees[index];
    let response = await api.fireEmployee(employee.id);
    if (response.status === StatusCodes.OK) {
        //Saves User Info
        //console.log("Employee deleted");
        const newEmployees = [...employees]
        newEmployees.splice(index, 1);
        setEmployees(newEmployees);
        }
    };
    */

    const formatPhoneNumber = (phoneNumberString) => {
        let cleaned = ("" + phoneNumberString).replace(/\D/g, "");
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return "(" + match[1] + ") " + match[2] + "-" + match[3];
        }
        return null;
    };

  useEffect(() => {
    getJobs();
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
      <Typography variant="h5">Manage Jobs</Typography>
      <TableContainer component={Paper} sx={{ width: "1000px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Order Id</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell>Tip</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.length > 0 ? jobs.map((job, index) => {
              return (
                <StyledTableRow
                  key={job.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{job.id}</TableCell>
                  <TableCell>{job.name}</TableCell>
                  <TableCell>{job.username}</TableCell>
                  <TableCell>{job.address}</TableCell>
                  <TableCell>{formatPhoneNumber(job.phone)}</TableCell>
                  <TableCell>${job.total}</TableCell>
                  <TableCell>${job.tip}</TableCell>
                </StyledTableRow>
              );
            }): <StyledTableRow><StyledTableCell align="center" colSpan={9}>No Employees</StyledTableCell></StyledTableRow>}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  );
};
export default EmployeeHomepage;


/*
<TableCell>
                    <IconButton onClick={(e) => handleDelete(index)}>
                      <Delete/>
                    </IconButton>
                  </TableCell>
 */