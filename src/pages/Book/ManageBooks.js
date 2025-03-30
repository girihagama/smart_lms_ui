import React, { useState } from "react";
import { Table, Card, Pagination, Form, Image } from "react-bootstrap";

const MyTable = () => {
  const data = [
    {
      id: 1742163101416,
      name: "The Anxious Generation",
      description: "Penguin Press (March 26, 2024)",
      image: "https://backend.24x7retail.com/uploads/1742163101416.jpg",
      latefee: 51,
      condition: "Good",
      status: "Available",
    },
    {
      id: 1742556818645,
      name: "The Catcher in the Rye",
      description: "Little, Brown and Company (July 16, 1951)",
      image: "https://backend.24x7retail.com/uploads/1742556818645.jpg",
      latefee: 38,
      condition: "Good",
      status: "Available",
    },
    {
      id: 1742694034593,
      name: "The Housemaid",
      description: "Grand Central Publishing (August 23, 2022)",
      image: "https://backend.24x7retail.com/uploads/1742694034593.jpg",
      latefee: 83,
      condition: "Mint",
      status: "Available",
    },
    {
      id: 1742960608957,
      name: "The Great Gatsby",
      description: "Scribner (April 10, 1925)",
      image: "https://backend.24x7retail.com/uploads/1742960608957.jpg",
      latefee: 45,
      condition: "Mint",
      status: "Available",
    },
    {
      id: 1743092097026,
      name: "The Let Them Theory",
      description: "Hay House LLC (December 24, 2024)",
      image: "https://backend.24x7retail.com/uploads/1743092097026.jpg",
      latefee: 90,
      condition: "Good",
      status: "Available",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);

  // Filter books based on search term
  const filteredBooks = data.filter(
    (book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / resultsPerPage);

  // Get current books for the page
  const currentBooks = filteredBooks.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((book) => (
                <tr key={book.id} className="align-middle">
                  <td>{book.id}</td>
                  <td className="fw-semibold">{book.name}</td>
                  <td>{book.description}</td>
                  <td>
                    <Image
                      src={book.image}
                      alt="Book Cover"
                      thumbnail
                      style={{
                        width: "50px",
                        height: "auto",
                        cursor: "pointer",
                      }}
                      onClick={() => window.open(book.image, "_blank")}
                    />
                  </td>
                  <td className="text-danger fw-bold">
                    Rs.{book.latefee.toFixed(2)}
                  </td>
                  <td>
                    <span className="badge bg-info">{book.condition}</span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        book.status === "Available"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                </tr>
              ))}
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
            <Pagination className="mb-0">
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
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
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
              />
            </Pagination>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyTable;
