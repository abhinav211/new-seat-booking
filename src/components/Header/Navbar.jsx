import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button, Container } from "react-bootstrap";
import Logo from "../../assets/sky.jpeg";
import "./NavbarStyles.css"

function App() {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleNavItemClick = () => {
    setExpanded(false);
  };

  return (
    <div>
      <Navbar
        expanded={expanded}
        expand="lg"
        bg="white"
        className="py-2"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img src={Logo} alt="Logo" height="40" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" onClick={handleToggle} />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link
                as={Link}
                to="/"
                className="text-dark px-3"
                onClick={handleNavItemClick}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about"
                className="text-dark px-3"
                onClick={handleNavItemClick}
              >
                About
              </Nav.Link>
              <NavDropdown
                title="Services"
                id="navbarScrollingDropdown"
                className="text-dark px-3"
                onClick={(e) => e.stopPropagation()}
              >
                <NavDropdown.Item
                  as={Link}
                  to="/bookseat"
                  onClick={handleNavItemClick}
                >
                  Book Seat
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/view-booked-seat"
                  onClick={handleNavItemClick}
                >
                  View Booked Seat
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/cancel-booked-seat"
                  onClick={handleNavItemClick}
                >
                  Cancel Booked Seat
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                as={Link}
                to="/contact"
                className="text-dark px-3"
                onClick={handleNavItemClick}
              >
                Contact
              </Nav.Link>
            </Nav>
            <Button
              variant="danger"
              className="fw-bold"
              onClick={handleNavItemClick}
            >
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </div>
  );
}

export default App;