import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear(); // Clear all localStorage items
    navigate("/"); // Redirect to login
  }, []);

  return null; // No UI needed
}

export default Logout;
