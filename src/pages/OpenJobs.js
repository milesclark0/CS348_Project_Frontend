import React, { useState, useEffect } from "react";
import { StatusCodes } from "http-status-codes";
import * as api from "../api/api";
import EmployeeProfile from "../objects/EmployeeProfile";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Stack,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell, TableContainer, tableCellClasses
} from "@mui/material";
import ManagerProfile from "../objects/ManagerProfile";
import {styled} from "@mui/material/styles";

const OpenJobs = (props) => {
  const navigate = useNavigate();
  const isLoggedIn = props.isLoggedIn;

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

  const formatPhoneNumber = (phoneNumberString) => {
        let cleaned = ("" + phoneNumberString).replace(/\D/g, "");
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return "(" + match[1] + ") " + match[2] + "-" + match[3];
        }
        return null;
    };

  //clears error message on input change
  useEffect(() => {
    getOpenJobs()
  }, []);

  const getOpenJobs = async () => {
    let response = await api.getOpenJobs();
    let data = await response.json();
    console.table(data)
    if (response.status === StatusCodes.OK) {

      setJobs(data);
    }
  };

  const handleAcceptJob = async (orderID) => {
    console.log(orderID, EmployeeProfile.getID())
    let args = {orderID: orderID, empID: EmployeeProfile.getID()}
    let response = await api.acceptJob(args)
    let data = await response.json()
    if (response.status === StatusCodes.OK) {
      //PRINT SUCCESS MESSAGE!
      getOpenJobs()
    }

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
      <Typography component="h1" variant="h5">
        Open Jobs
      </Typography>
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
              <StyledTableCell>Accept</StyledTableCell>
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
                  <TableCell><Button variant="outlined"
              color="secondary"
              onClick={() => handleAcceptJob(job.id)}>Accept</Button></TableCell>
                </StyledTableRow>
              );
            }): <StyledTableRow><StyledTableCell align="center" colSpan={9}>No Open Jobs</StyledTableCell></StyledTableRow>}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  );
};

export default OpenJobs;
