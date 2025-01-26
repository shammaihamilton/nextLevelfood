import { deleteMeal, getMeal, updateMeal } from "@/services/APImeals";
import { NextResponse } from "next/server";
import formidable from "formidable";
import { uploadImageToS3 } from "../../../utils/uploadImageToS3";

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parser
  },
};

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const meal = await getMeal(slug);
    if (!meal) {
      return NextResponse.json({ message: "Meal not found" }, { status: 404 });
    }
    return NextResponse.json(meal);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { slug } = await params;
    const { message, success } = await deleteMeal(slug);
    return NextResponse.json({ message: message, success: success });
  } catch (error) {
    console.error("Error in delete route handler:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const formData = await request.formData();
    const fields = Object.fromEntries(formData.entries());

    const meal = {
      title: fields.title,
      summary: fields.summary,
      instructions: fields.instructions,
      creator: fields.name,
      creator_email: fields.email,
      slug: fields.slug,
      imageKey: fields.image,
    };

    if (meal.imageKey instanceof Object) {
      const uploadedImageKey = await uploadImageToS3(meal.imageKey, meal.slug);
      meal.imageKey = uploadedImageKey;
    }
    
    await updateMeal(meal);
    return NextResponse.json({ message: "Meal updated successfully" });
  } catch (error) {
    console.error("Error in PUT handler:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
