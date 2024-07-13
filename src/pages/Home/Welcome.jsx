import React from "react";
import "./Welcome.css";

const HomePage = () => {
  const userName = "Annamalai"; // Replace with dynamic user name if needed

  return (
    <div className="homepage">
      <div className="overlay">
        <div className="content">
          <h1>Hi, {userName}</h1>
          <div className="buttons">
            <button className="btn">Book Seat</button>
            <button className="btn">View Seat</button>
            <button className="btn">Cancel Seat</button>
          </div>
        </div>
      </div>
      <footer>&copy; {new Date().getFullYear()} Company Name</footer>
    </div>
  );
};

export default HomePage;
