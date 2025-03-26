import React, { useState } from "react";
import { Tab, Nav, Card, Form, Button, Row, Col } from "react-bootstrap";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const BorrowReturn = () => {
  const [issueData, setIssueData] = useState({ barcode: "", user: "" });
  const [returnData, setReturnData] = useState({ barcode: "" });
  const [showScanner, setShowScanner] = useState({
    issue: false,
    return: false,
  });

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
    alert("Book Issued Successfully!");
    setIssueData({ barcode: "", user: "" });
  };

  const handleReturnSubmit = (e) => {
    e.preventDefault();
    const returnDate = new Date().toISOString().split("T")[0];
    console.log("Returning Book:", { ...returnData, returnDate });
    alert("Book Returned Successfully!");
    setReturnData({ barcode: "" });
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
                    <Form.Label>User ID / Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="user"
                      value={issueData.user}
                      onChange={handleIssueChange}
                      required
                      placeholder="Enter User ID or Email"
                    />
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
            <Form onSubmit={handleReturnSubmit}>
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
              <Button variant="success" type="submit">
                Return Book
              </Button>
            </Form>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Card>
  );
};

export default BorrowReturn;
