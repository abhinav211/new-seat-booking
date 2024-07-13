import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { BackArrowIcon, ChairIcon } from "../../assets/IconSvg.jsx";

const SeatDetailsNavbar = ({
  selectedFloor,
  selectedModule,
  selectedDate,
  onBackClick,
}) => {
  const formattedDate = selectedDate
    ? selectedDate.toDateString()
    : "Not selected";


    console.log(selectedDate)
  return (
    <Navbar
      bg="danger"
      variant="dark"
      expand="lg"
      className="py-2 shadow-sm"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Container fluid>
        <Navbar.Brand className="d-flex align-items-center">
          <BackArrowIcon
            onClick={onBackClick}
            className="me-3"
            style={{ cursor: "pointer" }}
          />
          <ChairIcon className="me-2" />
          <span className="fw-bold">Seat Booking</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Item className="me-3">
              <strong>Floor:</strong> {selectedFloor || "Not selected"}
            </Nav.Item>
            <Nav.Item className="me-3">
              <strong>Module:</strong> {selectedModule || "Not selected"}
            </Nav.Item>
            <Nav.Item>
              <strong>Date:</strong> {formattedDate}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SeatDetailsNavbar;
