import React, { useState } from "react";
import { Table, Card, Pagination, Form } from "react-bootstrap";

const ManageTransactions = () => {
  const transactions = [
    {
      id: 1,
      userEmail: "john.doe@example.com",
      bookTitle: "The Great Gatsby",
      borrowDate: "2025-03-01",
      returnDate: "2025-03-15",
      status: "Returned",
    },
    {
      id: 2,
      userEmail: "jane.smith@example.com",
      bookTitle: "1984",
      borrowDate: "2025-03-05",
      returnDate: null,
      status: "Borrowed",
    },
    {
      id: 3,
      userEmail: "michael.brown@example.com",
      bookTitle: "To Kill a Mockingbird",
      borrowDate: "2025-03-10",
      returnDate: null,
      status: "Due",
    },
    {
      id: 4,
      userEmail: "emily.johnson@example.com",
      bookTitle: "Moby Dick",
      borrowDate: "2025-02-20",
      returnDate: "2025-03-02",
      status: "Returned",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Filter transactions based on search term and status
  const filteredTransactions = transactions.filter((transaction) =>
    [transaction.userEmail, transaction.bookTitle]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) &&
    (filterStatus === "All" || transaction.status === filterStatus)
  );

  const totalPages = Math.ceil(filteredTransactions.length / resultsPerPage);

  // Get current transactions for the page
  const currentTransactions = filteredTransactions.slice(
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
          />

          <Form.Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Transactions</option>
            <option value="Borrowed">Borrowed</option>
            <option value="Returned">Returned</option>
          </Form.Select>
        </div>

        <Card.Body className="p-0">
          {/* Transactions Table */}
          <Table striped bordered hover responsive className="text-center">
            <thead className="bg-primary text-white">
              <tr>
                <th>User Email</th>
                <th>Book Title</th>
                <th>Borrow Date</th>
                <th>Return Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.length > 0 ? (
                currentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="align-middle">
                    <td>{transaction.userEmail}</td>
                    <td className="fw-semibold">{transaction.bookTitle}</td>
                    <td>{transaction.borrowDate}</td>
                    <td>{transaction.returnDate || "Not Returned"}</td>
                    <td>
                      <span
                        className={`badge ${
                          transaction.status === "Returned"
                            ? "bg-success"
                            : "bg-warning"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-muted py-3">
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
