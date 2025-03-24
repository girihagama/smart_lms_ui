import { useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBook,
  FaUsers,
  FaExchangeAlt,
  FaChevronDown,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";

const navItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    label: "Books",
    icon: <FaBook />,
    children: [
      { label: "Add Book", to: "/dashboard/books/add" },
      { label: "Manage Books", to: "/dashboard/books/manage" },
    ],
  },
  {
    label: "Members",
    icon: <FaUsers />,
    children: [
      { label: "Add Member", to: "/dashboard/members/add" },
      { label: "View Members", to: "/dashboard/members/list" },
    ],
  },
  {
    label: "Transactions",
    icon: <FaExchangeAlt />,
    children: [
      { label: "Issue Book", to: "/dashboard/transactions/issue" },
      { label: "Return Book", to: "/dashboard/transactions/return" },
    ],
  },
];

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/logout";
  };

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#2D3436",
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflowY: "auto",
      }}
    >
      {/* Top Section: Navigation */}
      <Nav className="flex-column text-white p-4 gap-2">
        <h5 className="text-white mb-4">📚 SMART Library</h5>

        {navItems.map((item, index) =>
          item.children ? (
            <div key={index}>
              <div
                onClick={() => toggleMenu(item.label)}
                className="d-flex justify-content-between align-items-center text-white px-3 py-2 rounded nav-link"
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-center">
                  <span className="me-2">{item.icon}</span>
                  {item.label}
                </div>
                {openMenus[item.label] ? <FaChevronDown /> : <FaChevronRight />}
              </div>

              {openMenus[item.label] && (
                <div className="ms-4 mt-1 d-flex flex-column gap-1">
                  {item.children.map((child, idx) => (
                    <Nav.Link
                      key={idx}
                      as={NavLink}
                      to={child.to}
                      end
                      className="text-white px-3 py-1 rounded small"
                      style={({ isActive }) =>
                        isActive
                          ? { backgroundColor: "#0984e3", color: "#fff" }
                          : { color: "#dfe6e9" }
                      }
                    >
                      {child.label}
                    </Nav.Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Nav.Link
              key={index}
              as={NavLink}
              to={item.to}
              end
              className="text-white d-flex align-items-center px-3 py-2 rounded"
              style={({ isActive }) =>
                isActive
                  ? { backgroundColor: "#0984e3", color: "#fff" }
                  : { color: "#dfe6e9" }
              }
            >
              <span className="me-2">{item.icon}</span>
              {item.label}
            </Nav.Link>
          )
        )}
      </Nav>

      {/* Bottom Section: Sign Out */}
      <div className="p-3">
        <button
          className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
          onClick={handleSignOut} // Using the handleSignOut function here
        >
          <FaSignOutAlt className="me-2" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
