import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock } from "react-icons/fa";

const Signin = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        fontFamily: "'Roboto', sans-serif", // Default font for body
      }}
    >
      <div
        className="card shadow-xl p-5 rounded"
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "#fff",
          boxShadow: "0 10px 50px rgba(0, 180, 252, 0.2)",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            fontFamily: "'Playfair Display', serif", // Apply Playfair Display font to the title
            fontWeight: "700",
            color: "#0D3B66",
          }}
        >
          Smart Library
          <br />
          <small>Librarian Portal</small>
        </h2>
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
                style={{
                  borderRadius: "25px",
                  boxShadow: "0 2px 15px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                }}
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
                style={{
                  borderRadius: "25px",
                  boxShadow: "0 2px 15px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                }}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between mb-4">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="ms-2">
                Remember me
              </label>
            </div>
            <Link
              to="/forget"
              className="text-decoration-none"
              style={{ color: "#00A8A8" }}
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-gradient w-100 py-2"
            style={{
              borderRadius: "25px",
              background: "linear-gradient(to right, #0D3B66, #00A8A8)",
              color: "white",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
              transition: "0.3s ease-in-out",
            }}
            onMouseOver={(e) => (e.target.style.background = "#00A8A8")}
            onMouseOut={(e) =>
              (e.target.style.background =
                "linear-gradient(to right, #0D3B66, #00A8A8)")
            }
          >
            Login
          </button>

          <p
            className="text-center mt-4 Roboto"
          >
            New to platform?{" "}
            <Link
              to="/signup"
              className="text-primary"
              style={{ textDecoration: "underline" }}
            >
              Activate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
