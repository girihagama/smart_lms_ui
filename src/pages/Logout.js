import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Logout component mounted."); // Debugging step
    localStorage.clear(); // Clear all local storage
    console.log("Local storage cleared.");
    navigate("/", { replace: true });
  }, [navigate]);

  return <p style={{color:'white'}}>Logging out...</p>; // Show something on screen
}

export default Logout;
