import React, { useEffect, useState, useContext } from "react";
import { FirebaseConfigContext } from "../../FirebaseConfigContext"; // Import the context
import { Table, Card, Pagination, Form, Image } from "react-bootstrap";

const MyTable = () => {
  const config = useContext(FirebaseConfigContext); // Access the config values
  const [api_base_url, setApi_base_url] = useState("");
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, resultsPerPage]);

  // Set the API base URL if config is loaded
  useEffect(() => {
    if (!config) return;

    const baseUrl = JSON.parse(config).api_base_url;

    fetch(`${baseUrl}book/search`, {
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
        const newTotalPages = data.pagination?.totalPages || 1;
        setTotalPages(newTotalPages);

        // ✅ Move to page 1 ONLY IF needed
        if (currentPage > newTotalPages) {
          setCurrentPage(1);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [config, currentPage]);

  useEffect(() => {
    if (!config) return;

    const baseUrl = JSON.parse(config).api_base_url;

    fetch(`${baseUrl}book/search`, {
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
  }, [config, currentPage, resultsPerPage]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const searchOnBlur = () => {
    //load data
    fetch("http://localhost:8090/" + "book/search", {
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
        <h2 className="fw-bold text-primary text-center mb-3">📚 View Books</h2>
        <hr />

        {/* Search Bar */}
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="🔍 Search books..."
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
                <th>#</th>
                <th>Book Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Late Fee</th>
                <th>Condition</th>
                <th>Status</th>
                <th>Readers</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((book) => (
                  <tr key={book.book_id} className="align-middle">
                    <td>{book.book_id}</td>
                    <td className="fw-semibold">
                      {book.book_name}
                      <br />
                      <span style={{ fontSize: "small", fontWeight: "400" }}>
                        Created -{" "}
                        {new Date(book.book_added_date).toLocaleString()}
                      </span>
                    </td>
                    <td>{book.book_description}</td>
                    <td>
                      <Image
                        src={book.book_image}
                        alt="Book Cover"
                        thumbnail
                        style={{
                          width: "50px",
                          height: "auto",
                          cursor: "pointer",
                        }}
                        onClick={() => window.open(book.book_image, "_blank")}
                      />
                    </td>
                    <td className="text-danger fw-bold">
                      Rs.{book.book_late_fee.toFixed(2)}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          book.book_condition == "Damaged"
                            ? "bg-danger"
                            : "bg-primary"
                        }`}
                      >
                        {book.book_status == "1"
                          ? book.book_condition
                          : book.book_condition}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          book.book_status == "1"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {book.book_status == "1" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>{book.book_readers}</td>
                    <td>{parseFloat(book.book_rating)}</td>
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

export default MyTable;
