import { deleteMeal, getMeal, updateMeal } from '@/services/APImeals';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const { slug } = await params;
      const meal = await getMeal(slug);
      return NextResponse.json(meal);
    } catch (error) {
      return NextResponse.json(
        { message: error.message }, 
        { status: 500 }
      );
    }
  }

export async function DELETE(request, { params }) {
  try {
    const { slug } = await params;
    const { message, success } = await deleteMeal(slug);
    return NextResponse.json({ message: message, success: success });
  } catch (error) {
    console.error('Error in delete route handler:', error);
    return NextResponse.json(
      { message: error.message }, 
      { status: 500 }
    );
  }
}

// app/api/meals/[slug]/route.js

export async function PUT(request, { params }) {
  try {
    const meal = await request.json();
    await updateMeal(meal);
    return NextResponse.json({ message: 'Meal updated successfully' });
  } catch (error) {
    console.error('Error in update route handler:', error);
    return NextResponse.json(
      { message: error.message }, 
      { status: 500 }
    );
  }
}