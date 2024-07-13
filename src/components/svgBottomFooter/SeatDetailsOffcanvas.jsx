import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Offcanvas, Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const SeatDetailsOffcanvas = ({ show, onHide, seatId }) => {
  const [bookingStatus, setBookingStatus] = useState(null);
  const { selectedDate } = useSelector((state) => state.booking);
  const navigate = useNavigate();

  const bookSeat = async () => {
    const formattedDate = format(new Date(selectedDate), "yyyy-MM-dd");

    try {
      const response = await axios.post("http://localhost:8000/book/", {
        date: formattedDate,
        seat_number: seatId,
      });

      if (response.data.success) {
        setBookingStatus("Booking was successful!");
        setTimeout(() => {
          navigate("/"); // Redirect to home after 2 seconds
        }, 2000);
      } else {
        setBookingStatus("Booking was not successful!");
        setTimeout(() => {
          navigate("/"); // Redirect to home after 2 seconds
        }, 2000);
      }
    } catch (error) {
      console.error("Error booking seat:", error);
      setBookingStatus("An error occurred while booking the seat.");
      setTimeout(() => {
        navigate("/"); // Redirect to home after 2 seconds
      }, 2000);
    }
  };

  useEffect(() => {
    if (show && seatId) {
      setBookingStatus(null);
    }
  }, [show, seatId]);

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="bottom"
      className="h-auto"
    >
      <Offcanvas.Header closeButton className="pb-2">
        <Offcanvas.Title as="h5">Seat Details</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="pt-0">
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6}>
              <p className="mb-2 text-center">{bookingStatus}</p>
              <div className="text-center">
                <Button
                  variant="danger"
                  onClick={bookSeat}
                  className="w-50 py-2 rounded-pill"
                  size="sm"
                >
                  Book Seat {seatId}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SeatDetailsOffcanvas;
