import React, { useEffect, useState, useContext } from "react";
import { FirebaseConfigContext } from "../../FirebaseConfigContext"; // Import the context
import { Form, Button, Card, Row, Col, ButtonGroup } from "react-bootstrap";

const SingleBook = () => {
  const config = useContext(FirebaseConfigContext); // Access the config values
  const [api_base_url, setApi_base_url] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [newBook, setNewBook] = useState(true);
  const [formData, setFormData] = useState({
    book_id: "",
    book_name: "",
    book_description: "",
    book_image: "",
    book_late_fee: "",
    book_condition: "Good",
    book_status: "1",
  });

  useEffect(() => {
    if (!config) setApi_base_url("http://localhost:8090/");
    else setApi_base_url(JSON.parse(config).api_base_url);
    console.log(api_base_url);
  }, [config]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Set the image preview
        setFormData({ ...formData, [name]: reader.result });
      };
      reader.readAsDataURL(file);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.isNew = newBook;
    console.log("Submitting:", formData);

    fetch(api_base_url + "book/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your token
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json(); // Convert response body to JSON
      })
      .then((data) => {
        alert(data.message);
        handleReset();
      });
  };

  const handleBlur = (e) => {
    e.preventDefault();
    console.log("Checking the book availability in database");

    fetch(api_base_url + "book/one", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your token
      },
      body: JSON.stringify({
        book_id: formData.book_id,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setNewBook(false);
        } else if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Book Data", data);
        setFormData({
          book_id: data.data.book_id || "",
          book_name: data.data.book_name || "",
          book_description: data.data.book_description || "",
          book_image: data.data.book_image || "",
          book_late_fee: data.data.book_late_fee || "",
          book_condition: data.data.book_condition || "Good",
          book_status: data.data.book_status || "1",
        });
        setImagePreview(data.data.book_image);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleReset = (e) => {
    alert("Book Data Cleared!");
    setNewBook(true);
    setImagePreview(null);
    setFormData({
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
  };

  // Set the API base URL if config is loaded
  useEffect(() => {
    if (config) {
      setApi_base_url(JSON.parse(config).api_base_url);
    }
  }, [config]);

  return (
    <div>
      <Card className="shadow p-4 border-0 rounded-4">
        <Card.Body>
          <Form onSubmit={handleSubmit} onReset={handleReset}>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <h2 className="fw-bold text-primary text-center mb-3">
                    📚 Add / Edit Book
                  </h2>
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
                    name="book_id"
                    value={formData.book_id}
                    onChange={handleChange}
                    pattern="^\d{13,20}$"
                    title="Book ID must contain only numbers and be between 13 to 20 digits long."
                    required
                    onBlur={handleBlur}
                    disabled={!newBook}
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
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Book Image"
                      style={{
                        width: "150px",
                        height: "150px",
                        marginTop: "10px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Late Fee (Per Day)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="book_late_fee"
                    value={formData.book_late_fee}
                    onChange={handleChange}
                    min="0.01"
                    max="5000.00"
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
                  {newBook ? "Add Book" : "Update Book"}
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
