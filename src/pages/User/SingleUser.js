import React, { useEffect, useState } from "react";
import { Form, Button, Card, Container, Row, Col, ButtonGroup } from "react-bootstrap";

const SingleBook = () => {
  const [newBook, setNewBook] = useState(true);
  const [formData, setFormData] = useState({
    user_email: "",
    user_name: "",
    user_address: "",
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
    alert("Book Data Submitted!");
  };

  const handleReset = (e) => {
    alert("User Data Cleared!");
    setNewBook(true);
    setFormData({
      user_email: "",
      user_name: "",
      user_address: "",
      book_image: "",
      book_readers: 0,
      book_rating: 0,
      book_late_fee: "",
      book_condition: "Good",
      book_status: "1",
    });
  };

  useEffect(() => {
    //console.log("Form Data:", formData);
  }, [formData.user_email]);

  return (
    <div>
      <Card className="shadow p-4 border-0 rounded-4">
        <Card.Body>
          <Form onSubmit={handleSubmit} onReset={handleReset}>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                <h2 className="fw-bold text-primary text-center mb-3">📚 Add / Edit Book</h2>
                  <hr />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="user_mobile"
                    value={formData.user_mobile}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="user_address"
                value={formData.user_address}
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
              <ButtonGroup className="mt-4">
                <Button variant="default" type="reset">
                  Clear / Reset Form
                </Button>
                <Button variant="primary" type="submit">
                  {(newBook)? "Add Book" : "Update Book"}
                </Button>
              </ButtonGroup>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleBook;
