import React, { useState, useEffect } from "react";
import { StatusCodes } from "http-status-codes";
import * as api from "../api/api";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import CustomerProfile from "../objects/CustomerProfile";
import ManagerProfile from "../objects/ManagerProfile";
import EmployeeProfile from "../objects/EmployeeProfile";
import "./ProfilePage.css";
import {styled} from "@mui/material/styles";
import {
    Table,
    TableContainer,
    TableHead,
    Paper,
    TableCell,
    TableRow,
    Button,
    TextField,
    FormLabel,
    TableBody,
  } from "@mui/material";
  import { tableCellClasses } from "@mui/material";
import { Style } from "@mui/icons-material";


const ProfilePage = (props) => {

    const [password, setPass] = useState("");
    const [password2, setPass2] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const isLoggedIn = props.isLoggedIn;
    const navigate = useNavigate();
    const isCustomer = CustomerProfile.isLoggedIn() === true;
    const isManager = ManagerProfile.isLoggedIn() === true;
    const isEmployee = EmployeeProfile.isLoggedIn() === true;

    var tusername = "";
    var tname = "";
    var tphone = "";
    var tbirth = "";
    
    // Customer
    var tpoints = "";
    var tcreate = "";

    //Employee
    var thire = "";
    var tmanager = "";
    var tzip = "";

    //Manager
    //tzip
    //thire

    if (isCustomer) {
        tusername = CustomerProfile.getUsername();
        tname = CustomerProfile.getName();
        tphone = CustomerProfile.getPhone();
        tbirth = CustomerProfile.getBirthDate();
        tpoints = CustomerProfile.getPoints();
        tcreate = CustomerProfile.getCreationDate();
    } else if (isManager) {
        tusername = ManagerProfile.getUsername();
        tname = ManagerProfile.getName();
        tphone = ManagerProfile.getPhone();
        tbirth = ManagerProfile.getBirthDate();
        thire = ManagerProfile.getHireDate();
        tzip = ManagerProfile.getZip();
    } else if (isEmployee) {
        tusername = EmployeeProfile.getUsername();
        tname = EmployeeProfile.getName();
        tphone = EmployeeProfile.getPhone();
        tbirth = EmployeeProfile.getBirthDate();
        thire = EmployeeProfile.getHireDate();
        tmanager = EmployeeProfile.getManager();
        tzip = EmployeeProfile.getZip();
    }
    

     //clears error message on input change
    useEffect(() => {
        setErrMsg("");
    }, [password2, password]);

    const changePassword = async (e) => {
        e.preventDefault();
        let username = "";
        if (CustomerProfile.isLoggedIn()) {
            username = CustomerProfile.getUsername();
        } else if (ManagerProfile.isLoggedIn()) {
            username = ManagerProfile.getUsername();
        } else if (EmployeeProfile.isLoggedIn()) {
            username = EmployeeProfile.getUsername();
        }
        
        //Calls API function 'changePassword()'
        let response = await api.changePassword(username, password, password2);
        let data = await response.json();
        if (response.status === StatusCodes.OK) {
          //Saves User Info
          console.log("Changed Password Successfully");
          if (ManagerProfile.isLoggedIn()) {
            navigate("/ManagerHomepage");
          } else if (EmployeeProfile.isLoggedIn()) {
            navigate("/");
          } else {
            navigate("/");
          }
        } else {
          setErrMsg(data.message);
          console.log(data);
        }
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
    {
        isManager === true &&
        <FormLabel
          sx={{
            fontSize: 35,
            fontWeight: 'bold',
            marginBottom: 2
          }}
        >
        Manager Dashboard
        </FormLabel>
    }
    {
        isEmployee === true &&
        <FormLabel
          sx={{
            fontSize: 35,
            fontWeight: 'bold',
            marginBottom: 2
          }}
        >
        Driver Dashboard
        </FormLabel>
    }
    {
        isCustomer === true &&
        <FormLabel
          sx={{
            fontSize: 35,
            fontWeight: 'bold',
            marginBottom: 2
          }}
        >
        Customer Dashboard
        </FormLabel>
    }
    


    <Box>
      <h2><i>Personal Information</i></h2>
        <TableContainer component={Paper} sx={{ width: "1000px", mt: 2}}>
          <Table sx={{borderColor: "black"}}>
            <TableHead>
              <TableRow>
                {/* Common */}
                <StyledTableCell>Username</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Phone</StyledTableCell>
                <StyledTableCell>Birthday</StyledTableCell>

                {/* Not Common */}
                { 
                    isCustomer === true &&
                    (
                      <>
                        <StyledTableCell>Points</StyledTableCell>
                        <StyledTableCell>Creation Date</StyledTableCell>
                      </>
                    )
                }
                { 
                    isEmployee === true &&
                    (
                    <>
                    <StyledTableCell>Hire Date</StyledTableCell>
                    <StyledTableCell>Zip</StyledTableCell> 
                    </>
                    )
                }
                { 
                    isManager === true &&
                    (
                      <>
                        <StyledTableCell>Hire Date</StyledTableCell>
                        <StyledTableCell>Zip</StyledTableCell> 
                      </>
                    )
                }
              </TableRow>
            </TableHead>
            <TableBody>
            <StyledTableRow>
                {/* Common */}
                <TableCell>{tusername}</TableCell>
                <TableCell>{tname}</TableCell>
                <TableCell>{tphone}</TableCell>
                <TableCell>{tbirth}</TableCell>

                {/* Not Common */}
                { 
                    isCustomer === true &&
                    (
                      <>
                        <TableCell>{tpoints}</TableCell> 
                        <TableCell>{tcreate}</TableCell>
                      </>
                    )
                }
                { 
                    isEmployee === true &&
                    (
                      <>
                        <TableCell>{thire}</TableCell> 
                        <TableCell>{tzip}</TableCell> 
                      </>
                    )
                }
                {
                    isManager === true &&
                    (
                      <>
                         <TableCell>{thire}</TableCell>
                         <TableCell>{tzip}</TableCell>
                      </>
                    )
                }
            </StyledTableRow>
               </TableBody>
          </Table>
        </TableContainer>
      </Box>

    <br></br><br></br><br></br>
    <div>Change Your Password</div>
    <Box component="form" onSubmit={changePassword} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="New Password"
          type="password"
          autoFocus
          onChange={(e) => setPass(e.target.value)}
          error={errMsg !== ""}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Confirm Password"
          type="password"
          id="password2"
          autoComplete="current-password"
          onChange={(e) => setPass2(e.target.value)}
          error={errMsg !== ""}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color="secondary"
        >
          Change Password
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePage;
