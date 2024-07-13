import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createGlobalStyle } from "styled-components";

const DatePickerWrapperStyles = createGlobalStyle`
  .datePicker {
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    font-size: 16px; /* Increased font size */
    font-weight: bold;
    padding: 2px; /* Increased padding for size */


    .react-datepicker__navigation {
      top: 8px;
    }

    .react-datepicker__month-container {
      padding: 10px;
    }

    .react-datepicker__day--selected {
      background-color: #0052cc;
      color: white;
    }

    .react-datepicker__day--today {
      font-weight: 900;
    }
    .react-datepicker__input-container input {
      outline: none; /* Remove outline */
      border: none;
    }
  }
`;
function MyDatePicker({ selectedDate, onDateChange }) {
  return (
    <>
      <DatePickerWrapperStyles />
      <DatePicker
        className="text-center border-l-4 border-red-500  w-full rounded text-sm  outline-none  focus:ring-0 bg-transparent"
        wrapperClassName="datePicker"
        showIcon
        placeholderText="Click to select a date"
        dateFormat="yyyy/MM/dd"
        selected={selectedDate}
        onChange={(date) => onDateChange(date)}
        style={{ width: "100%" }} 
      />
    </>
  );
}

export default MyDatePicker;
