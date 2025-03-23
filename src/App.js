import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FirebaseConfigProvider } from "./FirebaseConfigContext";  // Import FirebaseConfigProvider
import './App.css';

import Auth from "./pages/Auth";

function App() {
  return (
    <FirebaseConfigProvider> {/* Wrap the application with FirebaseConfigProvider */}
      <Router>
        <div
          style={{
            backgroundColor: "#252525", // Set the entire screen's background to black
            color: "white", // Set text color to white for contrast
            minHeight: "100vh", // Ensure the background covers the entire screen
          }}
        >
          <Routes>
            <Route path="/" element={<Auth />} />
          </Routes>
        </div>
      </Router>
    </FirebaseConfigProvider>
  );
}

export default App;
