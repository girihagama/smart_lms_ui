import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { FirebaseConfigProvider } from "./FirebaseConfigContext"; // Import FirebaseConfigProvider
import './App.css';

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard"; // Import the dashboard page
import Logout from "./pages/Logout"; // Import the dashboard page

function App() {
  // Check if token exists in local storage
  const token = localStorage.getItem("token");

  return (
    <FirebaseConfigProvider>
      <Router>
        <div
          style={{
            backgroundColor: "#252525", // Set the entire screen's background to black
            color: "white", // Set text color to white for contrast
            minHeight: "100vh", // Ensure the background covers the entire screen
          }}
        >
          <Routes>
            {/* If token exists, redirect to Dashboard, otherwise show Auth */}
            <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Auth />} />
            <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/logout" element={<Logout/>}/>
          </Routes>
        </div>
      </Router>
    </FirebaseConfigProvider>
  );
}

export default App;