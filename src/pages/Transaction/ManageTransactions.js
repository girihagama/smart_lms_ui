import React, { useEffect, useState, useContext } from "react";
import { FirebaseConfigContext } from "../../FirebaseConfigContext"; // Import the context
import { Table, Card, Pagination, Form, Button } from "react-bootstrap";

const ManageTransactions = () => {
  const config = useContext(FirebaseConfigContext); // Access the config values
  const [api_base_url, setApi_base_url] = useState("");
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    if (!config) setApi_base_url("http://localhost:8090/");
    else setApi_base_url(JSON.parse(config).api_base_url);
    console.log(api_base_url);
  }, [config]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, resultsPerPage]);

  // Set the API base URL if config is loaded
  useEffect(() => {
    fetch(api_base_url + "transaction/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        searchTerm: searchTerm,
        transactionStatus: filterStatus,
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
    if (!config) return;

    //const baseUrl = JSON.parse(config).api_base_url;
    const baseUrl = "http://localhost:8090/";

    fetch(api_base_url + "transaction/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        searchTerm: searchTerm,
        transactionStatus: filterStatus,
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
  }, [currentPage, resultsPerPage, filterStatus]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const searchOnBlur = () => {
    //load data
    fetch(api_base_url + "transaction/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your token
      },
      body: JSON.stringify({
        searchTerm: searchTerm,
        transactionStatus: filterStatus,
        page: currentPage,
        limit: resultsPerPage,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json(); // Convert response body to JSON
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

  const notifyDue = () => {
    fetch(api_base_url + "transaction/due-notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your token
      },
    }).then((res) => {
      console.log(res);
      if (res.ok) alert("Notifications sent!"); // Convert response body to JSON
      else alert("Notifications not sent!");
    });
  };

  const notifyEarlyDue = () => {
    fetch(api_base_url + "transaction/due-early-notify/" + 7, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your token
      },
    }).then((res) => {
      console.log(res);
      if (res.ok) alert("Notifications sent!"); // Convert response body to JSON
      else alert("Notifications not sent!");
    });
  };

  return (
    <div>
      <Card className="shadow p-4 border-0 rounded-4">
        <h2 className="fw-bold text-primary text-center mb-3">
          📚 Manage Transactions
        </h2>
        <hr />

        {/* Search and Filter Inputs */}
        <div className="d-flex gap-3 mb-3">
          <Form.Control
            type="text"
            placeholder="🔍 Search by Email or Book Title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBlur={searchOnBlur}
          />

          <Form.Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Transactions</option>
            <option value="Issued">Issued</option>
            <option value="Returned">Returned</option>
            <option value="Due">Due</option>
          </Form.Select>

          {filterStatus === "Due" ? (
            <Button variant="danger" onClick={notifyDue}>
              NOTIFY
            </Button>
          ) : (
            ""
          )}
          {filterStatus === "Issued" ? (
            <Button variant="success" onClick={notifyEarlyDue}>
              NOTIFY
            </Button>
          ) : (
            ""
          )}
        </div>

        <Card.Body className="p-0">
          {/* Transactions Table */}
          <Table striped bordered hover responsive className="text-center">
            <thead className="bg-primary text-white">
              <tr>
                <th>#</th>
                <th>Book Details</th>
                <th>User Email</th>
                <th>Borrow Date</th>
                <th>Return Date</th>
                <th>Status</th>
                <th>Late Payments</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((transaction) => (
                  <tr key={transaction.transaction_id} className="align-middle">
                    <td>{transaction.transaction_id}</td>
                    <td className="fw-semibold" style={{ textAlign: "left" }}>
                      {transaction.book_name}
                      <br />
                      <span style={{ fontSize: "small", fontWeight: "400" }}>
                        Book ID - {transaction.transaction_book_id}
                      </span>
                    </td>
                    <td>{transaction.transaction_user_email}</td>
                    <td>
                      {new Date(
                        transaction.transaction_borrow_date
                      ).toLocaleString()}
                    </td>
                    <td>
                      {new Date(
                        transaction.transaction_return_date
                      ).toLocaleString()}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          transaction.transaction_status === "Due"
                            ? "bg-danger"
                            : transaction.transaction_status === "Returned"
                            ? "bg-success"
                            : "bg-warning"
                        }`}
                      >
                        {transaction.transaction_status}
                      </span>
                    </td>
                    <td>
                      {transaction.transaction_status === "Due" ||
                      transaction.transaction_late_days ? (
                        <div style={{ fontWeight: "bold" }}>
                          {transaction.transaction_late_paid
                            ? "Receipt #: " + transaction.transaction_late_paid
                            : "Not Paid"}
                          <br />
                          Rs.{transaction.transaction_late_fee} ×{" "}
                          {transaction.transaction_late_days} day(s) = Rs.
                          {transaction.transaction_late_payments}
                        </div>
                      ) : (
                        "No fines."
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-muted py-3">
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

export default ManageTransactions;
