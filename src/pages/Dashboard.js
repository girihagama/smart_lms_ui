import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseConfigContext } from "../FirebaseConfigContext"; // Import context
import Spinner from "react-bootstrap/Spinner"; // Import loading spinner

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from storage

    if (!token) {
      console.log("No token found. Redirecting to login...");
      navigate("/", { replace: true }); // Redirect to login if no token
    } else {
      console.log("Token verified. Access granted.");
      setIsAuthenticated(true);
    }

    setIsLoading(false); // Stop loading after verification
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 Font-title-2">
      <p className="mt-3">SMART LIBRARY</p>
      <Spinner animation="border" variant="primary" />
      <p className="mt-3">Verifying access...</p>
    </div>
    );
  }

  if (!isAuthenticated) return null; // Prevent unauthorized rendering

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>Your content goes here...</p>
    </div>
  );
};

export default Dashboard;
