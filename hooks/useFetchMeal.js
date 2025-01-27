import { useRouter } from "next/navigation";
import { useState } from "react";
import { notifySuccess, notifyError } from "@/utils/tostify";

export const useFetchMeal = (url = "api/meals") => {
  const router = useRouter();
  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadMeal(slug) {
    setIsLoading(true);
    try {
      const response = await fetch(`/${url}/${slug}`);
      if (!response.ok) {
        throw new Error("Failed to load meal");
      }
      const mealData = await response.json();
      setMeal(mealData);
    } catch (err) {
      console.error(`Error fetching meal: ${err.message}`);
      setError(err.message);
      notifyError(`Error loading meal: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event, slug, meal) {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("slug", slug);
    const imageInput = event.target.image;

    if (imageInput?.files[0]) {
      formData.append("image", imageInput.files[0]);
    } else {
      formData.append("image", meal?.imageKey || "");
    }

    try {
      const response = await fetch(`/api/meals/${slug}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update meal");
      }
      notifySuccess("Meal updated successfully!");
      router.push(`/meals/${slug}`);
      router.refresh();
    } catch (error) {
      console.error("Error in handleSubmit:", error.message);
      setError(error.message);
      notifyError(`Error updating meal: ${error.message}`);
    }
  }

  async function handleDelete(slug) {
    try {
      const response = await fetch(`/api/meals/${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete meal");
      }
      notifySuccess("Meal deleted successfully!");
      router.push("/meals");
      router.refresh();
    } catch (error) {
      console.error("Error in handleDelete:", error.message);
      setError(error.message);
      notifyError(`Error deleting meal: ${error.message}`);
    }
  }

  return {
    meal,
    isLoading,
    error,
    loadMeal,
    handleSubmit,
    handleDelete,
  };
};
