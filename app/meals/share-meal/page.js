"use client";
import { useActionState } from "react";
import { shareMeal } from "@/services/actions";
import Form from "@/components/shared/form/form";
export default function ShareMealPage() {
  const [state, formAction] = useActionState(shareMeal, { message: "" });

  return (
    <>
      <Form action={formAction} state={state} data={null} />
    </>
  );
}
