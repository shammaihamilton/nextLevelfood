import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { uploadImageToS3 } from "../app/utils/uploadImageToS3";

const db = sql("meals.db");

export function getMeal(slug) {
  try {
    const meal = db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
    if (!meal) {
      throw new Error(`Meal not found with slug: ${slug}`);
    }

    if (!meal.imageKey.startsWith("http")) {
      meal.imageKey = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${meal.imageKey}`;
    }

    return meal;
  } catch (error) {
    console.error("Error fetching meal:", error.message);
    return null;
  }
}

export async function getMeals() {
  try {
    const meals = db.prepare("SELECT * FROM meals").all();
    const mealsFormat = meals.map((meal) => {
      const formattedImageKey =
        meal.imageKey && !meal.imageKey.startsWith("http")
          ? `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${meal.imageKey}`
          : meal.imageKey || "";

      return {
        ...meal,
        imageKey: formattedImageKey,
      };
    });

    return mealsFormat;
  } catch (error) {
    console.error("Error fetching meals:", error.message);
    return [];
  }
}

export async function saveMeal(meal) {
  try {
    console.log("Saving meal:", meal);

    if (!meal.title) {
      throw new Error("Title is required to save a meal.");
    }

    meal.slug = slugify(meal.title, { lower: true });

    const existingMeal = db
      .prepare("SELECT slug FROM meals WHERE slug = ?")
      .get(meal.slug);
    if (existingMeal) {
      throw new Error("A meal with the same title already exists.");
    }

    meal.instructions = xss(meal.instructions);
    console.log("image key :", meal.imageKey);
    meal.imageKey = await uploadImageToS3(meal.imageKey, meal.slug);
    db.prepare(
      `INSERT INTO meals (
        title, summary, instructions, creator, creator_email, imageKey, slug
      ) VALUES (
        @title, @summary, @instructions, @creator, @creator_email, @imageKey, @slug
      )`
    ).run(meal);
    console.log("Meal saved successfully:", meal.slug);
  } catch (error) {
    console.error("Error saving meal:", error.message);
    throw error;
  }
}

export async function updateMeal(meal) {
  try {
    const existingMeal = getMeal(meal.slug);
    if (!existingMeal) {
      throw new Error("Meal not found.");
    }

    meal.instructions = xss(meal.instructions);

    meal.imageKey = meal.imageKey || existingMeal.imageKey;

    db.prepare(
      `UPDATE meals SET 
        title = @title, 
        summary = @summary, 
        instructions = @instructions, 
        creator = @creator, 
        creator_email = @creator_email, 
        imageKey = @imageKey 
      WHERE slug = @slug`
    ).run({
      title: String(meal.title || ""),
      summary: String(meal.summary || ""),
      instructions: String(meal.instructions || ""),
      creator: String(meal.creator || ""),
      creator_email: String(meal.creator_email || ""),
      imageKey: String(meal.imageKey || ""),
      slug: String(meal.slug || ""),
    });
  } catch (error) {
    console.error("Error updating meal:", error.message);
    throw error;
  }
}

export async function deleteMeal(slug) {
  try {
    const meal = getMeal(slug);
    if (!meal) {
      throw new Error("Meal not found.");
    }
    try {
      await s3.deleteObject({
        Bucket: process.env.S3_BUCKET,
        Key: meal.imageKey,
      });
      console.log("Image deleted from S3.");
    } catch (error) {
      console.error("Failed to delete image from S3:", error.message);
    }

    db.prepare("DELETE FROM meals WHERE slug = ?").run(slug);
    return { message: "Meal deleted successfully", success: true };
  } catch (error) {
    console.error("Error deleting meal:", error.message);
    throw error;
  }
}
