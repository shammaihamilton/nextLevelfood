"use client";
import React from "react";

export default function Error({error}) {
  return (
    <main className="error">
      <h1>An Error Occured!</h1>
      <p>Failed to fetch meal data. please try again later.</p>
      <p>{error.message}</p>
    </main>
  );
}
