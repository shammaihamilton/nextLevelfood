"use client";
// import { useFormState } from  "react-dom"
import { useActionState } from "react";

// import ImagePicker from "@/components/meals/image-picker/image-picker";
// import classes from "./page.module.css";
import { shareMeal } from "@/services/actions";
// import MealFormSubmit from "@/components/shared/form-submit-button";
import Form from "@/components/shared/form/form";
export default function ShareMealPage( ) {
  
  const [state, formAction] = useActionState(shareMeal, { message: null });

  return (

    <>
    <Form action={formAction} state={state} data={null} />
    </>
  );
}
