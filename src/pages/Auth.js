import React, { useState } from "react";
import { FaUser, FaLock, FaStar } from "react-icons/fa";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to show error messages
  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 5000); // Auto-hide after 5 seconds
  };

  //handle login
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    alert("Email: " + email + "\nPassword: " + password);

    // Check if email and password are valid
    if (email === " [email protected]" && password === "password") {
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } else {
      // Show error message
      showError("Invalid credentials. Please try again!");
    }
  }

  //handle forget password
  const handleForget = (e) => {
    e.preventDefault();
    const email = e.target[0].value;

    alert("Email: " + email);

    // Check if email is valid
    if (email === " [email protected]") {
      // Show success message
      showError("Reset link sent to your email!");
    } else {
      // Show error message
      showError("Invalid email. Please try again!");
    }
  }

  //handle activate / reset
  const handleActivate = (e) => {
    e.preventDefault();
    const otp = e.target[0].value;
    const password = e.target[1].value;

    alert("OTP: " + otp + "\nPassword: " + password);

    // Check if OTP and password are valid
    if (otp === "123456" && password) {
      // Show success message
      showError("Account activated successfully!");
    } else {
      // Show error message
      showError("Invalid OTP. Please try again!");
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 w-100 Font-title-2"
    >
      <div
        className="card shadow-xl p-5 rounded w-100"
        style={{
          maxWidth: "500px",
          backgroundColor: "#fff",
          boxShadow: "0 10px 50px rgba(0, 180, 252, 0.2)",
        }}
      >
        <h2 className="text-center mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: "700", color: "#0D3B66" }}>
          Smart Library
          <br />
          <small>Librarian Portal</small>
        </h2>

        {/* Centered Tabs */}
        <div className="d-flex justify-content-center pb-4">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button className={`nav-link ${activeTab === "login" ? "active" : ""}`} onClick={() => setActiveTab("login")}>
                Login
              </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === "forget" ? "active" : ""}`} onClick={() => setActiveTab("forget")}>
                Forgot Password
              </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === "activate" ? "active" : ""}`} onClick={() => setActiveTab("activate")}>
                Activate / Reset
              </button>
            </li>
          </ul>
        </div>

        {/* Error Message Box */}
        {errorMessage && (
          <div className="alert alert-danger text-center d-flex justify-content-between align-items-center" role="alert">
            {errorMessage}
            <button type="button" className="btn-close" onClick={() => setErrorMessage("")}></button>
          </div>
        )}

        {/* Tab Content */}
        <div>
          {activeTab === "login" && (
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(e); }}>
              <div className="mb-4">
                <label className="form-label">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-light"><FaUser color="#0D3B66" /></span>
                  <input type="email" className="form-control" placeholder="Enter your email" required />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-light"><FaLock color="#0D3B66" /></span>
                  <input type="password" className="form-control" placeholder="Enter your password" required />
                </div>
              </div>

              <button type="submit" className="btn w-100 py-2 gradient-btn">Login</button>
            </form>
          )}

          {activeTab === "forget" && (
            <form onSubmit={(e) => { e.preventDefault(); handleForget(e); }}>
              <div className="mb-4">
                <label className="form-label">Enter your registered email</label>
                <div className="input-group">
                  <span className="input-group-text bg-light"><FaUser color="#0D3B66" /></span>
                  <input type="email" className="form-control" placeholder="Enter your email" required />
                </div>
              </div>

              <button type="submit" className="btn w-100 py-2 gradient-btn">Send Reset Link</button>
            </form>
          )}

          {activeTab === "activate" && (
            <form onSubmit={(e) => { e.preventDefault(); handleActivate(e); }}>
              <div className="mb-4">
                <label className="form-label">Enter OTP</label>
                <div className="input-group">
                  <span className="input-group-text bg-light"><FaStar color="#0D3B66" /></span>
                  <input type="text" className="form-control" placeholder="Enter code" required />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">New Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-light"><FaLock color="#0D3B66" /></span>
                  <input type="password" className="form-control" placeholder="Enter your password" required />
                </div>
              </div>

              <button type="submit" className="btn w-100 py-2 gradient-btn">Activate Account</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
