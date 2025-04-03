import React, { useEffect, useState, useContext } from "react";
import { FirebaseConfigContext } from "../../FirebaseConfigContext"; // Import the context
import { Tab, Nav, Card, Form, Button, Row, Col, Table } from "react-bootstrap";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const BorrowReturn = () => {
  const config = useContext(FirebaseConfigContext); // Access the config values
  const [api_base_url, setApi_base_url] = useState("");
  const [data, setData] = useState([]);
  const [issueData, setIssueData] = useState({ barcode: "", user: "" });
  const [returnData, setReturnData] = useState({ barcode: "" });
  const [showScanner, setShowScanner] = useState({
    issue: false,
    return: false,
  });

  useEffect(() => {
    if (!config) setApi_base_url("http://localhost:8090/");
    else setApi_base_url(JSON.parse(config).api_base_url);
    console.log(api_base_url);
  }, [config]);

  const handleIssueChange = (e) => {
    setIssueData({ ...issueData, [e.target.name]: e.target.value });
  };

  const handleReturnChange = (e) => {
    setReturnData({ ...returnData, [e.target.name]: e.target.value });
  };

  const handleIssueSubmit = (e) => {
    e.preventDefault();
    const issueDate = new Date().toISOString().split("T")[0];
    console.log("Issuing Book:", { ...issueData, issueDate });

    try {
      fetch(api_base_url + "transaction/borrow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your token
        },
        body: JSON.stringify({
          user_email: issueData.user,
          book_id: issueData.barcode,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          alert(data.message);
          console.log("Book issue : ", data.message);
        });
    } catch (ex) {
      console.log(ex);
    } finally {
      setIssueData({ barcode: "", user: "" });
    }
  };

  const handleReturnSubmit = (e) => {
    e.preventDefault();
    const returnDate = new Date().toISOString().split("T")[0];
    console.log("Returning Book:", { ...returnData, returnDate });

    let receipt_id = null;
    if (data[0].transaction_status === "Due") {
      receipt_id = prompt("Enter payment receipt #:");
      if (receipt_id.length <= 0) {
        alert("Due transaction require receipt # to return");
        return;
      }
    } else {
      if (window.confirm("Are you sure you want to proceed?")) {
        console.log("Return confirmed");
      } else {
        return;
      }
    }

    try {
      fetch(api_base_url + "transaction/return", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your token
        },
        body: JSON.stringify({
          transaction_id: data[0].transaction_id,
          user_email: data[0].transaction_user_email,
          book_id: data[0].transaction_book_id,
          receipt_id: receipt_id,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          alert(data.message);
        });
    } catch (ex) {
      console.log(ex);
    } finally {
      setReturnData({ barcode: "" });
    }
  };

  const searchOnBlur = () => {
    try {
      //load data
      fetch(api_base_url + "transaction/one", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your token
        },
        body: JSON.stringify({
          book_id: returnData.barcode,
        }),
      })
        .then((res) => {
          //console.log(res);
          return res.json(); // Convert response body to JSON
        })
        .then((receivedData) => {
          console.log("receivedData", [receivedData]);
          if (receivedData.transaction) setData([receivedData.transaction]);
          else setData([]);
        });
    } catch (ex) {
      console.log(ex);
    } finally {
      console.log("Transaction Data", data);
    }
  };

  return (
    <Card className="shadow p-4 border-0 rounded-4">
      <h2 className="fw-bold text-primary text-center mb-3">📚 Manage Books</h2>
      <hr />
      <Tab.Container defaultActiveKey="issue">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="issue">📤 Issue Book</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="return">📥 Return Book</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="mt-4">
          {/* Issue Book Tab */}
          <Tab.Pane eventKey="issue">
            <Form onSubmit={handleIssueSubmit}>
              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Member Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="user"
                      value={issueData.user}
                      onChange={handleIssueChange}
                      required
                      placeholder="Enter Member Email"
                    />
                    <br />
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Scan Book Barcode</Form.Label>
                        <div className="d-flex gap-2">
                          <Form.Control
                            type="text"
                            name="barcode"
                            value={issueData.barcode}
                            onChange={handleIssueChange}
                            required
                            placeholder="Scan or Enter Barcode"
                          />
                          <Button
                            variant="secondary"
                            onClick={() =>
                              setShowScanner({
                                ...showScanner,
                                issue: !showScanner.issue,
                              })
                            }
                          >
                            {showScanner.issue ? "Close Scanner" : "📷 Scan"}
                          </Button>
                        </div>
                        <br />
                        {showScanner.issue && (
                          <BarcodeScannerComponent
                            width={300}
                            height={200}
                            onUpdate={(err, result) => {
                              if (result) {
                                setIssueData({
                                  ...issueData,
                                  barcode: result.text,
                                });
                                setShowScanner({
                                  ...showScanner,
                                  issue: false,
                                });
                              }
                            }}
                          />
                        )}
                      </Form.Group>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit">
                Issue Book
              </Button>
            </Form>
          </Tab.Pane>

          {/* Return Book Tab */}
          <Tab.Pane eventKey="return">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Scan Book Barcode</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    name="barcode"
                    value={returnData.barcode}
                    onChange={handleReturnChange}
                    required
                    placeholder="Scan or Enter Barcode"
                    onBlur={searchOnBlur}
                  />
                  <Button
                    variant="secondary"
                    onClick={() =>
                      setShowScanner({
                        ...showScanner,
                        return: !showScanner.return,
                      })
                    }
                  >
                    {showScanner.return ? "Close Scanner" : "📷 Scan"}
                  </Button>
                </div>
                <br />
                {showScanner.return && (
                  <BarcodeScannerComponent
                    width={300}
                    height={200}
                    onUpdate={(err, result) => {
                      if (result) {
                        setReturnData({ ...returnData, barcode: result.text });
                        setShowScanner({ ...showScanner, return: false });
                      }
                    }}
                  />
                )}
              </Form.Group>
            </Form>
            {/* Transactions Table */}
            <Table
              hidden={!data.length > 0}
              striped
              bordered
              hover
              responsive
              className="text-center"
            >
              <thead className="bg-primary text-white">
                <tr>
                  <th>#</th>
                  <th>Book Details</th>
                  <th>User Email</th>
                  <th>Borrow Date</th>
                  <th>Return Date</th>
                  <th>Status</th>
                  <th>Late Payments</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((transaction) => (
                    <tr
                      key={transaction.transaction_id}
                      className="align-middle"
                    >
                      <td>{transaction.transaction_id}</td>
                      <td className="fw-semibold" style={{ textAlign: "left" }}>
                        {transaction.book_name}
                        <br />
                        <span style={{ fontSize: "small", fontWeight: "400" }}>
                          Book ID - {transaction.transaction_book_id}
                        </span>
                      </td>
                      <td>{transaction.transaction_user_email}</td>
                      <td>
                        {new Date(
                          transaction.transaction_borrow_date
                        ).toLocaleString()}
                      </td>
                      <td>
                        {new Date(
                          transaction.transaction_return_date
                        ).toLocaleString()}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            transaction.transaction_status === "Due"
                              ? "bg-danger"
                              : transaction.transaction_status === "Returned"
                              ? "bg-success"
                              : "bg-warning"
                          }`}
                        >
                          {transaction.transaction_status}
                        </span>
                      </td>
                      <td>
                        {transaction.transaction_status === "Due" ||
                        transaction.transaction_late_days ? (
                          <div style={{ fontWeight: "bold" }}>
                            {transaction.transaction_late_paid
                              ? "Receipt #: " +
                                transaction.transaction_late_paid
                              : "Not Paid"}
                            <br />
                            Rs.{transaction.transaction_late_fee} ×{" "}
                            {transaction.transaction_late_days} day(s) = Rs.
                            {transaction.transaction_late_payments}
                          </div>
                        ) : (
                          "No fines."
                        )}
                      </td>
                      <td>
                        {" "}
                        <Button
                          variant="success"
                          type="submit"
                          onClick={handleReturnSubmit}
                        >
                          Return Book
                        </Button>
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
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Card>
  );
};

export default BorrowReturn;
