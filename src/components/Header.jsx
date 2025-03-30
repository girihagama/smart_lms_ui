import React, { useState } from "react";
import { Navbar, Container, Nav, Image, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarTop = () => {
  const userName = localStorage.getItem("user_name") || "Guest";
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="px-4 py-3 Gradient-2"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1030, // ensures it stays above other content
        minHeight: "70px",
      }}
    >
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        {/* Left Section - Welcome & Role */}
        <Navbar.Brand className="text-white Font-title-1">
          <div style={{ fontSize: "28px", fontWeight: "600" }}>
            Welcome, {userName}
          </div>
          <div style={{ fontSize: "16px", fontWeight: "400", opacity: 0.85 }}>
            Librarian • Smart Library
          </div>
        </Navbar.Brand>

        {/* Navbar Toggle (Hamburger menu for mobile) */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={toggleNavbar}
        />

        {/* Right Section - User Info */}
        <Navbar.Collapse id="basic-navbar-nav" in={isCollapsed}>
          <Nav className="ms-auto d-flex align-items-center gap-3">
            <div className="text-end text-white">
              <div style={{ fontWeight: "500", fontSize: "16px" }}>
                {userName}
              </div>
              <Link
                to="/logout"
                className="text-white"
                style={{
                  fontSize: "14px",
                  textDecoration: "none",
                  opacity: 0.9,
                }}
                onMouseOver={(e) => (e.target.style.opacity = 1)}
                onMouseOut={(e) => (e.target.style.opacity = 0.9)}
              >
                Logout
              </Link>
            </div>
            <Image
              src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
              roundedCircle
              width={50}
              height={50}
              alt="User Avatar"
              style={{ border: "2px solid #fff" }}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarTop;
