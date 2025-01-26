// app/meals/[slug]/edit/page.js
"use client";
import { useEffect } from "react";
import { useFetchMeal } from "@/hooks/useFetchMeal";
import { useParams } from "next/navigation";
import Form from "@/components/shared/form/form";
import Link from 'next/link';
export default function EditMealPage() {
  const params = useParams();
  const { loadMeal, meal, isLoading, error, handleSubmit } = useFetchMeal();

  const { slug } = params;
  useEffect(() => {
    if (slug) {
      loadMeal(slug);
    }
  }, [slug]);

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
        handleSubmit={(e) => handleSubmit(e, slug, meal)}
        action={null}
        state={null}
        meal={meal}
      />
    </>
  );
}
