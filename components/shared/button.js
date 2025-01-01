"use client";
import React from "react";

function Button({ children, onClick }) {
  return (
    <button
     onClick={onClick}
      type="button">
      {children}
    </button>
  );
}

export default Button;
