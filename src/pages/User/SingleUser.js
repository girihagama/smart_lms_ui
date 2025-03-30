import React, { useEffect, useState } from "react";
import { Form, Button, Card, Row, Col, ButtonGroup } from "react-bootstrap";

const SingleBook = () => {
  const [newUser, setNewUser] = useState(true);
  const [formData, setFormData] = useState({
    user_email: "",
    user_name: "",
    user_mobile: "",
    user_address: "",
    user_dob: "",
    user_max_books: 5, // New Field: Max Books Can Borrow
    user_ismember: "1", // Member Status
    user_isactive: "1", // New Field: Active Account
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data Submitted:", formData);
    alert("User Data Submitted!");
  };

  const handleReset = () => {
    alert("User Data Cleared!");
    setNewUser(true);
    setFormData({
      user_email: "",
      user_name: "",
      user_mobile: "",
      user_address: "",
      user_dob: "",
      user_max_books: 5,
      user_ismember: "1",
      user_isactive: "1", // Reset to Active
    });
  };

  useEffect(() => {
    // console.log("Form Data:", formData);
  }, [formData.user_email]);

  return (
    <div>
      <Card className="shadow p-4 border-0 rounded-4">
        <Card.Body>
          <Form onSubmit={handleSubmit} onReset={handleReset}>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <h2 className="fw-bold text-primary text-center mb-3">
                    📚 Add / Edit User
                  </h2>
                  <hr />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
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
              <Col md={8}>
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
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="user_dob"
                    value={formData.user_dob}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Max Books Can Borrow</Form.Label>
                  <Form.Control
                    type="number"
                    name="user_max_books"
                    value={formData.user_max_books}
                    onChange={handleChange}
                    min="1"
                    max="10"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
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

            {/* Member Switch */}
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                label="Member"
                name="user_ismember"
                checked={formData.user_ismember === "1"}
                onChange={() =>
                  setFormData({
                    ...formData,
                    user_ismember: formData.user_ismember === "1" ? "0" : "1",
                  })
                }
              />
            </Form.Group>

            {/* Active Account Switch */}
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                label="Active"
                name="user_isactive"
                checked={formData.user_isactive === "1"}
                onChange={() =>
                  setFormData({
                    ...formData,
                    user_isactive: formData.user_isactive === "1" ? "0" : "1",
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
                  {newUser ? "Add User" : "Update User"}
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
