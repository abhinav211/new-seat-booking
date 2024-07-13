import React, { useState } from "react";
import { Dropdown, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
const floors = { 8: ["S1", "S2", "S3", "S4"] };

const SeatBookingDropdown = () => {
  const [floor, setFloor] = useState(null);
  const [room, setRoom] = useState(null);
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate("/seat", { state: { floor, room } });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <Dropdown className="mb-3">
          <Dropdown.Toggle>{floor ? `Floor ${floor}` : "Select Floor"}</Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.keys(floors).map((f) => (
              <Dropdown.Item key={f} onClick={() => setFloor(f)}>
                Floor {f}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {floor && (
          <Dropdown className="mb-3">
            <Dropdown.Toggle>{room || "Select Room"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {floors[floor].map((r) => (
                <Dropdown.Item key={r} onClick={() => setRoom(r)}>
                  Module {r}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}

        {room && (
          <div>
            <p>Floor: {floor}, Module: {room}</p>
            <Button onClick={handleBooking}>Submit</Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default SeatBookingDropdown;