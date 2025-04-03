import React, { useEffect, useState, useContext } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaBook, FaUsers, FaExchangeAlt } from "react-icons/fa";
import { FirebaseConfigContext } from "../../FirebaseConfigContext"; // Import the context

const DashboardCards = () => {
  const config = useContext(FirebaseConfigContext); // Access the config values
  const [api_base_url, setApi_base_url] = useState("");
  const [bookCount, setBookCount] = useState("");
  const [userCount, setUserCount] = useState("");
  const [transactionCount, setTransactionCount] = useState("");

  useEffect(() => {
    if (!config) setApi_base_url("http://localhost:8090/");
    else setApi_base_url(JSON.parse(config).api_base_url);
    console.log(config, api_base_url);
  }, [config]);

  useEffect(() => {
    console.log("Loading dashboad counts");
    //load book count
    try {
      fetch(api_base_url + "book/get-total", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your token
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setBookCount(data.total);
        });
    } catch (ex) {
      console.log(ex);
    }

    //load book count
    try {
      fetch(api_base_url + "user/get-total", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your token
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setUserCount(data.total);
        });
    } catch (ex) {
      console.log(ex);
    }

    //load book count
    try {
      fetch(api_base_url + "transaction/get-total", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your token
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setTransactionCount(data.total);
        });
    } catch (ex) {
      console.log(ex);
    }
  }, []);

  return (
    <segment style={{ color: "black" }}>
      <div style={{ border: "3px solid #E8E8E8" }} className="p-4 rounded-4">
        <h2 className="Font-title-1 mb-5">Daily Summary</h2>
        <Row>
          {/* Books Card */}
          <Col md={4}>
            <Card className="custom-card books-card Gradient-1 rounded-4">
              <Card.Body>
                <FaBook size={50} className="icon" />
                <Card.Title>Total Books</Card.Title>
                <Card.Text className="stat">{bookCount}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Members Card */}
          <Col md={4}>
            <Card className="custom-card members-card Gradient-1 rounded-4">
              <Card.Body>
                <FaUsers size={50} className="icon" />
                <Card.Title>Total Members</Card.Title>
                <Card.Text className="stat">{userCount}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Transactions Card */}
          <Col md={4}>
            <Card className="custom-card transactions-card Gradient-1 rounded-4">
              <Card.Body>
                <FaExchangeAlt size={50} className="icon" />
                <Card.Title>Total Transactions</Card.Title>
                <Card.Text className="stat">{transactionCount}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </segment>
  );
};

export default DashboardCards;
