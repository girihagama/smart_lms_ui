import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation, Link } from "react-router-dom"; // Keep this import
import { Breadcrumb, Spinner } from "react-bootstrap";

import { FirebaseConfigContext } from "../FirebaseConfigContext"; // Import context

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom"; // Make sure Routes and Route are imported

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const location = useLocation();
  // Generate breadcrumb paths dynamically
  const pathnames = location.pathname.split("/").filter((x) => x);

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

        {/* Breadcrumbs */}
        <Breadcrumb
          className="p-4 Font-title-2"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            return (
              <Breadcrumb.Item
                style={{ textDecoration: "none" }}
                key={name}
                /* linkAs={Link} */ /* linkProps={{ to: routeTo }} */ active={
                  index === pathnames.length - 1
                }
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>

        <div className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
          <Outlet className="p-4" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
