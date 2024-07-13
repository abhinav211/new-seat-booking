import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { createSelector } from "@reduxjs/toolkit";
import Sky from "../../src/assets/sky.jpeg";
import MyDatePicker from "../components/Date/Date";
import {
  setSelectedCountry,
  setSelectedLocation,
  setSelectedFloor,
  setSelectedRoom,
  setSelectedDate,
  setBookedSeats
} from "../../src/Store/store.jsx";
import axios from "axios";
import { format } from "date-fns";

function BookSeat() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const selectBookingData = createSelector(
    (state) => state.booking,
    (booking) => ({
      ...booking,
      selectedDate: booking.selectedDate
        ? new Date(booking.selectedDate)
        : null,
    })
  );

  const {
    selectedCountry,
    selectedLocation,
    selectedFloor,
    selectedRoom,
    selectedDate,
  } = useSelector(selectBookingData);

  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [floors, setFloors] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/building/");
        const fetchedData = response.data;
        setData(fetchedData);
        const uniqueCountries = [
          ...new Set(fetchedData.map((item) => item.country)),
        ];
        setCountries(uniqueCountries);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const selectedBuilding = useMemo(() => {
    if (selectedCountry && selectedLocation) {
      return data.find(
        (item) =>
          item.country === selectedCountry && item.city === selectedLocation
      );
    }
    return null;
  }, [selectedCountry, selectedLocation, data]);

  useEffect(() => {
    const fetchFloors = async () => {
      if (selectedBuilding) {
        try {
          const response = await axios.get(
            `http://localhost:8000/floor/?building_id=${selectedBuilding.id}`
          );
          setFloors(response.data);
        } catch (error) {
          console.error("Error fetching floors:", error);
        }
      }
    };

    fetchFloors();
  }, [selectedBuilding]);

  useEffect(() => {
    const fetchModules = async () => {
      const selectedFloorData = floors.find(
        (floor) => floor.name === selectedFloor
      );
      if (selectedFloorData) {
        try {
          const response = await axios.get(
            `http://localhost:8000/module/?floor_id=${selectedFloorData.id}`
          );
          setModules(response.data);
        } catch (error) {
          console.error("Error fetching modules:", error);
        }
      }
    };

    fetchModules();
  }, [selectedFloor, floors]);

  const handlers = useMemo(
    () => ({
      handleCountryChange: (country) => dispatch(setSelectedCountry(country)),
      handleLocationChange: (location) => dispatch(setSelectedLocation(location)),
      handleFloorChange: (floor) => dispatch(setSelectedFloor(floor)),
      handleRoomChange: (room) => dispatch(setSelectedRoom(room)),
      handleDateChange: (date) => {
        const formattedDate = format(date, "yyyy-MM-dd");
        // console.log("Date selected:", date);
        // console.log("Formatted date:", formattedDate);
        dispatch(setSelectedDate(formattedDate));
      },
    }),
    [dispatch]
  );

  const handleBooking = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/booked-seats/?date=${format(selectedDate, "yyyy-MM-dd")}`
      );
      const bookedSeats = response.data;
      dispatch(setBookedSeats(bookedSeats));
      navigate("/seat")
    } catch (error) {
      console.error("Error fetching booked seats:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container pt-90">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <Card
            className="shadow-lg rounded-3"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            <div style={{ height: "250px", overflow: "hidden" }}>
              <Card.Img
                variant="top"
                src={Sky}
                className="w-100 h-100 object-fit-scale"
              />
            </div>
            <Card.Body>
              <SelectionSection
                title="Select Country"
                options={countries}
                selected={selectedCountry}
                onChange={handlers.handleCountryChange}
              />
              {selectedCountry && (
                <SelectionSection
                  title="Select Location"
                  options={data
                    .filter((item) => item.country === selectedCountry)
                    .map((item) => item.city)}
                  selected={selectedLocation}
                  onChange={handlers.handleLocationChange}
                />
              )}
              {selectedLocation && (
                <SelectionSection
                  title="Select Floor"
                  options={floors.map((floor) => floor.name)}
                  selected={selectedFloor}
                  onChange={handlers.handleFloorChange}
                  prefix="Floor "
                />
              )}
              {selectedFloor !== null && (
                <div className="mb-3">
                  <h6>Select Module</h6>
                  <select
                    className="form-select"
                    value={selectedRoom || ""}
                    onChange={(e) => handlers.handleRoomChange(e.target.value)}
                  >
                    <option value="">Select Module</option>
                    {modules.map((module) => (
                      <option key={module.id} value={module.name}>
                        {module.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="mb-3">
                <MyDatePicker
                  selectedDate={selectedDate}
                  onDateChange={handlers.handleDateChange}
                />
              </div>
              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={handleBooking}
                  disabled={!selectedRoom}
                >
                  Book Seat
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SelectionSection({ title, options, selected, onChange, prefix = "" }) {
  return (
    <div className="mb-3">
      <h6>{title}</h6>
      <div className="d-flex flex-wrap">
        {options.map((option) => (
          <Button
            key={option}
            variant={selected === option ? "primary" : "outline-primary"}
            className="m-1 btn-sm"
            onClick={() => onChange(option)}
          >
            {prefix}
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default BookSeat;
