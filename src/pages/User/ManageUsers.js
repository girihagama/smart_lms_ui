import React, { useEffect, useState, useContext } from "react";
import { FirebaseConfigContext } from "../../FirebaseConfigContext"; // Import the context
import { Table, Card, Pagination, Form } from "react-bootstrap";

const ManageUsers = () => {
  const config = useContext(FirebaseConfigContext); // Access the config values
  const [api_base_url, setApi_base_url] = useState("");
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!config) setApi_base_url("http://localhost:8090/");
    else setApi_base_url(JSON.parse(config).api_base_url);
    console.log(api_base_url);
  }, [config]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, resultsPerPage]);

  // Set the API base URL if config is loaded
  useEffect(() => {
    fetch(api_base_url + "user/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        searchTerm: searchTerm,
        page: currentPage,
        limit: resultsPerPage,
      }),
    })
      .then((res) => {
        //if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        if (res.ok) return res.json();
        else return;
      })
      .then((data) => {
        //console.log("API Response:", data);
        setData(data.data || []);

        // Update total pages
        const newTotalPages = data.pagination?.totalPages || 1;
        setTotalPages(newTotalPages);

        // ✅ Move to page 1 ONLY IF needed
        if (currentPage > newTotalPages) {
          setCurrentPage(1);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [currentPage]);

  useEffect(() => {
    fetch(api_base_url + "user/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        searchTerm: searchTerm,
        page: currentPage,
        limit: resultsPerPage,
      }),
    })
      .then((res) => {
        //if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        if (res.ok) return res.json();
        else return;
      })
      .then((data) => {
        console.log("API Response:", data);
        setData(data.data || []);

        // Update total pages
        setTotalPages(data.pagination?.totalPages || 1);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [currentPage, resultsPerPage]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const searchOnBlur = () => {
    //load data
    fetch(api_base_url + "user/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your token
      },
      body: JSON.stringify({
        searchTerm: searchTerm,
        page: currentPage,
        limit: resultsPerPage,
      }),
    })
      .then((res) => {
        console.log(res);
        //if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        if (res.ok) return res.json(); // Convert response body to JSON
        else return;
      })
      .then((data) => {
        if (data) {
          setData(data.data);
          setTotalPages(data.pagination.totalPages);
        } else {
          setData([]);
        }
      });
  };

  return (
    <div>
      <Card className="shadow p-4 border-0 rounded-4">
        <h2 className="fw-bold text-primary text-center mb-3">
          🙋‍♂️ Manage Users
        </h2>
        <hr />

        {/* Search Input */}
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="🔍 Search by Email, Name, Address, Phone, or Type"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBlur={searchOnBlur}
          />
        </Form.Group>

        <Card.Body className="p-0">
          {/* Table */}
          <Table striped bordered hover responsive className="text-center">
            <thead className="bg-primary text-white">
              <tr>
                <th>Email</th>
                <th>User Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>DOB</th>
                <th>Max Books</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((user) => (
                  <tr key={user.user_email} className="align-middle">
                    <td>{user.user_email}</td>
                    <td className="fw-semibold">{user.user_name}</td>
                    <td>{user.user_address}</td>
                    <td>{user.user_mobile}</td>
                    <td>{new Date(user.user_dob).toLocaleDateString()}</td>
                    <td className="fw-bold">{user.user_max_books}</td>
                    <td>
                      <span
                        className={`badge ${
                          user.user_role === "Librarian"
                            ? "bg-danger"
                            : "bg-primary"
                        }`}
                      >
                        {user.user_role}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          user.user_status === "1"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {user.user_status == "1" ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-muted py-3">
                    🚫 No matching records found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            {/* Results Per Page Dropdown */}
            <Form.Group className="d-flex align-items-center">
              <Form.Label className="me-2 mb-0 fw-semibold">
                Results Per Page:
              </Form.Label>
              <Form.Select
                value={resultsPerPage}
                onChange={(e) => setResultsPerPage(Number(e.target.value))}
                style={{ width: "100px" }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </Form.Select>
            </Form.Group>

            {/* Pagination */}
            {/* Pagination */}
            <Pagination className="mb-0">
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              />

              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </Pagination>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ManageUsers;
