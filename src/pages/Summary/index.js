import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaBook, FaUsers, FaExchangeAlt } from "react-icons/fa";

const DashboardCards = () => {
  return (
    <segment style={{ color: "black" }}>
      <div style={{ border: "3px solid #E8E8E8" }} className="p-4 rounded-4">
        <h2 className="Font-title-1 mb-5">Daily Summary</h2>
        <Row        >
          {/* Books Card */}
          <Col md={4}>
            <Card className="custom-card books-card Gradient-1 rounded-4">
              <Card.Body>
                <FaBook size={50} className="icon" />
                <Card.Title>Total Books</Card.Title>
                <Card.Text className="stat">1,250</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Members Card */}
          <Col md={4}>
            <Card className="custom-card members-card Gradient-1 rounded-4">
              <Card.Body>
                <FaUsers size={50} className="icon" />
                <Card.Title>Total Members</Card.Title>
                <Card.Text className="stat">875</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Transactions Card */}
          <Col md={4}>
            <Card className="custom-card transactions-card Gradient-1 rounded-4">
              <Card.Body>
                <FaExchangeAlt size={50} className="icon" />
                <Card.Title>Active Transactions</Card.Title>
                <Card.Text className="stat">320</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </segment>
  );
};

export default DashboardCards;
