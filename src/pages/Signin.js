import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock } from "react-icons/fa";

const Signin = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 w-100 Font-title-2"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <div
        className="card shadow-xl p-5 rounded w-100"
        style={{
          maxWidth: "500px",
          backgroundColor: "#fff",
          boxShadow: "0 10px 50px rgba(0, 180, 252, 0.2)",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: "700",
            color: "#0D3B66",
          }}
        >
          Smart Library
          <br />
          <small>Librarian Portal</small>
        </h2>

        {/* Centered Tabs */}
        <div className="d-flex justify-content-center pb-4">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "login" ? "active" : ""}`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "forget" ? "active" : ""}`}
                onClick={() => setActiveTab("forget")}
              >
                Forgot Password
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "activate" ? "active" : ""}`}
                onClick={() => setActiveTab("activate")}
              >
                Activate / Reset
              </button>
            </li>
          </ul>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "login" && (
            <form>
              <div className="mb-4">
                <label className="form-label">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <FaUser color="#0D3B66" />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <FaLock color="#0D3B66" />
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn w-100 py-2 gradient-btn">
                Login
              </button>
            </form>
          )}

          {activeTab === "forget" && (
            <form>
              <div className="mb-4">
                <label className="form-label">Enter your registered email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  required
                />
              </div>

              <button type="submit" className="btn w-100 py-2 gradient-btn">
                Send Reset Link
              </button>
            </form>
          )}

          {activeTab === "activate" && (
            <form>
              <div className="mb-4">
                <label className="form-label">Enter Activation Code</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter code"
                  required
                />
              </div>

              <button type="submit" className="btn w-100 py-2 gradient-btn">
                Activate Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;
