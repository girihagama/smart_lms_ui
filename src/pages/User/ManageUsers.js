import React, { useState } from "react";
import { Table, Card, Pagination, Form } from "react-bootstrap";

const ManageUsers = () => {
  const users = [
    {
      id: 1,
      email: "john.doe@example.com",
      userName: "John Doe",
      address: "123 Main St, NY",
      phone: "+1 234 567 890",
      dob: "1990-05-15",
      maxBooks: 0,
      type: "Librarian",
      status: "Active",
    },
    {
      id: 2,
      email: "jane.smith@example.com",
      userName: "Jane Smith",
      address: "456 Elm St, CA",
      phone: "+1 987 654 321",
      dob: "1995-09-23",
      maxBooks: 3,
      type: "Member",
      status: "Inactive",
    },
    {
      id: 3,
      email: "michael.brown@example.com",
      userName: "Michael Brown",
      address: "789 Oak St, TX",
      phone: "+1 567 890 123",
      dob: "1988-12-10",
      maxBooks: 0,
      type: "Librarian",
      status: "Active",
    },
    {
      id: 4,
      email: "emily.johnson@example.com",
      userName: "Emily Johnson",
      address: "321 Maple St, FL",
      phone: "+1 654 321 789",
      dob: "1998-07-08",
      maxBooks: 0,
      type: "Member",
      status: "Active",
    },
    {
      id: 5,
      email: "william.white@example.com",
      userName: "William White",
      address: "741 Birch St, IL",
      phone: "+1 741 852 963",
      dob: "1985-03-30",
      maxBooks: 2,
      type: "Member",
      status: "Inactive",
    },
    {
      id: 6,
      email: "olivia.miller@example.com",
      userName: "Olivia Miller",
      address: "852 Cedar St, OH",
      phone: "+1 369 258 147",
      dob: "2000-12-05",
      maxBooks: 4,
      type: "Member",
      status: "Active",
    },
    {
      id: 7,
      email: "daniel.wilson@example.com",
      userName: "Daniel Wilson",
      address: "963 Pine St, AZ",
      phone: "+1 147 258 369",
      dob: "1993-06-21",
      maxBooks: 0,
      type: "Librarian",
      status: "Active",
    },
    {
      id: 8,
      email: "sophia.thomas@example.com",
      userName: "Sophia Thomas",
      address: "159 Redwood St, WA",
      phone: "+1 753 951 852",
      dob: "1997-09-18",
      maxBooks: 0,
      type: "Librarian",
      status: "Inactive",
    },
    {
      id: 9,
      email: "alex.moore@example.com",
      userName: "Alex Moore",
      address: "357 Spruce St, CO",
      phone: "+1 852 456 753",
      dob: "1992-04-12",
      maxBooks: 4,
      type: "Member",
      status: "Active",
    },
    {
      id: 10,
      email: "charlotte.davis@example.com",
      userName: "Charlotte Davis",
      address: "258 Aspen St, MA",
      phone: "+1 951 753 456",
      dob: "1991-11-25",
      maxBooks: 2,
      type: "Member",
      status: "Inactive",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered users based on search term
  const filteredUsers = users.filter((user) =>
    [user.email, user.userName, user.address, user.phone, user.type]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / resultsPerPage);

  // Get current users for the page
  const currentUsers = filteredUsers.slice(
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
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.id} className="align-middle">
                    <td>{user.email}</td>
                    <td className="fw-semibold">{user.userName}</td>
                    <td>{user.address}</td>
                    <td>{user.phone}</td>
                    <td>{user.dob}</td>
                    <td className="fw-bold">{user.maxBooks}</td>
                    <td>
                      <span className="badge bg-info">{user.type}</span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          user.status === "Active"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {user.status}
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
