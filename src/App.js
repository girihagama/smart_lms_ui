import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';

import Signin from "./pages/Signin";
import Reset from "./pages/Reset";
import Forget from "./pages/Forget";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div 
      style={{
        backgroundColor: "#252525", // Set the entire screen's background to black
        color: "white", // Set text color to white for contrast
        minHeight: "100vh", // Ensure the background covers the entire screen
      }}
      >
        <Routes>
          <Route path="/" element={<Signin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;