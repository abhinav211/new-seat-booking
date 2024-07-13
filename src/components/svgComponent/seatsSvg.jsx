import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const SeatsSvg = ({ handleSeatClick, clickedSeat, svgComponent }) => {
  const [svgContent, setSvgContent] = useState(null);
  const [error, setError] = useState(null);
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const bookedSeats = useSelector((state) => state.booking.bookedSeats);

  useEffect(() => {
    console.log("svgComponent:", svgComponent);
    if (typeof svgComponent !== "function") {
      setError("svgComponent is not a function");
      return;
    }
    try {
      const seatsSvg = svgComponent();
      console.log("seatsSvg:", seatsSvg);
      setSvgContent(seatsSvg);
    } catch (err) {
      console.error("Error rendering svgComponent:", err);
      setError(err.message);
    }
  }, [svgComponent]);

  const isSeatBooked = (seatId) => {
    return bookedSeats.some((seat) => seat.number === seatId);
  };

  const handleMouseEnter = (seatId) => {
    setHoveredSeat(seatId);
  };

  const handleMouseLeave = () => {
    setHoveredSeat(null);
  };

  const renderSeats = () => {
    if (!svgContent) return null;

    const seatsChildren = React.Children.map(
      svgContent.props.children,
      (child) => {
        if (!React.isValidElement(child)) {
          console.warn("Invalid child in SVG:", child);
          return null;
        }

        if (child.type === "style" || child.type === "text") {
          return child;
        }

        if (!child.props || !child.props.id) {
          return child;
        }

        const isBooked = isSeatBooked(child.props.id);
        const isClicked = child.props.id === clickedSeat?.id;
        const isHovered = child.props.id === hoveredSeat;

        let seatStyle = {};
        let seatChildStyle = {};

        if (isBooked) {
          seatStyle = { fill: "#fff !important", cursor: "not-allowed", opacity: 0.4 };
          seatChildStyle = {
            fill: "#808080",
            cursor: "not-allowed",
            opacity: 0.4,
          };
        } else if (isClicked) {
          seatStyle = { fill: "white", stroke: "green", strokeWidth: 2 };
          seatChildStyle = { fill: "#4CBB17" };
        } else if (isHovered) {
          seatStyle = { fill: "#1ea83c", stroke: "#1ea83c", strokeWidth: 2 };
          seatChildStyle = { fill: "#1ea83c" };
        } else {
          seatStyle = { fill: "white", stroke: "green", strokeWidth: 2 };
          seatChildStyle = { fill: "white", stroke: "green", strokeWidth: 2 };
        }

        return React.cloneElement(child, {
          style: seatStyle,
          onMouseEnter: () => handleMouseEnter(child.props.id),
          onMouseLeave: handleMouseLeave,
          children: React.Children.map(child.props.children, (seatChild) =>
            React.isValidElement(seatChild) 
              ? React.cloneElement(seatChild, {
                  style: seatChildStyle,
                })
              : seatChild
          ),
        });
      }
    );

    return React.cloneElement(svgContent, {
      children: seatsChildren,
      style: { cursor: "pointer", width: "100%", height: "auto" },
      onClick: handleSeatClick,
    });
  };

  const svgElement = renderSeats();

  if (error) {
    return <div>Error rendering seats: {error}</div>;
  }

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <Row className="w-100">
        <Col className="d-flex justify-content-center align-items-center">
          <div style={{ width: "100%", maxWidth: "600px" }}>{svgElement}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default SeatsSvg;
