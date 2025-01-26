"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveMeal } from "./APImeals";
import formValidator from "../utils/formValidator";

export const shareMeal = async (prevState, formData) => {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    imageKey: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    formValidator.validateMealData(meal) || 
    !meal.creator_email.includes("@") || 
    !meal.imageKey || 
    meal.imageKey.size === 0 
  ) {
    return { message: "Invalid input" };
  }
    await saveMeal(meal);
    revalidatePath("/meals");
    redirect("/meals");

};


