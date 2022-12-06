import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CustomerProfile from "./objects/CustomerProfile";
import ProfilePage from "./pages/ProfilePage";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeOptions } from "./objects/themeOptions";
import SearchCatalogPage from "./pages/SearchCatalogPage";
import ManagerProfile from "./objects/ManagerProfile";
import EmployeeProfile from "./objects/EmployeeProfile";
import HirePage from "./pages/HirePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(CustomerProfile.isLoggedIn() || ManagerProfile.isLoggedIn() || EmployeeProfile.isLoggedIn());
 
  //Miles this is whats wrong ^^^ and below
  // I was originally going to use a variable to determine what type of account was loggined in so we could display stuff accordingly, such as 'Hire New Driver' which
  // only the ManagerProfile should be able to see. 
 
  const loginChange = (value) => {
    setIsLoggedIn(value);
  };

  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Header loginChange={loginChange} isLoggedIn={isLoggedIn} />
          <Routes>
            <Route
              path="/"
              exact
              element={
                <HomePage loginChange={loginChange} isLoggedIn={isLoggedIn} />
              }
            />
            <Route
              path="/login"
              exact
              element={
                <LoginPage loginChange={loginChange} isLoggedIn={isLoggedIn} />
              }
            />
            <Route
              path="/register"
              exact
              element={
                <RegisterPage
                  loginChange={loginChange}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/profile"
              exact
              element={
                <ProfilePage
                />
              }
            />
            <Route
              path="/hire"
              exact
              element={
                <HirePage
                />
              }
            />
            <Route
              path="/SearchCatalogPage"
              exact
              element={
                <SearchCatalogPage
                  loginChange={loginChange}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
