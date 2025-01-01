// app/meals/[slug]/edit-button.js - Client Component
"use client";
import { useRouter } from 'next/navigation';
import Button from "@/components/shared/button";

export default function EditButton({ slug }) {
  const router = useRouter();
  
  const handleEdit = () => {
    router.push(`/meals/${slug}/edit`);
  };

  return <Button onClick={handleEdit}>Edit Meal</Button>;
}