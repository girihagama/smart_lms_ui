import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { FirebaseConfigProvider } from "./FirebaseConfigContext"; // Import FirebaseConfigProvider
import "./App.css";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard"; // Import the dashboard page
import Logout from "./pages/Logout"; // Import the dashboard page

import Summary from "./pages/Summary";
import SingleBook from "./pages/Book/SingleBook";
import ManageBooks from "./pages/Book/ManageBooks";
import SingleUser from "./pages/User/SingleUser";
import ManageUsers from "./pages/User/ManageUsers";
import BorrowReturn from "./pages/Transaction/BorrowReturn";
import TransactionManage from "./pages/Transaction/ManageTransactions";

function App() {
  // Check if token exists in local storage
  const token = localStorage.getItem("token");

  return (
    <FirebaseConfigProvider>
      <Router>
        <div
          style={{
            backgroundColor: "#252525", // Set the entire screen's background to black
            color: "white", // Set text color to white for contrast
            minHeight: "100vh", // Ensure the background covers the entire screen
          }}
          className="Font-title-2"
        >
          <Routes>
            <Route
              path="/"
              element={token ? <Navigate to="/dashboard" /> : <Auth />}
            />
            <Route
              path="/dashboard/*"
              element={token ? <Dashboard /> : <Navigate to="/" />}
            >
              <Route index element={<Summary />} />
              <Route path="books/book" element={<SingleBook />} />
              <Route path="books/manage" element={<ManageBooks />} />
              <Route path="users/user" element={<SingleUser />} />
              <Route path="users/manage" element={<ManageUsers />} />
              <Route
                path="transactions/transaction"
                element={<BorrowReturn />}
              />
              <Route
                path="transactions/manage"
                element={<TransactionManage />}
              />
            </Route>
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </Router>
    </FirebaseConfigProvider>
  );
}

export default App;
