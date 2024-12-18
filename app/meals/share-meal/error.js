"use client";
import React from "react";

export default function Error({error}) {
  return (
    <main className="error">
      <h1>An Error Occured!</h1>
      <p>Failed to creat a meal.</p>
      <p>{error.message}</p>
    </main>
  );
}
