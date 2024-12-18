import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  region: "eu-north-1",
});

const db = sql("meals.db");

export default async function getMeals() {
  return db.prepare("SELECT * FROM meals").all();
}

export async function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  try {
    console.log("saveMealObject:", meal);

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

    // Sanitize instructions for XSS
    meal.instructions = xss(meal.instructions);

    // Convert image arrayBuffer to buffer and write to file
    const extension = meal.image.name.split(".").pop() || "jpg";
    const fileName = `${meal.slug}.${extension}`;
    const bufferedImage = await meal.image?.arrayBuffer();

    if (!bufferedImage) {
      throw new Error("Image data is missing.");
    }

    s3.putObject({
      Bucket: "shammaihamilton-user-nextjs-demo-images",
      Key: fileName,
      Body: Buffer.from(bufferedImage),
      ContentType: meal.image.type || "image/jpeg",
    });

    meal.image = fileName;

    db.prepare(
      `INSERT INTO meals (
      title,
      summary,
      instructions,
      creator,
      creator_email,
      image,
      slug
    ) VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )`
    ).run(meal);
  } catch (error) {
    console.error("Error saving meal:", error.message);
    throw error;
  }
}
