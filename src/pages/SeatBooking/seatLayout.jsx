import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import SeatDetailsNavbar from "../../components/seatBookingNavbar/seatDetailsNavbar.jsx";
import SeatsSvg from "../../components/svgComponent/seatsSvg.jsx";
import SeatDetailsOffcanvas from "../../components/svgBottomFooter/SeatDetailsOffcanvas.jsx";
import "./seatLayout.css";

function SeatLayout() {
  const [clickedSeat, setClickedSeat] = useState({ id: "", name: "" });
  const [showSeatDetails, setShowSeatDetails] = useState(false);
  const [svgComponent, setSvgComponent] = useState(null);
  const [error, setError] = useState(null);

  const { selectedFloor, selectedRoom, selectedDate } = useSelector(
    (state) => state.booking
  );

  const navigate = useNavigate();
  const location = useLocation();
  const { bookedSeats } = location.state || { bookedSeats: [] };

  useEffect(() => {
    const loadSvgComponent = async () => {
      if (selectedFloor && selectedRoom) {
        try {
          // Dynamically import the SVG based on floor and room
          const module = await import(
            `../../assets/seats-svg-${selectedFloor}-${selectedRoom}.svg?react`
          );
          setSvgComponent(() => module.default);
          setError(null);
        } catch (error) {
          console.error("Error loading SVG:", error);
          setError("Failed to load seat layout. Please try again.");
          setSvgComponent(null);
        }
      } else {
        setError("Please select a floor and room to view the seat layout.");
        setSvgComponent(null);
      }
    };

    loadSvgComponent();
  }, [selectedFloor, selectedRoom]);

  // write cleanup function to avoid api call two times

  const handleSeatClick = (e) => {
    const seatElement = e.target.closest("g[id]");
    if (seatElement) {
      const seatId = seatElement.id;

      if (bookedSeats.some((seat) => seat.number === seatId)) {
        return; // Prevent selecting booked seats
      }

      if (seatId === clickedSeat.id) {
        setClickedSeat({ id: "", name: "" });
        setShowSeatDetails(false);
      } else {
        setClickedSeat({ id: seatId, name: seatElement.textContent.trim() });
        setShowSeatDetails(true);
      }
    }
  };

  const onBackClick = () => {
    navigate("/bookseat");
  };

  const handleOffcanvasClose = () => {
    setClickedSeat({ id: "", name: "" });
    setShowSeatDetails(false);
  };

  return (
    <div className="d-flex flex-column vh-100">
      <SeatDetailsNavbar
        selectedFloor={selectedFloor}
        selectedModule={selectedRoom}
        selectedDate={selectedDate ? new Date(selectedDate) : "Not selected"}
        onBackClick={onBackClick}
      />
      <Container fluid className="flex-grow-1 d-flex flex-column">
        <Row className="flex-grow-1">
          <Col className="d-flex justify-content-center align-items-center">
            {error ? (
              <div className="text-danger">{error}</div>
            ) : svgComponent ? (
              <SeatsSvg
                clickedSeat={clickedSeat}
                handleSeatClick={handleSeatClick}
                svgComponent={svgComponent}
              />
            ) : (
              <div>Loading seat layout...</div>
            )}
          </Col>
        </Row>
      </Container>
      <SeatDetailsOffcanvas
        show={showSeatDetails}
        onHide={handleOffcanvasClose}
        seatId={clickedSeat.id}
      />
    </div>
  );
}

export default SeatLayout;
