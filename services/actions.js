"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveMeal } from "./APImeals";

function isInvalidText(text) {
  return !text || text.trim().length === 0;
}

function getValuesFromMeal(meal) {
  // Exclude non-text properties like `image`
  const filteredValues = Object.entries(meal)
    .filter(([key, value]) => key !== "image" && typeof value === "string")
    .map(([, value]) => value);

  console.log("Filtered values for validation:", filteredValues);
  return filteredValues;
}

const validateMealData = (meal) => {
  const values = getValuesFromMeal(meal);
  return values.some(isInvalidText); // Validate text fields
};

export const shareMeal = async (prevState, formData) => {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"), // File object
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    validateMealData(meal) || // Invalid text fields
    !meal.creator_email.includes("@") || // Invalid email
    !meal.image || // Image not uploaded
    meal.image.size === 0 // Image file is empty
  ) {
    return { message: "Invalid input" };
  }

  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
};
