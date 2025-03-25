import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    book_id: "",
    book_name: "",
    book_description: "",
    book_image: "",
    book_readers: 0,
    book_rating: 0,
    book_late_fee: "",
    book_condition: "Good",
    book_status: "1",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Book Data Submitted:", formData);
    // Implement API call here
  };

  return (
    <div>
      <Card className="shadow p-4 border-0 rounded-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <h1 className="Font-title-1" style={{ color: "#0B5ED7" }}>
                    Add/Edit Book
                  </h1>
                  <hr />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Book ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="book_name"
                    value={formData.book_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={9}>
                <Form.Group className="mb-3">
                  <Form.Label>Book Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="book_name"
                    value={formData.book_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="book_description"
                value={formData.book_description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Book Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="book_image"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Late Fee</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="book_late_fee"
                    value={formData.book_late_fee}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Condition</Form.Label>
                  <Form.Select
                    name="book_condition"
                    value={formData.book_condition}
                    onChange={handleChange}
                  >
                    <option value="Good">Good</option>
                    <option value="Mint">Mint</option>
                    <option value="Damaged">Damaged</option>
                    <option value="Removed">Removed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                label="Available"
                name="book_status"
                checked={formData.book_status === "1"}
                onChange={() =>
                  setFormData({
                    ...formData,
                    book_status: formData.book_status === "1" ? "0" : "1",
                  })
                }
              />
            </Form.Group>

            <div className="gap-2 text-end">
              <Button variant="primary" type="submit">
                Add Book
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddBookForm;
