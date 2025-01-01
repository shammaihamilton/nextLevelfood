// app/meals/[slug]/edit/page.js
"use client";
import { useEffect } from "react";
import { useFetchMeal } from "@/hooks/useFetchMeal";
import { useParams } from "next/navigation";
import Form from "@/components/shared/form/form";

export default  function EditMealPage() {
  const params = useParams();
  const { loadMeal, meal, isLoading, error, handleSubmit } = useFetchMeal();

  useEffect(() => {
    if (params?.slug) {
      loadMeal(params.slug);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!meal) {
    return <div>Meal not found</div>;
  }

  return (
    <>
      <Form
        action={(event) => handleSubmit(event, params?.slug)}
        state={null}
        meal={meal}
      />
    </>
  )}
