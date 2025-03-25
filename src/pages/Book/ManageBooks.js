import React, { useState } from "react";
import { Table, Card, Pagination } from "react-bootstrap";

const MyTable = () => {
  const data = [
    {
      id: 1,
      name: "Book 1",
      description: "Author 1",
      image: 2020,
      latefee: 100.5,
      condition: "Good",
      status: "Available",
    },
    {
      id: 2,
      name: "Book 2",
      description: "Author 2",
      image: 2021,
      latefee: 200.5,
      condition: "Good",
      status: "Available",
    },
    {
      id: 3,
      name: "Book 3",
      description: "Author 3",
      image: 2022,
      latefee: 300.5,
      condition: "Good",
      status: "Available",
    },
    {
      id: 4,
      name: "Book 4",
      description: "Author 4",
      image: 2023,
      latefee: 400.5,
      condition: "Good",
      status: "Available",
    },
    {
      id: 5,
      name: "Book 5",
      description: "Author 5",
      image: 2024,
      latefee: 500.5,
      condition: "Good",
      status: "Available",
    },
    {
      id: 6,
      name: "Book 6",
      description: "Author 6",
      image: 2025,
      latefee: 600.5,
      condition: "Good",
      status: "Available",
    },
    {
      id: 7,
      name: "Book 7",
      description: "Author 7",
      image: 2026,
      latefee: 700.5,
      condition: "Good",
      status: "Available",
    },
    {
      id: 8,
      name: "Book 8",
      description: "Author 8",
      image: 2027,
      latefee: 800.5,
      condition: "Good",
      status: "Available",
    },
    {
      id: 9,
      name: "Book 9",
      description: "Author 9",
      image: 2028,
      latefee: 900.5,
      condition: "Good",
      status: "Available",
    },
    {
      id: 10,
      name: "Book 10",
      description: "Author 10",
      image: 2029,
      latefee: 1000.5,
      condition: "Good",
      status: "Available",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(5); // Adjust the number of results per page
  const totalPages = Math.ceil(data.length / resultsPerPage);

  // Get current books for the page
  const currentBooks = data.slice(
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
        <h1 className="Font-title-1" style={{ color: "#0B5ED7" }}>
          View Books
        </h1>
        <hr />
        <Card.Body className="p-0">
          <Table striped bordered hover responsive>
            <thead>
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
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.name}</td>
                  <td>{book.description}</td>
                  <td>{book.image}</td>
                  <td>{book.latefee}</td>
                  <td>{book.condition}</td>
                  <td>{book.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          <Pagination className="justify-content-end">
            <Pagination.Prev
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
              onClick={() =>
                currentPage < totalPages && handlePageChange(currentPage + 1)
              }
            />
          </Pagination>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyTable;
