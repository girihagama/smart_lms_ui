import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { FaPrint, FaDownload } from 'react-icons/fa';

const DashboardContent = () => (
  <Container fluid className="mt-4" style={{ marginLeft: '250px' }}>
    <Row className="g-4">
      {/* Total Balance Widget */}
      <Col xs={12} md={6} lg={4}>
        <Card className="shadow-lg p-4" style={{ background: 'linear-gradient(145deg, #6a11cb, #2575fc)', color: 'white' }}>
          <h5>Total Balance Collected</h5>
          <h2>Rs. 5,254.75</h2>
          <p className="text-light">Last 24 Hours | March 2025</p>
          <Button variant="outline-light" className="me-2 rounded-pill">
            History
          </Button>
          <Button variant="outline-light" className="rounded-pill">
            Notify
          </Button>
        </Card>
      </Col>

      {/* Recent Transactions */}
      <Col xs={12} md={6} lg={8}>
        <Card className="shadow-lg p-4">
          <h5>Recent Transactions</h5>
          <div className="d-flex justify-content-end mb-3">
            <Button variant="outline-primary" className="me-2 rounded-pill">
              <FaPrint /> Print
            </Button>
            <Button variant="outline-secondary" className="rounded-pill">
              <FaDownload /> Download
            </Button>
          </div>

          {/* Transactions Table */}
          <Table striped bordered hover responsive size="sm" className="border-light">
            <thead>
              <tr>
                <th>Borrowing</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {[ 
                { title: "Echoes of the Forgotten", date: "Today", action: "Borrow" },
                { title: "The Last Chronicle", date: "Today", action: "Return" },
                { title: "Whispers in the Wind", date: "Today", action: "Borrow" },
              ].map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.date}</td>
                  <td><a href="#">{item.action}</a></td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Footer Link */}
          <a href="#" className="text-primary">Show All My Transactions</a>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default DashboardContent;
