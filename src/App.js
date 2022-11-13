import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CustomerProfile from "./objects/CustomerProfile";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeOptions } from "./objects/themeOptions";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(CustomerProfile.isLoggedIn());

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
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
