import React, { useState, useContext, useEffect } from "react";
import { FaUser, FaLock, FaStar } from "react-icons/fa";
import { FirebaseConfigContext } from "../FirebaseConfigContext"; // Import the context
import Spinner from "react-bootstrap/Spinner"; // Importing react-bootstrap Spinner for loading indication

const Auth = () => {
  const config = useContext(FirebaseConfigContext); // Access the config values
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const [activeTab, setActiveTab] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Add a success message state
  const [api_base_url, setApi_base_url] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set the API base URL if config is loaded
  useEffect(() => {
    if (config) {
      setApi_base_url(JSON.parse(config).api_base_url);
      setIsLoading(false); // Set loading to false when config is loaded
    }
  }, [config]);

  //set active tab
  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  // Function to show error messages
  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 5000); // Auto-hide after 5 seconds
  };

  // Function to show success messages
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 5000); // Auto-hide after 5 seconds
  };

  // handle login
  const handleLogin = (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    console.log("Email: " + email + "\nPassword: " + password);

    // Check if email and password are valid
    if (email && password) {
      const sendPostRequest = async () => {
        try {
          const response = await fetch(api_base_url + "token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
          });
          const result = await response.json();

          if (response.ok) {
            console.log("Success:", result);

            if (result) {
              result.user.user_role === "Librarian"
                ? localStorage.setItem("token", result.token)
                : localStorage.clear();
              result.user.user_email
                ? localStorage.setItem("user_email", result.user.user_email)
                : localStorage.clear();
              result.user.user_role
                ? localStorage.setItem("user_role", result.user.user_role)
                : localStorage.clear();
            }

            // Show success message
            showSuccess("Login successful! Redirecting to dashboard...");
            
            // Redirect to dashboard after a small delay
            setTimeout(() => {
              setIsSubmitting(false);
              window.location.href = "/dashboard";
            }, 1000); // Redirect after 2 seconds
          } else {
            setIsSubmitting(false);
            console.error("Error:", result);
            // Handle error (you can display an error message)
            showError(result.message || "Login failed. Please try again!");
          }
        } catch (error) {
          console.error("Request failed", error);
          // Handle request failure (e.g., network error)
          showError("Network error. Please try again later.");
          setIsSubmitting(false);
        }
      };

      // Call the function to send the POST request
      sendPostRequest();
    } else {
      // Show error message if email or password is empty
      showError("Please enter both email and password.");
    }
  };

  const handleForget = (e) => {
    e.preventDefault();
    const email = e.target[0].value;

    console.log("Email: " + email);

    // Check if email is valid
    if (email) {
      const sendPostRequest = async () => {
        try {
          const response = await fetch(api_base_url + "forget/" + email, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const result = await response.json();

          if (response.ok) {
            console.log("Success:", result);
            showSuccess(result.message || "Reset link sent to your email!");
          } else {
            console.error("Error:", result);
            showError(
              result.message || "Failed to send reset link. Please try again!"
            );
          }
        } catch (error) {
          console.error("Request failed", error);
          showError("Network error. Please try again later.");
        }
      };

      sendPostRequest();
    } else {
      showError("Invalid email. Please try again!");
    }
  };

  // handle activate / reset
  const handleActivate = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const otp = e.target[1].value;
    const password = e.target[2].value;

    console.log(
      "Email: " + email + "\nOTP: " + otp + "\nPassword: " + password
    );

    // Check if OTP and password are valid
    if (otp && email && password) {
      const sendPostRequest = async () => {
        try {
          const response = await fetch(
            api_base_url + "verify/" + email + "/" + otp,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ otp, password }),
            }
          );

          const result = await response.json();

          if (response.ok) {
            console.log("Success:", result);
            showSuccess(result.message || "Account activated successfully!");
          } else {
            console.error("Error:", result);
            showError(
              result.message || "Failed to activate account. Please try again!"
            );
          }
        } catch (error) {
          console.error("Request failed", error);
          showError("Network error. Please try again later.");
        }
      };

      sendPostRequest();
    } else {
      showError("Invalid OTP, Email or password. Please try again!");
    }
  };

  // Render the loading spinner or the form based on loading state
  if (isLoading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 Font-title-2">
        <p className="mt-3">SMART LIBRARY</p>
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading Remote Configuration...</p>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 w-100 Font-title-2">
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
          <small className="Font-title-2">Librarian Portal</small>
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
                className={`nav-link ${
                  activeTab === "activate" ? "active" : ""
                }`}
                onClick={() => setActiveTab("activate")}
              >
                Activate / Reset
              </button>
            </li>
          </ul>
        </div>

        {/* Error Message Box */}
        {errorMessage && (
          <div
            className="alert alert-danger text-center d-flex justify-content-between align-items-center"
            role="alert"
          >
            {errorMessage}
            <button
              type="button"
              className="btn-close"
              onClick={() => setErrorMessage("")}
            ></button>
          </div>
        )}

        {/* Success Message Box */}
        {successMessage && (
          <div
            className="alert alert-success text-center d-flex justify-content-between align-items-center"
            role="alert"
          >
            {successMessage}
            <button
              type="button"
              className="btn-close"
              onClick={() => setSuccessMessage("")}
            ></button>
          </div>
        )}

        {/* Tab Content */}
        <div>
          {activeTab === "login" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin(e);
              }}
            >
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

              <button
                type="submit"
                className="btn w-100 py-2 gradient-btn mb-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Login"
                )}
              </button>
              <center><a style={{cursor:'pointer'}} onClick={()=>{changeTab('forget')}}>Forgot password?</a></center>
            </form>
          )}

          {activeTab === "forget" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleForget(e);
              }}
            >
              <div className="mb-4">
                <label className="form-label">
                  Enter your registered email
                </label>
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

              <button type="submit" className="btn w-100 py-2 gradient-btn mb-2">
                Send Reset Link
              </button>
              <center><a style={{cursor:'pointer'}} onClick={()=>{changeTab('activate')}}>Already have an OTP?</a></center>
            </form>
          )}

          {activeTab === "activate" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleActivate(e);
              }}
            >
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
                <label className="form-label">Enter OTP</label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <FaStar color="#0D3B66" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter code"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">New Password</label>
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

              <button type="submit" className="btn w-100 py-2 gradient-btn mb-2">
                Activate Account
              </button>
              <center><a style={{cursor:'pointer'}} onClick={()=>{changeTab('login')}}>Go to login?</a></center>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
