import React from "react";
import { Table, Card } from "react-bootstrap";

const MyTable = () => {
  const data = [
    { id: 1, title: "Book 1", author: "Author 1", year: 2020 },
    { id: 2, title: "Book 2", author: "Author 2", year: 2021 },
    { id: 3, title: "Book 3", author: "Author 3", year: 2022 },
  ];

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
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {data.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyTable;
