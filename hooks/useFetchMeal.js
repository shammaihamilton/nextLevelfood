import { useRouter } from "next/navigation";
import { useState } from "react";

export const useFetchMeal = (url = "api/meals") => {
  const router = useRouter();
  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadMeal(slug) {
    try {
      console.log(`Fetching meal with slug: ${slug}`);
      const response = await fetch(`/${url}/${slug}`);
      if (!response.ok) {
        throw new Error("Failed to load meal");
      }
      const mealData = await response.json();
      setMeal(mealData);
    } catch (err) {
      console.error(`Error fetching meal: ${err.message}`);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const getMealsHandler = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching meals:", error);
      alert("Failed to fetch meals. Please try again.");
    }
  };

  const putMealHandler = async (meal) => {
    try {
      const response = await fetch(`/${url}/${meal.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(meal),
      });

      if (!response.ok) {
        throw new Error("Failed to update meal");
      }

      router.refresh(); // Refresh the page to show updated list
    } catch (error) {
      console.error("Error updating meal:", error);
      alert("Failed to update meal. Please try again.");
    }
  };

  const deleteMealHandler = async (slug) => {
    if (!confirm("Are you sure you want to delete this meal?")) {
      return;
    }

    try {
      const response = await fetch(`/${url}/${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete meal");
      }

      router.refresh(); // Refresh the page to show updated list
    } catch (error) {
      console.error("Error deleting meal:", error);
      alert("Failed to delete meal. Please try again.");
    }
  };

  async function handleSubmit(event, slug) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const updatedMeal = {
      ...meal,
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      creator: formData.get('name'),
      creator_email: formData.get('email'),
      image: formData.get('image') || meal.image,
      slug
    };

    try {
      const response = await fetch(`/${url}/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMeal)
      });

      if (!response.ok) {
        throw new Error('Failed to update meal');
      }

      router.push(`/meals/${slug}`);
      router.refresh();
    } catch (error) {
      setError(error.message);
    }
  }

  return {
    meal,
    isLoading,
    error,
    loadMeal,
    deleteMealHandler,
    putMealHandler,
    getMealsHandler,
    handleSubmit
  };
};
