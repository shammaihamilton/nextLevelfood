import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  region: process.env.AWS_REGION,
});

const db = sql("meals.db");

if (!process.env.AWS_REGION || !process.env.S3_BUCKET) {
  throw new Error(
    "AWS_REGION and S3_BUCKET must be defined in the environment variables."
  );
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function getMeals() {
  try {
  const meals = db.prepare("SELECT * FROM meals").all();
  const mealsFormat = meals.map((meal) => ({
    ...meal,
    imageKey: meal.imageKey
      ? `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${meal.imageKey}`
      : "",
  }));
  return mealsFormat;
} catch (error) {
  console.error("Error fetching meals:", error.message);
  return [];
}
}

export async function uploadImageToS3(file, slug) {
  const extension = file.name.split(".").pop() || "jpg";
  const fileName = `${slug}.${extension}`;
  const bufferedImage = await file.arrayBuffer();

  if (!bufferedImage) {
    throw new Error("Image data is missing.");
  }

  try {
    await s3.putObject({
      Bucket: process.env.S3_BUCKET,
      Key: fileName,
      Body: Buffer.from(bufferedImage),
      ContentType: file.type || "image/jpeg",
    });
    console.log("Image uploaded to S3:", fileName);
    return fileName;
  } catch (error) {
    throw new Error("Failed to upload image to S3: " + error.message);
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
    meal.imageKey = await uploadImageToS3(meal.image, meal.slug);

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
    console.log("Updating meal:", meal);

    const existingMeal = getMeal(meal.slug);
    if (!existingMeal) {
      throw new Error("Meal not found.");
    }

    meal.instructions = xss(meal.instructions);

    if (meal.image) {
      meal.imageKey = await uploadImageToS3(meal.image, meal.slug);
    } else {
      meal.imageKey = existingMeal.imageKey;
    }

    db.prepare(
      `UPDATE meals SET
        title = @title,
        summary = @summary,
        instructions = @instructions,
        creator = @creator,
        creator_email = @creator_email,
        imageKey = @imageKey
      WHERE slug = @slug`
    ).run(meal);

    console.log("Meal updated successfully:", meal.slug);
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

// export async function updateMeal(meal) {
//   try {
//     const existingMeal = await getMeal(meal.slug);
//     if (!existingMeal) {
//       throw new Error("Meal not found.");
//     }

//     // Sanitize instructions for XSS
//     meal.instructions = xss(meal.instructions);

//     // Convert image arrayBuffer to buffer and write to file
//     const extension = meal.imageKey.name.split(".").pop() || "jpg";
//     const fileName = `${meal.slug}.${extension}`;
//     const bufferedImage = await meal.image?.arrayBuffer();

//     if (!bufferedImage) {
//       throw new Error("Image data is missing.");
//     }

//     s3.putObject({
//       Bucket: process.env.S3_BUCKET,
//       Key: fileName,
//       Body: Buffer.from(bufferedImage),
//       ContentType: meal.imageKey.type || "image/jpeg",
//     });

//     meal.imageKey = fileName;

//     db.prepare(
//       `UPDATE meals SET
//       title = @title,
//       summary = @summary,
//       instructions = @instructions,
//       creator = @creator,
//       creator_email = @creator_email,
//       imageKey = @imageKey
//       WHERE slug = @slug`
//     ).run(meal);
//   } catch (error) {
//     console.error("Error updating meal:", error.message);
//     throw error;
//   }
// }

// export async function saveMeal(meal) {
//   try {
//     console.log("saveMealObject:", meal);

//     if (!meal.title) {
//       throw new Error("Title is required to save a meal.");
//     }

//     meal.slug = slugify(meal.title, { lower: true });

//     const existingMeal = db
//       .prepare("SELECT slug FROM meals WHERE slug = ?")
//       .get(meal.slug);
//     if (existingMeal) {
//       throw new Error("A meal with the same title already exists.");
//     }

//     // Sanitize instructions for XSS
//     meal.instructions = xss(meal.instructions);

//     // Convert image arrayBuffer to buffer and write to file
//     const extension = meal.image.name.split(".").pop() || "jpg";
//     const fileName = `${meal.slug}.${extension}`;
//     const bufferedImage = await meal.imageKey?.arrayBuffer();

//     if (!bufferedImage) {
//       throw new Error("Image data is missing.");
//     }

//     // s3.putObject({
//     //   Bucket: process.env.S3_BUCKET,
//     //   Key: fileName,
//     //   Body: Buffer.from(bufferedImage),
//     //   ContentType: meal.imageKey.type || "image/jpeg",
//     // });

//     try {
//       const uploadResult = await s3.putObject({
//         Bucket: process.env.S3_BUCKET,
//         Key: fileName,
//         Body: Buffer.from(bufferedImage),
//         ContentType: meal.imageKey.type || "image/jpeg",
//       });
//       console.log("Image uploaded to S3:", uploadResult);
//     } catch (error) {
//       throw new Error("Failed to upload image to S3: " + error.message);
//     }

//     meal.imageKey = fileName;

//     db.prepare(
//       `INSERT INTO meals (
//       title,
//       summary,
//       instructions,
//       creator,
//       creator_email,
//       imageKey,
//       slug
//     ) VALUES (
//       @title,
//       @summary,
//       @instructions,
//       @creator,
//       @creator_email,
//       @imageKey,
//       @slug
//     )`
//     ).run(meal);
//   } catch (error) {
//     console.error("Error saving meal:", error.message);
//     throw error;
//   }
// }
