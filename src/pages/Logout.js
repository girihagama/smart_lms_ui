import { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";

function Logout() {
  useEffect(() => {
    console.log("Logout component mounted.");
    localStorage.clear();
    setTimeout(() => {
      window.location.replace("/");
    }, 1000);
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 Font-title-2">
      <p className="mt-3">SMART LIBRARY</p>
      <Spinner animation="border" variant="primary" />
      <p className="mt-3">Signing out...</p>
    </div>
  );
}

export default Logout;
