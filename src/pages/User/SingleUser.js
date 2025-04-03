import React, { useEffect, useState, useContext } from "react";
import { Form, Button, Card, Row, Col, ButtonGroup } from "react-bootstrap";

import { FirebaseConfigContext } from "../../FirebaseConfigContext"; // Import the context

const SingleBook = () => {
  const config = useContext(FirebaseConfigContext); // Access the config values
  const [api_base_url, setApi_base_url] = useState("");
  const [newUser, setNewUser] = useState(true);
  const [formData, setFormData] = useState({
    user_email: "",
    user_name: "",
    user_mobile: "",
    user_address: "",
    user_dob: "",
    user_max_books: 5, // New Field: Max Books Can Borrow
    user_ismember: "1", // Member Status
    user_isactive: "2", // New Field: Active Account
  });

  useEffect(() => {
    if (!config) setApi_base_url("http://localhost:8090/");
    else setApi_base_url(JSON.parse(config).api_base_url);
    console.log(api_base_url);
  }, [config]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data Submitted:", formData);

    //send request
    if (newUser) {
      //register user
      fetch(api_base_url + "user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your token
        },
        body: JSON.stringify({
          email: formData.user_email,
          name: formData.user_name,
          mobile: formData.user_mobile,
          address: formData.user_address,
          dob: formData.user_dob,
          max_books: formData.user_max_books,
          role: formData.user_ismember === "1" ? "Member" : "Librarian",
        }),
      })
        .then((response) => {
          if (response.ok) {
            setNewUser(false);
          } else if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          alert(data.message);
          handleReset();
        });
    } else {
      //update user
      fetch(api_base_url + "user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your token
        },
        body: JSON.stringify({
          email: formData.user_email,
          name: formData.user_name,
          mobile: formData.user_mobile,
          address: formData.user_address,
          dob: formData.user_dob,
          max_books: formData.user_max_books,
          role: formData.user_ismember === "1" ? "Member" : "Librarian",
          status: formData.user_isactive,
        }),
      })
        .then((response) => {
          if (response.ok) {
            setNewUser(false);
          } else if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          alert(data.message);
          handleReset();
        });
    }
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
      user_isactive: "2",
    });
  };

  const handleBlur = (e) => {
    if (formData.user_email == localStorage.getItem("user_email")) {
      setFormData({ ...formData, user_email: "" });
      return;
    }
    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Simple email regex
    };

    if (isValidEmail(formData.user_email)) {
      fetch(api_base_url + "user/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your token
        },
        body: JSON.stringify({ email: formData.user_email }),
      })
        .then((response) => {
          if (response.ok) {
            setNewUser(false);
          } else if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("User Data", data);
          setFormData({
            user_email: data.user.user_email,
            user_name: data.user.user_name,
            user_mobile: data.user.user_mobile,
            user_address: data.user.user_address,
            user_dob: formatDateForInput(data.user.user_dob),
            user_max_books:
              data.user.user_role === "Member" ? data.user.user_max_books : 0,
            user_ismember: data.user.user_role === "Member" ? "1" : "0",
            user_isactive: data.user.user_status,
          });
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure two digits
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
    console.log(year, month, day);
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {}, [formData]);

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
                    disabled={!newUser}
                    onBlur={handleBlur}
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
                    max={new Date().toISOString().split("T")[0]} // Prevent future dates
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
                    maxLength={9} // Prevents more than 9 digits
                    pattern="\d{1,9}" // Ensures only numbers are allowed
                    placeholder="eg: 712345678"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group
                  hidden={formData.user_ismember == 0}
                  className="mb-3"
                >
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
            <Form.Group
              className="mb-3"
              hidden={formData.user_isactive === "2"}
            >
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
