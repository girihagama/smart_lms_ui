import React from 'react';
import { Navbar, Container, Form, FormControl, Nav, Image, Button } from 'react-bootstrap';

const NavbarTop = () => {
  return (
    <Navbar bg="primary" variant="dark" className="px-4 py-3" expand="lg">
      <Container fluid>
        <Navbar.Brand className="fw-bold text-white">
          Welcome, Indunil Girihagama
          <div style={{ fontSize: "0.8rem", fontWeight: "normal" }}>Librarian | Smart Library</div>
        </Navbar.Brand>

        <Form className="d-flex ms-auto me-4" style={{ width: "300px" }}>
          <FormControl type="search" placeholder="Search books" className="me-2" />
          <Button variant="light">🔍</Button>
        </Form>

        <Nav className="align-items-center">
          <div className="text-white me-2">Indunil Girihagama</div>
          <Image
            src="https://via.placeholder.com/40"
            roundedCircle
            width={40}
            height={40}
            alt="User Avatar"
          />
          <Nav.Link href="#" className="text-white ms-2">Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarTop;
