import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import NavbarHeader from "./components/Header/Navbar.jsx";
import SeatLayout from "./pages/SeatBooking/seatLayout.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Welcome from "./pages/Home/Welcome.jsx";
import BookSeat from "./pages/bookSeat.jsx";
import "./index.css";
import Store,{ persistor } from "../src/Store/store.jsx";

function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/seat") {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return (
    <>
      {showNavbar && <NavbarHeader />}
      <Routes>
        <Route path="/bookseat" element={<BookSeat />} />
        <Route path="/seat" element={<SeatLayout />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

function AppWrapper() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default AppWrapper;
