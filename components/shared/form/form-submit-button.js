"use client";
import { useFormStatus } from "react-dom";

export default function MealFormSubmit({ meal }) {
  const { pending } = useFormStatus();

  const template = meal ? "Update Meal" : "Share Meal";
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : `${template}`}
    </button>
  );
}
