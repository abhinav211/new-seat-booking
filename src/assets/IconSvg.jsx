import React from "react";

export const BackArrowIcon = ({
  onClick,
  className = "",
  width = 24,
  height = 24,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="currentColor"
    className={`bi bi-arrow-left-circle ${className}`}
    viewBox="0 0 16 16"
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    <path
      fillRule="evenodd"
      d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
    />
  </svg>
);

export const ChairIcon = ({ className = "", width = 24, height = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="currentColor"
    className={`bi bi-arrow-left-circle ${className}`}
    viewBox="0 0 16 16"
    style={{ cursor: "pointer" }}
  >
    <g>
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zM4 9v10h16V9H4zm2 2h2v2H6v-2zm5 0h2v2h-2v-2zm5 0h2v2h-2v-2z" />
    </g>
  </svg>
);
