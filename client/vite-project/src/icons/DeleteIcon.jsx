import React from "react";

const DeleteIcon = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18M9 6v12M15 6v12M5 6h14c1.104 0 2 0.896 2 2v12c0 1.104-0.896 2-2 2H5c-1.104 0-2-0.896-2-2V8c0-1.104 0.896-2 2-2z" />
    </svg>
  );
};

export default DeleteIcon;
