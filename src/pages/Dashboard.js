import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Keep this import
import Spinner from "react-bootstrap/Spinner"; // Import loading spinner

import { FirebaseConfigContext } from "../FirebaseConfigContext"; // Import context

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Summary from "./Summary";
import BooksAdd from "./Book";
import BooksManage from "./Book";
import MembersAdd from "./Member";
import MembersList from "./Member";
import TransactionsIssue from "./Transaction";
import TransactionsReturn from "./Transaction";
import { Routes, Route } from "react-router-dom"; // Make sure Routes and Route are imported

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
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flexGrow: 1, marginLeft: "250px" }}>
        <Header />

        <Routes>
          {/* Define your Routes here */}
          <Route path="/dashboard" element={<Summary />} />
          <Route path="/dashboard/books/add" element={<BooksAdd />} />
          <Route path="/dashboard/books/manage" element={<BooksManage />} />
          <Route path="/dashboard/members/add" element={<MembersAdd />} />
          <Route path="/dashboard/members/list" element={<MembersList />} />
          <Route
            path="/dashboard/transactions/issue"
            element={<TransactionsIssue />}
          />
          <Route
            path="/dashboard/transactions/return"
            element={<TransactionsReturn />}
          />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
