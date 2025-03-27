import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import Navbar from "./components/Navbar";
import { UserProvider } from "./contexts/UserContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated on component mount
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Function to handle login
  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider>
      <div className="App">
        <UserProvider>
          {isAuthenticated && <Navbar onLogout={handleLogout} />}
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={
                  !isAuthenticated ? (
                    <Login onLogin={handleLogin} />
                  ) : (
                    <Navigate to="/users" />
                  )
                }
              />
              <Route
                path="/users"
                element={isAuthenticated ? <UserList /> : <Navigate to="/" />}
              />
              <Route
                path="/users/:id/edit"
                element={isAuthenticated ? <EditUser /> : <Navigate to="/" />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <ToastContainer position="bottom-right" />
        </UserProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;